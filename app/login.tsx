import React, { useState } from 'react';
import { View, Image, StyleSheet, Dimensions, Alert, ActivityIndicator } from 'react-native';
// import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Card from '../components/Card';
import ChildCard from '../components/ChildCard';
import Footer from '../components/Footer';

export default function LoginScreen() {
  const navigation = useNavigation();
  
  // State for email, password, and loading indicator
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  // Handle login
  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please enter both email and password.');
      return;
    }

    setLoading(true);

    try {
      const response = await fetch('https://your-api.com/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.status === 200) { 
        // ✅ Successful login, store token
        // await AsyncStorage.setItem('token', data.token);
        Alert.alert('Success', 'Login successful!');
        
        // ✅ Navigate to Home or Dashboard screen
        // navigation.navigate('Home');  
      } else {
        Alert.alert('Error', data.message || 'Login failed. Please try again.');
      }
    } catch (error) {
      Alert.alert('Error', 'Something went wrong. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = () => {
    // navigation.navigate('ForgotPassword');
  };

  const screenHeight = Dimensions.get("window").height;
  const logoHeight = screenHeight * 0.07;

  return (
    <SafeAreaView style={styles.safeAreaContainer}>
      <View style={styles.container}>
        <Image
          source={require('../assets/logo.png')}
          style={[styles.logo, { height: logoHeight }]}
          resizeMode="contain"
        />
        
        <Card imageSource={require('../assets/login_screen_image.jpg')}>
          <ChildCard
            title="Login"
            inputFields={[
              { placeholder: 'Email', value: email, onChangeText: setEmail },
              { placeholder: 'Password', secureTextEntry: true, value: password, onChangeText: setPassword },
            ]}
            onLoginPress={handleLogin}
            buttonText={loading ? <ActivityIndicator color="#fff" /> : "Login"}
            showForgotPassword={true}
            forgotPasswordText="Forgot Password?"
            onForgotPasswordPress={handleForgotPassword}
          />
        </Card>

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
