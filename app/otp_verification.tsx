import React from 'react';
import { View, Image, StyleSheet,Dimensions, SafeAreaView } from 'react-native';
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

  // Get screen height for dynamic logo sizing
    const screenHeight = Dimensions.get("window").height;
    const logoHeight = screenHeight * 0.07;

  return (
    <SafeAreaView style={styles.safeAreaContainer}>
      <View style={styles.container}>
        {/* Logo */}
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
            title="Submit OTP"
            onPress={handleSubmit}
          //   style={styles.loginButton}
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
