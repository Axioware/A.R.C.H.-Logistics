import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import TextInputField from './TextInputField';
import LoginButton from './LoginButton';

interface ChildCardProps {
  title: string;
  inputFields: { placeholder: string, secureTextEntry?: boolean }[];
  onLoginPress: () => void;
  buttonText: string;
  showForgotPassword: boolean;
  forgotPasswordText?: string;
  onForgotPasswordPress?: () => void; // Function to navigate to Forgot Password page
}

export default function ChildCard({
  title,
  inputFields,
  onLoginPress,
  buttonText,
  showForgotPassword,
  forgotPasswordText,
  onForgotPasswordPress
}: ChildCardProps) {
  return (
    <View style={styles.card}>
      <Text style={styles.cardTitle}>{title}</Text>

      {/* Render Input Fields dynamically */}
      {inputFields.map((field, index) => (
        <TextInputField key={index} placeholder={field.placeholder} secureTextEntry={field.secureTextEntry} />
      ))}

      {/* Login Button */}
      <LoginButton onPress={onLoginPress} title={buttonText} />

      {/* Conditionally render Forgot Password */}
      {showForgotPassword && forgotPasswordText && (
        <TouchableOpacity onPress={onForgotPasswordPress}>
          <Text style={styles.forgotPassword}>{forgotPasswordText}</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    width: '90%',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 5 },
    elevation: 2,
  },
  cardTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
  },
  forgotPassword: {
    color: '#00000',
    fontSize: 14,
    marginTop: 10,
    alignSelf: 'flex-start',
    textDecorationLine: 'underline',
  },
});
