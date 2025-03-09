import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Dimensions,
  ActivityIndicator,
} from "react-native";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { FontAwesome, MaterialIcons } from "@expo/vector-icons";
import { Stack } from 'expo-router';
import { useRouter } from 'expo-router';

// Get screen dimensions for responsiveness
const { width } = Dimensions.get("window");

export default function Dashboard() {
  // State variables with default values set to 0
  const [orders, setOrders] = useState(0);
  const [items, setItems] = useState(0);
  const [dueToday, setDueToday] = useState(0);
  const [shippedToday, setShippedToday] = useState(0);
  const [loading, setLoading] = useState(false); // No API fetch for now
  const router = useRouter();

  // export default function Dashboard() {
  //   // State variables to store fetched data
  //   const [orders, setOrders] = useState<number | null>(null);
  //   const [items, setItems] = useState<number | null>(null);
  //   const [dueToday, setDueToday] = useState<number | null>(null);
  //   const [shippedToday, setShippedToday] = useState<number | null>(null);
  //   const [loading, setLoading] = useState(true);

  // Load Custom Fonts
  const [fontsLoaded] = useFonts({
    tahoma: require("../../assets/fonts/tahoma.ttf"),
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

  // // Fetch data from API
  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const response = await fetch("https://your-api.com/dashboard-data");
  //       const data = await response.json();

  //       // ✅ Store API data into state
  //       setOrders(data.orders || 0);
  //       setItems(data.items || 0);
  //       setDueToday(data.dueToday || 0);
  //       setShippedToday(data.shippedToday || 0);
  //     } catch (error) {
  //       console.error("Error fetching data:", error);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   fetchData();
  // }, []);

  if (!fontsLoaded) {
    return null;
  }

  // Get screen height for dynamic logo sizing
  const screenHeight = Dimensions.get("window").height;
  const logoHeight = screenHeight * 0.07;
  const profileHeight = screenHeight * 0.07;

  return (
    <SafeAreaView style={styles.container}>
      {/* Top Section */}
      <View style={styles.topSection}>
        <Image
          source={require("../../assets/logo.png")}
          style={[styles.logo, { height: logoHeight }]}
          resizeMode="contain"
        />

        {/* Profile Button */}
        <TouchableOpacity style={styles.profileButton}
        onPress={() => router.push('/settings')}>
          <Image
            source={{ uri: "https://via.placeholder.com/50x50.png?text= " }}
            style={[styles.profileImage, { height: profileHeight }]}
          />
        </TouchableOpacity>
      </View>

      {/* Overview Section */}
      <View style={styles.overviewContainer}>
        <Text style={styles.overviewTitle}>Overview</Text>

        {loading ? (
          <ActivityIndicator size="large" color="#000" />
        ) : (
          <View style={styles.overviewBox}>
            {/* Left Section */}
            <View style={styles.leftSection}>
              <View style={{ flexGrow: 1 }}>
                <Text style={styles.bigText}>{orders}</Text>
                <Text style={styles.smallText}>ORDERS</Text>
                <View style={styles.greenTextContainer}>
                  <Text style={styles.greenText}>ready to ship</Text>
                </View>
              </View>

              <View style={styles.footerRow}>
                <Text style={styles.footerText}>
                  <Text style={styles.boldText}>{dueToday}</Text> DUE TODAY
                </Text>
                <Text style={styles.footerText}>
                  <Text style={styles.boldText}>{shippedToday}</Text> SHIPPED
                  TODAY
                </Text>
              </View>
            </View>

            {/* Right Section - White Card */}
            <View style={styles.rightCard}>
              <Text style={styles.bigText}>{items}</Text>
              <Text style={styles.smallText}>ITEMS</Text>
              <View style={styles.greenTextContainer}>
                <Text style={styles.greenTextCard}>ready to pick</Text>
              </View>
            </View>
          </View>
        )}
      </View>

      <View style={styles.newCard}>
        <Text style={styles.cardTitle}>How would you like to proceed?</Text>

        {/* Multi Item Orders Button */}
        <TouchableOpacity
          style={[styles.buttonContainer, { borderTopWidth: 0 }]}
          onPress={() => router.push('/multi_item')}
        >
          <View style={styles.buttonContent}>
            <FontAwesome name="cubes" size={20} color="#00000" />
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
        <TouchableOpacity
          style={[
            styles.buttonContainer,
            { borderTopWidth: 1, borderTopColor: "#ddd" },
          ]}
          onPress={() => router.push('/single_order')}
        >
          <View style={styles.buttonContent}>
            <FontAwesome name="shopping-bag" size={20} color="#00000" />
            <View style={styles.buttonTextContainer}>
              <Text style={styles.buttonTitle}>Single Order</Text>
              <Text style={styles.buttonFooter}>Pick a specific order</Text>
            </View>
            <MaterialIcons name="keyboard-arrow-right" size={24} color="#555" />
          </View>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f9f9f9",
    padding: 20,
  },
  topSection: {
    justifyContent: "center", // Center the logo horizontally
    alignItems: "center", // Center the logo vertically
    marginBottom: 5,
    position: "relative", // Needed for the absolute profile button
  },
  logo: {
    width: "40%", // Adjust the width of the logo
    alignSelf: "center", // Center the logo horizontally
    marginBottom: 10, // Space between logo and content
  },
  profileButton: {
    position: "absolute",
    right: 0, // Align the button to the right
    top: 10, // Add top margin
    width: 50,
    height: 50,
    borderRadius: 25, // Circular button
    backgroundColor: "#d3d3d3", // Grey background
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden", // Ensures content inside is clipped properly
  },
  profileImage: {
    width: "80%",
    height: "80%",
    borderRadius: 25, // Ensures circular shape
  },
  overviewContainer: {
    backgroundColor: "#ffffff",
    borderRadius: 12,
    height: "38%",
    padding: 15,
    elevation: 4,
  },
  greenTextCard: {
    color: "white",
    fontSize: 13,
    fontWeight: "bold",
    textAlign: "center",
    fontFamily: "tahoma",
  },
  overviewTitle: {
    fontSize: 25,
    fontWeight: "bold",
    marginBottom: 15,
    fontFamily: "tahoma",
    borderLeftColor: "black",
    borderLeftWidth: 3,
    paddingLeft: 8,
  },
  overviewBox: {
    flexDirection: "row",
    backgroundColor: "#f3f3f3",
    borderRadius: 10,
    padding: 18,
    position: "relative",
    justifyContent: "space-between", // Space between left and right sections
    height: "73%", // Ensures both sections occupy full height
  },
  leftSection: {
    top: 4,
    flex: 1,
    alignItems: "flex-start",
  },
  bigText: {
    fontSize: 31,
    fontWeight: "bold",
    color: "#000",
    fontFamily: "tahoma",
  },
  smallText: {
    fontSize: 15,
    fontWeight: "bold",
    color: "#777",
    marginBottom: 5,
    fontFamily: "tahoma",
  },
  greenTextContainer: {
    backgroundColor: "rgba(0, 0, 0, 0.8)", // Black with 50% transparency
    borderRadius: 8,
    paddingVertical: 5,
    paddingHorizontal: 8, 
    alignSelf: "flex-start",
  },
  
  greenText: {
    color: "white",
    fontSize: 13,
    fontWeight: "bold",
    textAlign: "center",
    fontFamily: "tahoma",
  },
  rightCard: {
    position: "absolute",
    width: "52%",
    height: "auto",
    top: 8,
    right: 8,
    backgroundColor: "#ffffff",
    padding: 13,
    borderRadius: 10,
    elevation: 4,
    // justifyContent: "center",
    // overflow: "hidden",
  },
  footerRow: {
    flexDirection: "row",
    width: "90%", // Use full width to ensure no overflow
    justifyContent: "space-between",
  },
  footerText: {
    fontSize: 13,
    color: "#555",
    fontFamily: "tahoma",
  },
  boldText: {
    fontSize: 20,
    fontWeight: "bold",
  },
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
    marginHorizontal: 10,
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 10,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
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
