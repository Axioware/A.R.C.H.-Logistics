import React, { useState } from "react";
import { View, Text, StyleSheet, TextInput } from "react-native";

interface InputFieldProps {
  placeholder: string; // Placeholder text for the input field
  value: string; // Current value of the input field
  onChangeText: (text: string) => void; // Function to handle text change
}

interface CardWithInputsProps {
  title: string; // Title for the card
  inputFields: InputFieldProps[]; // Array of input field properties
}

const CardWithInputs: React.FC<CardWithInputsProps> = ({ title, inputFields }) => {
  const [focusedField, setFocusedField] = useState<number | null>(null);

  const handleFocus = (index: number) => {
    setFocusedField(index);
  };

  const handleBlur = () => {
    setFocusedField(null);
  };

  return (
    <View style={styles.card}>
      {/* Title */}
      <Text style={styles.title}>{title}</Text>

      {/* Input Fields */}
      {inputFields.map((field, index) => (
        <TextInput
          key={index}
          style={[
            styles.input,
            focusedField === index && styles.focusedInput, // Apply focused style if the field is selected
          ]}
          placeholder={field.placeholder}
          value={field.value}
          onChangeText={field.onChangeText}
          onFocus={() => handleFocus(index)} // Set focus on this field
          onBlur={handleBlur} // Remove focus when the field is blurred
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 5,
    marginBottom: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 15,
  },
  input: {
    backgroundColor: "#f9f9f9",
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 10,
    marginVertical: 8,
    borderWidth: 1,
    borderColor: "#ddd",
    fontSize: 16,
    color: "#333",
  },
  focusedInput: {
    borderColor: "#000000", // Blue outline when the field is focused
    borderWidth: 2,
  },
});

export default CardWithInputs;
