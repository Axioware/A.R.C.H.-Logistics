import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { MaterialCommunityIcons, MaterialIcons, AntDesign } from "@expo/vector-icons";
import CardWithButtons from "../../components/CardWithButtons"; // Assuming CardWithButtons is in the same directory
import { useRouter } from "expo-router";

export default function Picking() {
  const router = useRouter();
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        {/* Back Button */}
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <AntDesign name="arrowleft" size={24} color="#333" />
          <Text style={styles.backButtonText}></Text>
        </TouchableOpacity>

        {/* Profile Card with Reusable Component */}
        <CardWithButtons
          title= "Picking"
          button1={{
            icon: "basket",
            iconFamily: "MaterialCommunityIcons",
            text: "Multi-Item Batch Picking",
            onPress: "/multi_item", // Route name
            visible: true,
          }}
          button2={{
            icon: "box",
            iconFamily: "Feather",
            text: "Single-Order Batch Picking",
            onPress: "/single_order",
            visible: true,
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
