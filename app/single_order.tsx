import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";
import ToggleSwitch from "toggle-switch-react-native";
import { useRouter } from 'expo-router';

const { width, height } = Dimensions.get("window");

const SingleOrderBatchPicking = () => {
  const [excludeSingleLine, setExcludeSingleLine] = useState(true);
  const [pickByTag, setPickByTag] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);
  const [isPicking, setIsPicking] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 3000); // 3 seconds delay
  }, []);

  const handleStartPicking = () => {
    setIsPicking(true);
    setShowPopup(false);

    setTimeout(() => {
      setIsPicking(false);
      setShowPopup(true);
    }, 5000);
  };

  if (loading) {
    return (
      <View style={styles.container}>
        {/* Back Button */}
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <AntDesign name="arrowleft" size={23} color="black" />
        </TouchableOpacity>

        {/* Main Card */}
        <View style={styles.card}>
          <Text style={styles.title}>Single Order Batch Picking</Text>
          <Image source={require("../assets/multi.png")} style={styles.image} />
          <Text style={styles.fetchingText}>Fetching data, please wait...</Text>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Back Button */}
      <TouchableOpacity style={styles.backButton}
      onPress={() => router.back()}>
        <AntDesign name="arrowleft" size={23} color="black" />
      </TouchableOpacity>

      {/* Main Card */}
      <View style={styles.card}>
        <Text style={styles.title}>Single Order Batch Picking</Text>
        <Image source={require("../assets/multi.png")} style={styles.image} />
        <Text style={styles.description}>
          You do not have any single order picking batches.
        </Text>
      </View>

      {/* Quantity and Start Button Container */}
      <View style={styles.bottomContainer}>
        <TouchableOpacity
          style={styles.startButton}
          onPress={handleStartPicking}
        >
          <Text style={styles.startButtonText}>
            {isPicking ? "Loading, please wait.." : "Start Picking"}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f9fa",
  },
  backButton: {
    position: "absolute",
    top: 10,
    left: 20,
    padding: 10,
    zIndex: 10,
  },
  card: {
    marginTop: 70,
    width: "92%",
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    alignItems: "center",
    alignSelf: "center",
    paddingBottom: 20, // Extra padding at the bottom
    minHeight: height * 0.3, // Minimum height
  },
  
  title: {
    fontSize: 25,
    fontWeight: "bold",
    marginBottom: 25,
  },
  fetchingText: {
    fontSize: 20,
    fontWeight: "800",
    textAlign: "center",
    marginTop: 20,
    color: "black",
    marginBottom: 20,
  },
  image: {
    width: 150,
    height: 150,
    marginBottom: 25,
  },
  description: {
    fontSize: 20,
    // textAlign: "center",
    marginBottom: 20,
    fontWeight: "800",
    // marginTop: 20, 
  },
  toggleRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginVertical: 10,
    alignItems: "center",
  },
  toggleText: {
    fontSize: 16,
    fontWeight: "600",
  },
  toggleTrackOn: {
    height: 35,
    width: 55,
    borderRadius: 20,
    backgroundColor: "black",
    paddingHorizontal: 4,
  },
  toggleTrackOff: {
    height: 35,
    width: 55,
    borderRadius: 20,
    backgroundColor: "lightgrey",
    paddingHorizontal: 4,
  },
  toggleOnThumb: {
    width: 28,
    height: 28,
    backgroundColor: "white",
    borderRadius: 17,
    elevation: 3,
  },
  toggleOffThumb: {
    width: 28,
    height: 28,
    backgroundColor: "white",
    borderRadius: 17,
    elevation: 3,
  },
  bottomContainer: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    width: width,
    paddingBottom: 20,
  },
  quantityContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    width: width * 0.9,
    marginBottom: 20,
  },
  quantityCard: {
    width: 55,
    height: 50,
    backgroundColor: "black",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    elevation: 2,
  },
  quantityCardCenter: {
    width: 90,
    height: 50,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    elevation: 2,
  },
  quantityButtonBlack: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
  },
  quantityText: {
    fontSize: 20,
    fontWeight: "bold",
  },
  startButton: {
    width: width * 0.9,
    backgroundColor: "white",
    paddingVertical: 15,
    alignItems: "center",
    borderRadius: 10,
    elevation: 2,
  },
  startButtonText: {
    color: "black",
    fontSize: 18,
    fontWeight: "bold",
  },
  popup: {
    position: "absolute",
    bottom: 20,
    backgroundColor: "white",
    padding: 18,
    width: "90%",
    borderRadius: 10,
    alignSelf: "center",
    elevation: 2,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  popupText: {
    fontSize: 16,
    // fontWeight: "bold",
    color: "black",
  },
  popupClose: {
    color: "black",
    // fontWeight: "bold",
  },
});

export default SingleOrderBatchPicking;
