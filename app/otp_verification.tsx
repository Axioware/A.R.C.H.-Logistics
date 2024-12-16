import React from 'react';
import { View, Image, StyleSheet } from 'react-native';
import Card from '../components/Card';
import Footer from '../components/Footer';
import LoginButton from '../components/LoginButton';
import { OtpInput } from 'react-native-otp-entry';

export default function OtpVerification() {
  const handleOtpChange = (text: string) => {
    console.log(text);
  };

  const handleOtpFilled = (text: string) => {
    console.log(`OTP is ${text}`);
  };

  const handleSubmit = () => {
    console.log('Submit button pressed');
  };

  return (
    <View style={styles.container}>
      {/* Logo */}
      <Image source={require('../assets/logo.png')} style={styles.logo} />

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
          title="Submit OTP"
          onPress={handleSubmit}
        //   style={styles.loginButton}
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
//   loginButton: {
//     width: '90%', // Match the width of the OTP container
//     height: 60, // Increase the height
//     alignSelf: 'center', // Center the button horizontally
//     marginTop: 20, // Add spacing above the button
//   },
});
