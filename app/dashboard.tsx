import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import { useFonts } from "expo-font";
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';

export default function Dashboard() {
  // Load Custom Fonts
  const [fontsLoaded] = useFonts({
    tahoma: require("../assets/fonts/tahoma.ttf"), // Adjust path to your font folder
  });
  
  // Keep the splash screen visible while fonts are loading
  useEffect(() => {
    async function prepare() {
      if (!fontsLoaded) {
        await SplashScreen.preventAutoHideAsync(); // Prevent splash screen from hiding
      } else {
        await SplashScreen.hideAsync(); // Hide splash screen once fonts are loaded
      }
    }
    prepare();
  }, [fontsLoaded]);
  
  if (!fontsLoaded) {
    return null; // Don't render anything while fonts are loading
  }

  return (
    <View style={styles.container}>
      {/* Top Section */}
      <View style={styles.topSection}>
        {/* Logo */}
        <Image source={require("../assets/logo.png")} style={styles.logo} />

        {/* Profile Button */}
        <TouchableOpacity style={styles.profileButton}>
          <Text style={styles.profileText}>Profile</Text>
        </TouchableOpacity>
      </View>

      {/* Overview Section */}
      <View style={styles.overviewContainer}>
        {/* Title */}
        <Text style={styles.overviewTitle}>Overview</Text>

        {/* Overview Box */}
        <View style={styles.overviewBox}>
          {/* Left Section */}
          <View style={styles.leftSection}>
            <Text style={styles.bigText}>21</Text>
            <Text style={styles.smallText}>ORDERS</Text>
            <Text style={styles.greenText}>ready to ship</Text>

            {/* Footer Row */}
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
    fontFamily: "tahoma", // Apply font here too
  },
  overviewContainer: {
    backgroundColor: "#ffffff",
    borderRadius: 12,
    padding: 15,
    elevation: 4,
    fontFamily: "tahoma", // Parent Card Font
  },
  overviewTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 15,
    fontFamily: "tahoma", // Custom Font
  },
  overviewBox: {
    flexDirection: "row",
    backgroundColor: "#f3f3f3",
    borderRadius: 10,
    padding: 20,
    position: "relative",
    fontFamily: "tahoma", // Font applied to the box
  },
  leftSection: {
    flex: 1,
    justifyContent: "flex-start",
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
  greenTextCard: {
    backgroundColor: "#e6f8ea",
    color: "#28a745",
    fontSize: 12,
    padding: 5,
    borderRadius: 5,
    marginTop: 2,
    width: 70,
    textAlign: "center",
    fontFamily: "tahoma",
  },
  footerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
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
    paddingLeft: 15,
    borderRadius: 10,
    elevation: 4,
    fontFamily: "tahoma",
  },
});
