import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  TextInput,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
  Image,
  StyleSheet,
  SafeAreaView,
  Animated,
  Dimensions,
} from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";
import { useNavigation } from "@react-navigation/native";

const screenHeight = Dimensions.get("window").height;
const OrderDetailsPage = () => {
  const navigation = useNavigation();
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState<
    { id: number; name: string; image: any }[]
  >([]);
  const [filteredProducts, setFilteredProducts] = useState<
    { id: number; name: string; image: any }[]
  >([]);
  const [selectedTab, setSelectedTab] = useState("product");
  const slideAnim = useRef(new Animated.Value(0)).current;
  const orderId = "#12345";
  const defaultImage = require("../assets/default.png");

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = () => {
    setLoading(true);
    setTimeout(() => {
      const newProducts = Array.from({ length: 1 }, (_, i) => ({
        id: i + 1,
        name: `Product ${i + 1}`,
        image: Math.random() > 0.5 ? `https://via.placeholder.com/150` : null,
      }));
      setProducts(
        newProducts.map((product) => ({
          ...product,
          image: product.image ? { uri: product.image } : defaultImage,
        }))
      );
      setLoading(false);
    }, 1500);
  };

  useEffect(() => {
    if (searchQuery) {
      setFilteredProducts(
        products.filter((product) =>
          product.name.toLowerCase().includes(searchQuery.toLowerCase())
        )
      );
    } else {
      setFilteredProducts(products);
    }
  }, [searchQuery, products]);

  const handleTabPress = (tab: "product" | "details") => {
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
    <SafeAreaView style={styles.safeAreaContainer}>
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <AntDesign name="arrowleft" size={24} color="black" />
          </TouchableOpacity>
          <Text style={styles.orderId}>{orderId}</Text>
          <View style={styles.sideContainer} />
        </View>

        <View style={styles.segmentedControl}>
          <Animated.View
            style={[styles.slider, { left: slideInterpolation }]}
          />
          <TouchableOpacity
            style={styles.segmentButton}
            onPress={() => handleTabPress("product")}
          >
            <Text
              style={[
                styles.segmentText,
                selectedTab === "product" && styles.activeText,
              ]}
            >
              Product
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.segmentButton}
            onPress={() => handleTabPress("details")}
          >
            <Text
              style={[
                styles.segmentText,
                selectedTab === "details" && styles.activeText,
              ]}
            >
              Order Details
            </Text>
          </TouchableOpacity>
        </View>

        {/* {selectedTab === "product" && (
          <View style={styles.card}>
            <View style={styles.titleContainer}>
              <Text style={styles.title}>
                Products{" "}
                <Text style={styles.productCount}>
                  ({filteredProducts.length})
                </Text>
              </Text>
            </View>
            <View style={styles.searchBar}>
              <AntDesign
                name="search1"
                size={18}
                color="black"
                style={styles.searchIcon}
              />
              <TextInput
                style={styles.searchInput}
                placeholder="Find a product..."
                value={searchQuery}
                onChangeText={setSearchQuery}
              />
              {loading && <ActivityIndicator size="small" color="#007BFF" />}
            </View>
          </View>
        )} */}

        {selectedTab === "product" ? (
          <View style={styles.card}>
            <View style={styles.titleContainer}>
              <Text style={styles.title}>
                Products{" "}
                <Text style={styles.productCount}>
                  ({filteredProducts.length})
                </Text>
              </Text>
            </View>
            <View style={styles.searchBar}>
              <AntDesign
                name="search1"
                size={18}
                color="black"
                style={styles.searchIcon}
              />
              <TextInput
                style={styles.searchInput}
                placeholder="Find a product..."
                value={searchQuery}
                onChangeText={setSearchQuery}
              />
              {loading && <ActivityIndicator size="small" color="#007BFF" />}
            </View>
            <FlatList
              data={filteredProducts}
              keyExtractor={(item) => item.id.toString()}
              renderItem={({ item }) => (
                <View style={styles.productItem}>
                  <Image
                    source={item.image}
                    style={styles.productImage}
                    resizeMode="cover"
                  />
                  <Text style={styles.productName}>{item.name}</Text>
                </View>
              )}
              style={styles.productList}
            />
          </View>
        ) : (
          <View style={styles.detailsContainer}>
            <Text style={styles.detailsText}>Order Date: Feb 26, 2025</Text>
            <Text style={styles.detailsText}>
              Shipping Address: 123 Street, City, Country
            </Text>
            <Text style={styles.detailsText}>Total Price: $250.00</Text>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeAreaContainer: { flex: 1, backgroundColor: "#fff" },
  container: { flex: 1 },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 16,
  },
  backButton: { padding: 8 },
  orderId: { fontSize: 18, fontWeight: "bold", textAlign: "center", flex: 1 },
  sideContainer: { width: 40 },
  segmentedControl: {
    flexDirection: "row",
    backgroundColor: "#E5E5E5",
    borderRadius: 8,
    marginVertical: 15,
    width: "92%",
    alignSelf: "center",
    overflow: "hidden",
    elevation: 3,
  },
  segmentButton: { flex: 1, paddingVertical: 10, alignItems: "center" },
  slider: {
    position: "absolute",
    width: "50%",
    height: "100%",
    backgroundColor: "white",
    borderRadius: 8,
  },
  segmentText: { fontSize: 16, color: "#666" },
  activeText: { color: "#000", fontWeight: "bold" },
    card: {
    padding: 16,
    backgroundColor: "white",
    borderRadius: 8,
    marginBottom: 15,
    elevation: 3,
    width: "92%",
    alignSelf: "center",
    minHeight: 120,  // Minimum height
    maxHeight: screenHeight * 0.6, // Limit max height
  },

  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  title: { fontSize: 18, fontWeight: "bold" },
  productCount: { fontSize: 16, color: "gray" },
  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#EEE",
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
  },
  productItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
    backgroundColor: "white",
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  productList: { maxHeight: 300 }, // Limits height to avoid overflow
  searchIcon: { marginRight: 8 },
  searchInput: { flex: 1, paddingHorizontal: 8 },
  detailsContainer: { padding: 20, alignItems: "center" },
  detailsText: { fontSize: 16, marginBottom: 10 },
  productImage: { width: 100, height: 100 },
  productName: { fontSize: 16, flex: 1 },
});

export default OrderDetailsPage;
