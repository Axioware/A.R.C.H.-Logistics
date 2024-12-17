import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import { FontAwesome, MaterialIcons } from "@expo/vector-icons";

export default function Dashboard() {
  // Load Custom Fonts
  const [fontsLoaded] = useFonts({
    tahoma: require("../assets/fonts/tahoma.ttf"), // Adjust path to your font folder
  });

  // Keep the splash screen visible while fonts are loading
  useEffect(() => {
    async function prepare() {
      if (!fontsLoaded) {
        await SplashScreen.preventAutoHideAsync();
      } else {
        await SplashScreen.hideAsync();
      }
    }
    prepare();
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <View style={styles.container}>
      {/* Top Section */}
      <View style={styles.topSection}>
        <Image source={require("../assets/logo.png")} style={styles.logo} />
        <TouchableOpacity style={styles.profileButton}>
          <Text style={styles.profileText}>Profile</Text>
        </TouchableOpacity>
      </View>

      {/* Overview Section */}
      <View style={styles.overviewContainer}>
        <Text style={styles.overviewTitle}>Overview</Text>
        <View style={styles.overviewBox}>
          {/* Left Section */}
          <View style={styles.leftSection}>
            <Text style={styles.bigText}>21</Text>
            <Text style={styles.smallText}>ORDERS</Text>
            <Text style={styles.greenText}>ready to ship</Text>

            <View style={styles.footerRow}>
              <Text style={styles.footerText}>
                <Text style={styles.boldText}>9</Text> DUE TODAY
              </Text>
              <Text style={styles.footerText}>
                <Text style={styles.boldText}>0</Text> SHIPPED TODAY
              </Text>
            </View>
          </View>

          {/* Right Section - White Card */}
          <View style={styles.rightCard}>
            <Text style={styles.bigText}>31</Text>
            <Text style={styles.smallText}>ITEMS</Text>
            <Text style={styles.greenTextCard}>ready to pick</Text>
          </View>
        </View>
      </View>

      {/* New Card Section */}
      <View style={styles.newCard}>
        <Text style={styles.cardTitle}>How would you like to proceed?</Text>

        {/* Multi Item Orders Button */}
       {/* Multi Item Orders Button */}
        <TouchableOpacity style={[styles.buttonContainer, { borderTopWidth: 0 }]}>
        <View style={styles.buttonContent}>
            <FontAwesome name="cubes" size={24} color="#00000" />
            <View style={styles.buttonTextContainer}>
            <Text style={styles.buttonTitle}>Multi Item Orders</Text>
            <Text style={styles.buttonFooter}>
                Pick multi SKU orders into individual totes
            </Text>
            </View>
            <MaterialIcons name="keyboard-arrow-right" size={24} color="#555" />
        </View>
        </TouchableOpacity>

        {/* Single Order Button */}
        <TouchableOpacity style={[styles.buttonContainer, { borderTopWidth: 1, borderTopColor: "#ddd" }]}>
        <View style={styles.buttonContent}>
            <FontAwesome name="shopping-bag" size={24} color="#00000" />
            <View style={styles.buttonTextContainer}>
            <Text style={styles.buttonTitle}>Single Order</Text>
            <Text style={styles.buttonFooter}>
                Pick a specific order
            </Text>
            </View>
            <MaterialIcons name="keyboard-arrow-right" size={24} color="#555" />
        </View>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f9f9f9",
    padding: 20,
  },
  topSection: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  logo: {
    width: 100,
    height: 50,
    resizeMode: "contain",
  },
  profileButton: {
    backgroundColor: "#007bff",
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
  },
  profileText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
    fontFamily: "tahoma",
  },
  overviewContainer: {
    backgroundColor: "#ffffff",
    borderRadius: 12,
    padding: 15,
    elevation: 4,
  },
  overviewTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 15,
    fontFamily: "tahoma",
  },
  overviewBox: {
    flexDirection: "row",
    backgroundColor: "#f3f3f3",
    borderRadius: 10,
    padding: 20,
    position: "relative",
  },
  leftSection: {
    flex: 1,
  },
  bigText: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#000",
    fontFamily: "tahoma",
  },
  smallText: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#777",
    marginBottom: 5,
    fontFamily: "tahoma",
  },
  greenText: {
    backgroundColor: "#e6f8ea",
    color: "#28a745",
    fontSize: 12,
    padding: 5,
    borderRadius: 5,
    marginBottom: 15,
    width: 70,
    textAlign: "center",
    fontFamily: "tahoma",
  },
  rightCard: {
    position: "absolute",
    width: 150,
    height: 100,
    top: 5,
    right: 10,
    backgroundColor: "#ffffff",
    padding: 13,
    borderRadius: 10,
    elevation: 4,
  },
  footerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  footerText: {
    fontSize: 12,
    color: "#555",
    fontFamily: "tahoma",
  },
  boldText: {
    fontSize: 20,
    fontWeight: "bold",
  },
  greenTextCard: {
    backgroundColor: "#e6f8ea",
    color: "#28a745",
    fontSize: 12,
    padding: 5,
    borderRadius: 5,
    marginTop: 2,
    width: 70,
    textAlign: "center",
  },
  // New Card Styles
  newCard: {
    marginTop: 20,
    backgroundColor: "#ffffff",
    borderRadius: 12,
    padding: 15,
    elevation: 4,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
    fontFamily: "tahoma",
  },
  buttonContainer: {
    marginHorizontal: 10, // Adds spacing on both left and right
    borderRadius: 8, // Slight rounded corners for a softer look
    paddingVertical: 12, // Adjust the vertical padding
    paddingHorizontal: 10, // Adds spacing inside the button from left and right
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff", // Optional for visibility
  },
  
  buttonContent: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  buttonTextContainer: {
    flex: 1,
    marginLeft: 15,
  },
  buttonTitle: {
    fontSize: 16,
    fontWeight: "bold",
    fontFamily: "tahoma",
  },
  buttonFooter: {
    fontSize: 12,
    color: "#777",
    fontFamily: "tahoma",
  },
  
});
