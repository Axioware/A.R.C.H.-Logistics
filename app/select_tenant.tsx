import React from 'react';
import { View, Image, StyleSheet, Dimensions, SafeAreaView } from 'react-native';
import Card from '../components/Card';
import ChildCard from '../components/ChildCard';
import Footer from '../components/Footer';
import { useNavigation } from '@react-navigation/native';

export default function SelectTenant() {
  const navigation = useNavigation(); // Using React Navigation's hook for navigation

  const handleSelectTenant = () => {
    // Handle login logic here
    console.log('Pressed');
  };

  const handleForgotPassword = () => {
    // Navigate to the Forgot Password screen
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
        <Card imageSource={require('../assets/select_tenant.jpg')}>
          {/* Child Card */}
          <ChildCard
            title="Enter Tenant"
            inputFields={[{ placeholder: 'Tenant Name' }]}
            onLoginPress={handleSelectTenant}
            buttonText="Select"
            showForgotPassword={false}
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

export const styles = StyleSheet.create({
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
