import React, { useState } from 'react';
import { View, Image, StyleSheet, Dimensions, SafeAreaView, Alert, ActivityIndicator } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import Card from '../components/Card';
import ChildCard from '../components/ChildCard';
import Footer from '../components/Footer';

export default function ResetPassword() {
  const navigation = useNavigation();
  const route = useRoute();

  // ✅ Safely retrieve email from params
  const email = (route.params as any)?.email || '';  

  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleResetPassword = async () => {
    if (!newPassword || !confirmPassword) {
      Alert.alert('Error', 'Both fields are required.');
      return;
    }

    if (newPassword !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match.');
      return;
    }

    setLoading(true);

    try {
      const response = await fetch('https://your-api.com/reset-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, newPassword }),
      });

      const data = await response.json();

      if (response.status === 200) {
        Alert.alert('Success', 'Password updated successfully!');
        // navigation.navigate('LoginScreen'); // ✅ Redirect to Login page
      } else {
        Alert.alert('Error', data.message || 'Failed to reset password.');
      }
    } catch (error) {
      Alert.alert('Error', 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const screenHeight = Dimensions.get("window").height;
  const logoHeight = screenHeight * 0.07;

  return (
    <SafeAreaView style={styles.safeAreaContainer}>
      <View style={styles.container}>
        {/* Logo */}
        <Image
          source={require('../assets/logo.png')}
          style={[styles.logo, { height: logoHeight }]}
          resizeMode="contain"
        />

        {/* Parent Card */}
        <Card imageSource={require('../assets/login_screen_image.jpg')}>
          {/* Child Card */}
          <ChildCard
            title="Please enter new password"
            inputFields={[
              {
                placeholder: 'New Password',
                secureTextEntry: true,
                value: newPassword,
                onChangeText: setNewPassword,
              },
              {
                placeholder: 'Confirm Password',
                secureTextEntry: true,
                value: confirmPassword,
                onChangeText: setConfirmPassword,
              },
            ]}
            onLoginPress={handleResetPassword}
            buttonText={loading ? <ActivityIndicator color="#fff" /> : "Reset Password"}
            showForgotPassword={false}
          />
        </Card>

        {/* Footer */}
        <Footer />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeAreaContainer: {
    flex: 1,
    backgroundColor: '#fff',
  },
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  logo: {
    width: '60%',
    alignSelf: 'center',
    marginBottom: 20,
  },
});
