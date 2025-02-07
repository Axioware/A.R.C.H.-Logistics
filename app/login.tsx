import React from 'react';
import { View, Image, StyleSheet, Dimensions } from 'react-native';
import Card from '../components/Card';
import ChildCard from '../components/ChildCard';
import Footer from '../components/Footer';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';

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

  // Get screen height for dynamic logo sizing
  const screenHeight = Dimensions.get("window").height;
  const logoHeight = screenHeight * 0.07; // 7% of screen height, adjust as needed

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
    justifyContent: 'flex-start', // Ensure content starts from the top
    alignItems: 'center', // Center everything horizontally
    paddingHorizontal: 20,
    paddingTop: 0, // Adjust top padding if needed
  },
  logo: {
    width: '60%', // Adjust the width of the logo
    alignSelf: 'center', // Center the logo horizontally
    marginBottom: 20, // Space between logo and content
  },
});
