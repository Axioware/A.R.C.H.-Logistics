import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, TextInput } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { MaterialIcons } from "@expo/vector-icons";
import { useRouter } from 'expo-router';
import CardWithInputs from "../components/CardWithInputs"; // Assuming CardWithInputs is in the same directory

export default function AccountChangePassowrd() {
  const [name, setNewPassword] = useState("");
  const [email, setConfirmMatch] = useState("");
  const router = useRouter();

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        {/* Back Button */}
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <MaterialIcons name="arrow-back" size={24} color="#333" />
          <Text style={styles.backButtonText}>Back</Text>
        </TouchableOpacity>

        {/* Card with Input Fields */}
        <CardWithInputs
          title="Change Password"
          inputFields={[
            { placeholder: "New Password", value: name, onChangeText: setNewPassword },
            { placeholder: "Confirm Password", value: email, onChangeText: setConfirmMatch },
          ]}
        />

        {/* Save Button */}
        <TouchableOpacity style={styles.saveButton} onPress={() => console.log("Save pressed")}>
          <Text style={styles.saveButtonText}>Save</Text>
        </TouchableOpacity>
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
  saveButton: {
    backgroundColor: "#000000",
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    marginTop: "auto",
    width: "100%",
  },
  saveButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
