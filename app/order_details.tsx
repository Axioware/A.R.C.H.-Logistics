import React, { useState, useRef } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Animated,
  FlatList,
  Image,
  StyleSheet,
} from "react-native";

const OrderDetailsPage = () => {
  const orderId = "#ORD12345";
  const [selectedTab, setSelectedTab] = useState("products");
  const slideAnim = useRef(new Animated.Value(0)).current;
  const [searchQuery, setSearchQuery] = useState("");

  const products = [
    { id: "P001", name: "Product A", quantity: 2, image: null },
    { id: "P002", name: "Product B", quantity: 1, image: "https://via.placeholder.com/50" },
    { id: "P003", name: "Product C", quantity: 3, image: "https://via.placeholder.com/50" },
  ];

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
    outputRange: ["0%", "50%"],
  });

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton}>
        <Text style={styles.backText}>← Back</Text>
      </TouchableOpacity>
      <Text style={styles.title}>{orderId}</Text>

      {/* Segmented Control */}
      <View style={styles.segmentedControl}>
        <Animated.View style={[styles.slider, { left: slideInterpolation }]} />

        <TouchableOpacity style={styles.segmentButton} onPress={() => handleTabPress("products")}>
          <Text style={[styles.segmentText, selectedTab === "products" && styles.activeText]}>
            Products
          </Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.segmentButton} onPress={() => handleTabPress("details")}>
          <Text style={[styles.segmentText, selectedTab === "details" && styles.activeText]}>
            Order Details
          </Text>
        </TouchableOpacity>
      </View>

      {/* Products Section */}
      {selectedTab === "products" && (
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <Text style={styles.cardTitle}>Products</Text>
            <Text style={styles.cardSubtitle}>Total: {products.length}</Text>
          </View>
          <TextInput
            style={styles.searchBar}
            placeholder="Search product"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          <FlatList
            data={products}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <View style={styles.productItem}>
                <Image source={{ uri: item.image }} style={styles.productImage} />
                <View style={styles.productInfo}>
                  <Text style={styles.productId}>{item.id}</Text>
                  <Text style={styles.productName}>{item.name}</Text>
                </View>
                <Text style={styles.productQuantity}>Qty: {item.quantity}</Text>
              </View>
            )}
          />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F5F5F5", padding: 20 },
  backButton: { marginBottom: 10 },
  backText: { fontSize: 16, color: "#000" },
  title: { fontSize: 22, fontWeight: "bold", textAlign: "center", marginBottom: 20 },

  segmentedControl: {
    flexDirection: "row",
    backgroundColor: "#E5E5E5",
    borderRadius: 8,
    marginBottom: 20,
    position: "relative",
  },
  segmentButton: { flex: 1, paddingVertical: 10, alignItems: "center", zIndex: 1 },
  slider: {
    position: "absolute",
    width: "50%",
    height: "100%",
    backgroundColor: "white",
    borderRadius: 8,
  },
  segmentText: { fontSize: 16, color: "#666" },
  activeText: { color: "#000", fontWeight: "bold" },

  card: { backgroundColor: "white", padding: 15, borderRadius: 10, elevation: 2 },
  cardHeader: { flexDirection: "row", justifyContent: "space-between", marginBottom: 10 },
  cardTitle: { fontSize: 18, fontWeight: "bold" },
  cardSubtitle: { fontSize: 16, color: "#666" },
  searchBar: { backgroundColor: "#F5F5F5", padding: 10, borderRadius: 8, marginBottom: 10 },

  productItem: { flexDirection: "row", alignItems: "center", paddingVertical: 10, borderBottomWidth: 1, borderBottomColor: "#E5E5E5" },
  productImage: { width: 50, height: 50, borderRadius: 8, marginRight: 10 },
  productInfo: { flex: 1 },
  productId: { fontSize: 14, color: "#888" },
  productName: { fontSize: 16, fontWeight: "bold" },
  productQuantity: { fontSize: 16, fontWeight: "bold", color: "#000" },
});

export default OrderDetailsPage;
