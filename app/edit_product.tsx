import React, { useState, useRef } from "react";
import { View, Text, TextInput, TouchableOpacity, Animated, StyleSheet } from "react-native";

const EditProductScreen = () => {
  const [selectedTab, setSelectedTab] = useState("product");
  const slideAnim = useRef(new Animated.Value(0)).current;

  const handleTabPress = (tab: "product" | "location") => { 
    setSelectedTab(tab);
    Animated.timing(slideAnim, {
      toValue: tab === "product" ? 0 : 1,
      duration: 200,
      useNativeDriver: false,
    }).start();
  };

  const slideInterpolation = slideAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ["0%", "50%"], // Moves halfway across
  });

  return (
    <View style={styles.container}>
      {/* Back & Title */}
      <TouchableOpacity style={styles.backButton}>
        <Text style={styles.backText}>← Back</Text>
      </TouchableOpacity>
      <Text style={styles.title}>Edit Product</Text>

      {/* Segmented Control */}
      <View style={styles.segmentedControl}>
        <Animated.View style={[styles.slider, { left: slideInterpolation }]} />

        <TouchableOpacity
          style={styles.segmentButton}
          onPress={() => handleTabPress("product")}
        >
          <Text style={[styles.segmentText, selectedTab === "product" && styles.activeText]}>
            Product Details
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.segmentButton}
          onPress={() => handleTabPress("location")}
        >
          <Text style={[styles.segmentText, selectedTab === "location" && styles.activeText]}>
            Locations Details
          </Text>
        </TouchableOpacity>
      </View>
''''''
      {/* Product Details Section */}
      {selectedTab === "product" && (
        <View style={styles.content}>
          <Text style={styles.label}>Name</Text>
          <TextInput style={styles.input} value="4 Pack Face Scrubber Soft Silicone Facial Cleansing" />

          <View style={styles.row}>
            <View style={styles.halfWidth}>
              <Text style={styles.label}>Quantity Available</Text>
              <TextInput style={styles.input} value="77" />
            </View>
            <View style={styles.halfWidth}>
              <Text style={styles.label}>Quantity Allocated</Text>
              <TextInput style={styles.input} value="0" />
            </View>
          </View>

          <Text style={styles.label}>On Hand</Text>
          <View style={styles.row}>
            <TextInput style={styles.input} value="77" />
            <TouchableOpacity style={styles.editButton}>
              <Text style={styles.editText}>Edit Inventory</Text>
            </TouchableOpacity>
          </View>

          <Text style={styles.label}>Barcode</Text>
          <TextInput style={styles.input} value="000012818398" />

          <Text style={styles.label}>Price</Text>
          <TextInput style={styles.input} value="6.09" />

          {/* Save Button */}
          <TouchableOpacity style={styles.saveButton}>
            <Text style={styles.saveText}>Save</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* Locations Details Placeholder */}
      {selectedTab === "location" && (
        <View style={styles.content}>
          <Text style={styles.label}>Location Details Section</Text>
          {/* Add Location Details Fields Here */}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F5F5F5", padding: 20 },
  backButton: { marginBottom: 10 },
  backText: { fontSize: 16, color: "#000" },
  title: { fontSize: 22, fontWeight: "bold", textAlign: "center" },
  
  segmentedControl: { 
    flexDirection: "row", 
    backgroundColor: "#E5E5E5", 
    borderRadius: 8, 
    marginVertical: 20, 
    overflow: "hidden",
    position: "relative",
  },
  segmentButton: { 
    flex: 1, 
    paddingVertical: 10, 
    alignItems: "center", 
    zIndex: 1 
  },
  slider: {
    position: "absolute",
    width: "50%",
    height: "100%",
    backgroundColor: "white",
    borderRadius: 8,
    shadowOpacity: 0.1,
    shadowRadius: 3,
    shadowOffset: { width: 0, height: 2 },
  },
  segmentText: { fontSize: 16, color: "#666" },
  activeText: { color: "#000", fontWeight: "bold" },

  content: { backgroundColor: "white", padding: 20, borderRadius: 10, elevation: 2 },
  label: { fontSize: 14, fontWeight: "bold", marginBottom: 5 },
  input: { backgroundColor: "#F5F5F5", padding: 10, borderRadius: 8, marginBottom: 10 },
  
  row: { flexDirection: "row", alignItems: "center", justifyContent: "space-between" },
  halfWidth: { width: "48%" },
  
  editButton: { backgroundColor: "black", padding: 10, borderRadius: 8, marginLeft: 10 },
  editText: { color: "white", fontWeight: "bold" },

  saveButton: { backgroundColor: "#4CAF50", padding: 15, borderRadius: 8, marginTop: 20 },
  saveText: { color: "white", fontSize: 16, fontWeight: "bold", textAlign: "center" },
});

export default EditProductScreen;
