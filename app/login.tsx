import React from 'react';
import { View, Image, StyleSheet } from 'react-native';
import Card from '../components/Card';
import ChildCard from '../components/ChildCard';
import Footer from '../components/Footer';
import { useNavigation } from '@react-navigation/native';

export default function LoginScreen() {
  const navigation = useNavigation(); // Using React Navigation's hook for navigation

  const handleLogin = () => {
    // Handle login logic here
    console.log('Login pressed');
  };

  const handleForgotPassword = () => {
    // Navigate to the Forgot Password screen
    // navigation.navigate('ForgotPassword');
  };

  return (
    <View style={styles.container}>
      {/* Logo */}
      <Image source={require('../assets/logo.png')} style={styles.logo} />

      {/* Parent Card */}
      <Card imageSource={require('../assets/login_screen_image.jpg')}>
        {/* Child Card */}
        <ChildCard
          title="Login"
          inputFields={[
            { placeholder: 'Email' },
            { placeholder: 'Password', secureTextEntry: true },
          ]}
          onLoginPress={handleLogin}
          buttonText="Login"
          showForgotPassword={true}
          forgotPasswordText="Forgot Password?"
          onForgotPasswordPress={handleForgotPassword} // Passing the function here
        />
      </Card>

      {/* Footer */}
      <Footer />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
    paddingHorizontal: 20,
  },
  logo: {
    width: 275,
    height: 85,
    marginTop: 20,
  },
});
