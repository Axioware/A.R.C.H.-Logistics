import React from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";

const { width, height } = Dimensions.get("window");

const SuccessPage = () => {
  return (
    <View style={styles.container}>
      {/* Back Button */}
      <TouchableOpacity style={styles.backButton}>
        <AntDesign name="arrowleft" size={23} color="black" />
      </TouchableOpacity>

      {/* Main Card */}
      <View style={styles.card}>
        <Text style={styles.title}>Hooray! All products are picked.</Text>
        <Text style={styles.description}>What do you want to do next?</Text>
        <Image source={require("../assets/hooray.png")} style={styles.image} />

        {/* Buttons Inside Card */}
        <TouchableOpacity style={styles.actionButton1}>
          <Text style={styles.actionButtonText1}>Pick More!</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.actionButton2}>
          <Text style={styles.actionButtonText2}>Go back to Dashboard</Text>
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
    // alignItems: "center",
    alignSelf: "center",
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    paddingBottom: 30,
  },
  title: {
    fontSize: 23,
    fontWeight: "bold",
    marginBottom: 20,
    borderLeftWidth: 3,
    borderLeftColor: "black",
    paddingLeft: 8,
    // textAlign: "center",
  },
  description: {
    fontSize: 18,
    // textAlign: "center",
    marginBottom: 20,
    fontWeight: "800",
  },
  image: {
    width: 175,
    height: 175,
    marginBottom: 20,
    alignSelf: "center",
  },
  actionButton1: {
    width: "100%",
    backgroundColor: "white",
    paddingVertical: 19,
    alignItems: "center",
    borderRadius: 10,
    elevation: 4,
    marginBottom: 15,
    // borderWidth: 1,
    // borderColor: "black",
  },
  actionButton2: {
    width: "100%",
    backgroundColor: "black",
    paddingVertical: 19,
    alignItems: "center",
    borderRadius: 10,
    elevation: 2,
    marginBottom: 15,
    // borderWidth: 1,
    // borderColor: "black",
  },
  actionButtonText1: {
    color: "black",
    fontSize: 18,
    fontWeight: 900,
  },
  actionButtonText2: {
    color: "white",
    fontSize: 18,
    fontWeight: 900,
  },
});

export default SuccessPage;
