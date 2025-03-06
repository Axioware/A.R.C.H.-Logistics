import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import CardWithButtons from "../../components/CardWithButtons"; // Assuming CardWithButtons is in the same directory
import { useRouter } from "expo-router";

export default function Scan() {
  const router = useRouter();
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        {/* Back Button */}
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <MaterialIcons name="arrow-back" size={24} color="#333" />
          <Text style={styles.backButtonText}>Back</Text>
        </TouchableOpacity>

        {/* Profile Card with Reusable Component */}
        <CardWithButtons
          title="Multi-Item Batch Picking"
          button1={{
            icon: "account",
            iconFamily: "FontAwesome",
            text: "Account Information",
            onPress: "/acc_info", // Route name
            visible: true,
          }}
          button2={{
            icon: "lock",
            iconFamily: "Feather",
            text: "Change Password",
            onPress: "/acc_change_password",
            visible: false,
          }}
          button3={{
            icon: "lock",
            iconFamily: "Feather",
            text: "Hidden Option",
            onPress: "/hidden_route",
            visible: false,
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
