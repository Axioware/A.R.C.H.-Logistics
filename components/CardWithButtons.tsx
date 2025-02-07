import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import EvilIcons from "@expo/vector-icons/EvilIcons";
import AntDesign from "@expo/vector-icons/AntDesign";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import Feather from '@expo/vector-icons/Feather';

type MaterialIconsName = keyof typeof MaterialIcons.glyphMap;
type EvilIconsName = keyof typeof EvilIcons.glyphMap;
type AntDesignName = keyof typeof AntDesign.glyphMap;
type MaterialCommunityIconsName = keyof typeof MaterialCommunityIcons.glyphMap;
type FeatherName = keyof typeof Feather.glyphMap;

interface ButtonProps {
  icon: MaterialIconsName | EvilIconsName | AntDesignName | MaterialCommunityIconsName | FeatherName;
  iconFamily: "MaterialIcons" | "EvilIcons" | "AntDesign" | "MaterialCommunityIcons" | "Feather";
  text: string;
  onPress: () => void;
  visible?: boolean;
}

interface CardWithButtonsProps {
  title: string;
  button1: ButtonProps;
  button2: ButtonProps;
  button3: ButtonProps;
}

const CardWithButtons: React.FC<CardWithButtonsProps> = ({
  title,
  button1,
  button2,
  button3,
}) => {
  const renderIcon = (iconFamily: string, iconName: string) => {
    switch (iconFamily) {
      case "MaterialIcons":
        return <MaterialIcons name={iconName as MaterialIconsName} size={24} color="#333" />;
      case "EvilIcons":
        return <EvilIcons name={iconName as EvilIconsName} size={24} color="#333" />;
      case "AntDesign":
        return <AntDesign name={iconName as AntDesignName} size={24} color="#333" />;
      case "MaterialCommunityIcons":
        return <MaterialCommunityIcons name={iconName as MaterialCommunityIconsName} size={24} color="black" />;
      case "Feather":
        return <Feather name={iconName as FeatherName} size={24} color="black" />;
      default:
        return null;
    }
  };

  const renderButton = (button: ButtonProps) => {
    if (button.visible === false) return null; // Skip rendering if visible is explicitly false
    return (
      <TouchableOpacity style={styles.button} onPress={button.onPress}>
        {renderIcon(button.iconFamily, button.icon)}
        <Text style={styles.buttonText}>{button.text}</Text>
        <AntDesign name="arrowright" size={24} color="#333" />
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.card}>
      {/* Title */}
      <Text style={styles.title}>{title}</Text>

      {/* Buttons */}
      {renderButton(button1)}
      {renderButton(button2)}
      {renderButton(button3)}
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
    elevation: 1,
  },
  buttonText: {
    flex: 1,
    marginLeft: 10,
    fontSize: 16,
    color: "#333",
  },
});

export default CardWithButtons;
