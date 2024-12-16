import React from 'react';
import { View, Image, StyleSheet } from 'react-native';
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

  return (
    <View style={styles.container}>
      {/* Logo */}
      <Image source={require('../assets/logo.png')} style={styles.logo} />

      {/* Parent Card */}
      <Card imageSource={require('../assets/select_tenant.jpg')}>
        {/* Child Card */}
        <ChildCard
          title="Enter Tenant"
          inputFields={[
            { placeholder: 'Tenant Name' },
            // { placeholder: 'Password', secureTextEntry: true },
          ]}
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
