import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

interface ButtonProps {
  icon: keyof typeof MaterialIcons.glyphMap; // Restrict to valid MaterialIcons names
  text: string; // Text to display for the button
  onPress: () => void; // Function to call when the button is pressed
  visible?: boolean; // Determines if the button should be displayed
}

interface CardWithButtonsProps {
  title: string; // Title for the card
  button1: ButtonProps; // Props for the first button (optional)
  button2: ButtonProps; // Props for the second button (optional)
}

const CardWithButtons: React.FC<CardWithButtonsProps> = ({ title, button1, button2 }) => {
  return (
    <View style={styles.card}>
      {/* Title */}
      <Text style={styles.title}>{title}</Text>

      {/* Button 1 */}
      {button1?.visible !== false && (
        <TouchableOpacity style={styles.button} onPress={button1.onPress}>
          <MaterialIcons name={button1.icon} size={24} color="#333" />
          <Text style={styles.buttonText}>{button1.text}</Text>
          <MaterialIcons name="keyboard-arrow-right" size={24} color="#333" />
        </TouchableOpacity>
      )}

      {/* Button 2 */}
      {button2?.visible !== false && (
        <TouchableOpacity style={styles.button} onPress={button2.onPress}>
          <MaterialIcons name={button2.icon} size={24} color="#333" />
          <Text style={styles.buttonText}>{button2.text}</Text>
          <MaterialIcons name="keyboard-arrow-right" size={24} color="#333" />
        </TouchableOpacity>
      )}
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
  button: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f9f9f9",
    paddingVertical: 12,
    paddingHorizontal: 10,
    marginVertical: 8,
    borderRadius: 8,
  },
  buttonText: {
    flex: 1,
    marginLeft: 10,
    fontSize: 16,
    color: "#333",
  },
});

export default CardWithButtons;
