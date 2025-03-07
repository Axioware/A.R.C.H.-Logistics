import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import CardWithButtons from "../../components/CardWithButtons";
import { MaterialIcons } from "@expo/vector-icons";
import EvilIcons from '@expo/vector-icons/EvilIcons';
import AntDesign from '@expo/vector-icons/AntDesign'; // Assuming CardWithButtons is in the same directory
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { useRouter } from "expo-router";

export default function Profile() {
  const router = useRouter();
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        {/* Back Button */}
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <AntDesign name="arrowleft" size={24} color="#333" />
          <Text style={styles.backButtonText}>Back</Text>
        </TouchableOpacity>

        {/* Profile Card with Reusable Component */}
        <CardWithButtons
          title="Inventory"
          button1={{
            icon: "text-search",
            iconFamily: "MaterialCommunityIcons",
            text: "Search Products",
            onPress: "/product_list", // Route name
            visible: true,
          }}
          button2={{
            icon: "location-pin",
            iconFamily: "Entypo",
            text: "Search by Location",
            onPress: "/search_by_location", // Route name
            visible: true,
          }}
          button3={{
            icon: "clipboard",
            iconFamily: "Feather",
            text: "Inventory Count",
            onPress: "/inventory_count", // Route name
            visible: true,
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
