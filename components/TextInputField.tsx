// app/components/TextInputField.tsx
import React from 'react';
import { TextInput, StyleSheet } from 'react-native';

interface TextInputFieldProps {
  placeholder: string;
  secureTextEntry?: boolean;
}

const TextInputField: React.FC<TextInputFieldProps> = ({ placeholder, secureTextEntry = false }) => {
  return (
    <TextInput
      style={styles.input}
      placeholder={placeholder}
      placeholderTextColor="#999"
      secureTextEntry={secureTextEntry}
    />
  );
};

const styles = StyleSheet.create({
  input: {
    width: '100%',
    height: 40,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    marginBottom: 15,
    paddingHorizontal: 10,
  },
});

export default TextInputField;
