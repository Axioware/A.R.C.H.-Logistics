import React, { useState } from 'react';
import { View, Image, StyleSheet, Dimensions, SafeAreaView, Alert, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Card from '../components/Card';
import ChildCard from '../components/ChildCard';
import Footer from '../components/Footer';

export default function ForgotPassword() {
  const navigation = useNavigation();
  
  // State to store email input and loading state
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSendOTP = async () => {
    if (!email) {
      Alert.alert('Error', 'Please enter your email.');
      return;
    }

    setLoading(true);

    try {
      const response = await fetch('https://your-api.com/send-otp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.status === 200) {
        Alert.alert('Success', 'OTP sent to your email!');
        
        // ✅ Navigate to OTP Verification Page, passing the email
        // navigation.navigate('OTPVerification', { email });
      } else {
        Alert.alert('Error', data.message || 'Failed to send OTP. Try again.');
      }
    } catch (error) {
      Alert.alert('Error', 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Get screen height for dynamic logo sizing
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
        <Card imageSource={require('../assets/forgot_password_icon.png')}>
          {/* Child Card */}
          <ChildCard
            title="Please enter your email address to receive OTP"
            inputFields={[
              { placeholder: 'Email', value: email, onChangeText: setEmail },
            ]}
            onLoginPress={handleSendOTP}
            buttonText={loading ? <ActivityIndicator color="#fff" /> : "Send"}
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
    paddingTop: 20,
  },
  logo: {
    width: '60%',
    alignSelf: 'center',
    marginBottom: 20,
  },
});
