import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { MaterialIcons } from "@expo/vector-icons";
import CardWithButtons from "../components/CardWithButtons"; // Assuming CardWithButtons is in the same directory

export default function InventoryCount() {
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
          title="Inventory Count"
          button1={{
            icon: "stepforward",
            iconFamily: "AntDesign",
            text: "Count Product",
            onPress: () => console.log("Search Products pressed"),
            visible: true,
          }}
          button2={{
            icon: "location",
            iconFamily: "EvilIcons",
            text: "Count Locations",
            onPress: () => console.log("Search by Location pressed"),
            visible: true,
          }}
          button3={{
            icon: "stepforward",
            iconFamily: "AntDesign",
            text: "Inventory Count",
            onPress: () => console.log("Inventory Count pressed"),
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
  logoutButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 10,
    marginTop: "auto",
  },
  logoutText: {
    marginLeft: 10,
    fontSize: 16,
    color: "#333",
    fontWeight: "bold",
  },
  shadow: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 3,
  },
});
