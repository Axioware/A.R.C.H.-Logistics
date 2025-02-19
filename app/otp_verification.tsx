import React, { useState } from 'react';
import { View, Image, StyleSheet, Dimensions, SafeAreaView, Alert, ActivityIndicator } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import Card from '../components/Card';
import Footer from '../components/Footer';
import LoginButton from '../components/LoginButton';
import { OtpInput } from 'react-native-otp-entry';

export default function OtpVerification() {
  const navigation = useNavigation();
  const route = useRoute();
  
  // ✅ Safely retrieve email from params
  const email = (route.params as any)?.email || '';  

  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);

  const handleOtpChange = (text: string) => {
    setOtp(text);
  };

  const handleOtpFilled = (text: string) => {
    setOtp(text);
  };

  const handleSubmit = async () => {
    if (otp.length !== 5) {
      Alert.alert('Error', 'Please enter a valid 5-digit OTP.');
      return;
    }

    setLoading(true);

    try {
      const response = await fetch('https://your-api.com/verify-otp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, otp }),
      });

      const data = await response.json();

      if (response.status === 200) {
        Alert.alert('Success', 'OTP verified successfully!');
        
        // ✅ Navigate to Reset Password Page, passing the email
        // navigation.navigate('ResetPassword', { email });
      } else {
        Alert.alert('Error', data.message || 'Invalid OTP. Please try again.');
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
        <Card imageSource={require('../assets/otp.png')}>
          <View style={styles.otpContainer}>
            <OtpInput
              numberOfDigits={5}
              focusColor="green"
              focusStickBlinkingDuration={500}
              onTextChange={handleOtpChange}
              onFilled={handleOtpFilled}
              hideStick={true}
              textInputProps={{
                accessibilityLabel: 'One-Time Password',
              }}
              theme={{
                containerStyle: styles.otpContainerStyle,
                pinCodeContainerStyle: styles.pinCodeContainer,
                pinCodeTextStyle: styles.pinCodeText,
                focusStickStyle: styles.focusStick,
                focusedPinCodeContainerStyle: styles.activePinCodeContainer,
              }}
            />
          </View>

          {/* Submit Button */}
          <LoginButton
            title={loading ? <ActivityIndicator color="#fff" /> : "Submit OTP"}
            onPress={handleSubmit}
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
  otpContainer: {
    width: '100%',
    alignItems: 'center',
    marginVertical: 20,
  },
  otpContainerStyle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '90%',
  },
  pinCodeContainer: {
    width: 50,
    height: 50,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 5,
    backgroundColor: '#f0f0f0',
  },
  pinCodeText: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#333',
  },
  focusStick: {
    position: 'absolute',
    bottom: 0,
    width: '90%',
    height: 2,
    backgroundColor: 'black',
  },
  activePinCodeContainer: {
    borderColor: 'black',
  },
});
