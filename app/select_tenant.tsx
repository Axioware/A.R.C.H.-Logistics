import React, { useState } from 'react';
import { View, Image, StyleSheet, Dimensions, SafeAreaView, Alert, ActivityIndicator } from 'react-native';
import Card from '../components/Card';
import ChildCard from '../components/ChildCard';
import Footer from '../components/Footer';
import { useNavigation } from '@react-navigation/native';
import LoginScreen from './login';

export default function SelectTenant() {
  const navigation = useNavigation();
  const [tenantName, setTenantName] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSelectTenant = async () => {
    if (!tenantName.trim()) {
      Alert.alert('Error', 'Please enter a tenant name.');
      return;
    }

    setLoading(true);

    try {
      const response = await fetch('https://your-api.com/check-tenant', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ tenant: tenantName }),
      });

      const data = await response.json();

      if (response.status === 200) {
        // navigation.navigate(LoginScreen); // Navigate to login screen
      } else if (response.status === 400) {
        Alert.alert('Invalid Tenant', 'Entered name does not exist.');
      } else {
        Alert.alert('Error', 'Something went wrong. Please try again.');
      }
    } catch (error) {
      Alert.alert('Network Error', 'Please check your internet connection.');
    } finally {
      setLoading(false);
    }
  };

  // Get screen height for dynamic logo sizing
  const screenHeight = Dimensions.get('window').height;
  const logoHeight = screenHeight * 0.07;

  return (
    <SafeAreaView style={styles.safeAreaContainer}>
      <View style={styles.container}>
        <Image source={require('../assets/logo.png')} style={[styles.logo, { height: logoHeight }]} resizeMode="contain" />

        <Card imageSource={require('../assets/select_tenant.jpg')}>
          <ChildCard
            title="Enter Tenant"
            inputFields={[{ placeholder: 'Tenant Name', value: tenantName, onChangeText: setTenantName }]}
            onLoginPress={handleSelectTenant}
            buttonText={loading ? <ActivityIndicator color="#fff" /> : 'Select'}
            showForgotPassword={false}
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
