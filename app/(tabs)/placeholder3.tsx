import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { MaterialIcons } from "@expo/vector-icons";
import CardWithButtons from "../../components/CardWithButtons"; // Assuming CardWithButtons is in the same directory

export default function Settings() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        {/* Back Button */}
        <TouchableOpacity style={styles.backButton} onPress={() => console.log("Back pressed")}>
          <MaterialIcons name="arrow-back" size={24} color="#333" />
          <Text style={styles.backButtonText}>Back</Text>
        </TouchableOpacity>

        {/* Profile Card with Reusable Component */}
        <CardWithButtons
          title="Settings"
          button1={{
            icon: "lock",
            text: "Change Password",
            onPress: () => console.log("Change Password Pressed"),
            visible: true, // Show this button
          }}
          button2={{
            icon: "settings",
            text: "Settings",
            onPress: () => console.log("Settings pressed"),
            visible: false, // Show this button
          }}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#f9f9f9",
  },
  container: {
    flex: 1,
    padding: 20,
  },
  backButton: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  backButtonText: {
    marginLeft: 10,
    fontSize: 16,
    color: "#333",
  },
});
