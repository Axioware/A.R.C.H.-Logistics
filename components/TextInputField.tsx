// app/components/TextInputField.tsx
import React from 'react';
import { TextInput, StyleSheet } from 'react-native';

interface TextInputFieldProps {
  placeholder: string;
  secureTextEntry?: boolean;
  value: string;  // ✅ Added value prop
  onChangeText: (text: string) => void;  
}

const TextInputField: React.FC<TextInputFieldProps> = ({ placeholder, secureTextEntry = false, value, onChangeText}) => {
  return (
    <TextInput
      style={styles.input}
      placeholder={placeholder}
      placeholderTextColor="#999"
      secureTextEntry={secureTextEntry}
      value={value}  // ✅ Now it displays the entered text
      onChangeText={(text) => {
        onChangeText(text);
      }}
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
