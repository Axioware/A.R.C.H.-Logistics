import { useRouter, usePathname } from 'expo-router'; // Import router
import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import EvilIcons from "@expo/vector-icons/EvilIcons";
import AntDesign from "@expo/vector-icons/AntDesign";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import Feather from '@expo/vector-icons/Feather';
import FontAwesome from '@expo/vector-icons/FontAwesome';

type IconFamilies = "MaterialIcons" | "EvilIcons" | "AntDesign" | "MaterialCommunityIcons" | "Feather" | "FontAwesome";

interface ButtonProps {
  icon: string;
  iconFamily: IconFamilies;
  text: string;
  onPress: string; // Path as string
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
  const router = useRouter();

  const renderIcon = (iconFamily: IconFamilies, iconName: string) => {
    const IconComponent = {
      MaterialIcons,
      EvilIcons,
      AntDesign,
      MaterialCommunityIcons,
      Feather,
      FontAwesome,
    }[iconFamily];

    return <IconComponent name={iconName as any} size={24} color="black" />;
  };

  const handlePress = (route: string) => {
    router.push(route as any); // Trick TypeScript to accept the route
  };

  const renderButton = (button: ButtonProps) => {
    if (button.visible === false) return null;
    return (
      <TouchableOpacity style={styles.button} onPress={() => handlePress(button.onPress)}>
        {renderIcon(button.iconFamily, button.icon)}
        <Text style={styles.buttonText}>{button.text}</Text>
        <AntDesign name="arrowright" size={24} color="#333" />
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.card}>
      <Text style={styles.title}>{title}</Text>
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
    marginBottom: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 15,
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 10,
    marginVertical: 8,
    backgroundColor: "#f9f9f9",
    borderRadius: 8,
  },
  buttonText: {
    flex: 1,
    marginLeft: 10,
    fontSize: 16,
  },
});

export default CardWithButtons;
