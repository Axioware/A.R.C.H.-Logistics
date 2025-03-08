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
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Entypo, Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { useRouter } from 'expo-router';


const screenHeight = Dimensions.get("window").height;

const OrderDetailsPage = () => {
  const router = useRouter();
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
      const newProducts = Array.from({ length: 15 }, (_, i) => ({
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
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => router.back()}
          >
            <AntDesign name="arrowleft" size={24} color="black" />
          </TouchableOpacity>
          <Text style={styles.orderId}>{orderId}</Text>
          <View style={styles.sideContainer} />
        </View>

        {/* Segmented Control */}
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

        {/* Product List or Order Details */}
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

            {/* Scrollable Product List */}
            <View style={styles.productListContainer}>
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
                    <View style={styles.productInfo}>
                      <Text style={styles.productId}>A-{item.id}</Text>
                      <Text
                        style={styles.productName}
                        numberOfLines={1}
                        ellipsizeMode="tail"
                      >
                        {item.name}
                      </Text>
                      <Text style={styles.productQuantity}>
                        Quantity: {Math.floor(Math.random() * 10) + 1}
                      </Text>
                    </View>
                  </View>
                )}
                showsVerticalScrollIndicator={false}
              />
            </View>
          </View>
        ) : (
          <View style={styles.detailsCard}>
            <View style={styles.detailItem}>
              <Ionicons name="calendar-number" size={22} color="black" style={styles.detailIcon} />
              <Text style={styles.detailLabel}>Required Ship Date:</Text>
              <Text style={styles.detailValue}>March 15, 2025</Text>
            </View>
            <View style={styles.detailItem}>
              <Entypo name="location-pin" size={22} color="black" style={styles.detailIcon} />
              <Text style={styles.detailLabel}>Ship To:</Text>
              <Text style={styles.detailValue}>456 Elm Street, NY, USA</Text>
            </View>
            <View style={styles.detailItem}>
              <FontAwesome name="phone" size={22} color="black" style={styles.detailIcon} />
              <Text style={styles.detailLabel}>Telephone Number:</Text>
              <Text style={styles.detailValue}>+1 987-654-3210</Text>
            </View>
            <View style={styles.detailItem}>
              <MaterialCommunityIcons name="email" size={22} color="black" style={styles.detailIcon} />
              <Text style={styles.detailLabel}>Email:</Text>
              <Text style={styles.detailValue}>customer@example.com</Text>
            </View>
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
    flex: 1,
    padding: 16,
    backgroundColor: "white",
    borderRadius: 8,
    marginBottom: 15,
    elevation: 3,
    width: "92%",
    alignSelf: "center",
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
    marginBottom: 10,
  },
  productListContainer: {
    flex: 0.98, // Ensures list takes up available space
  },
  productItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
    backgroundColor: "white",
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  searchIcon: { marginRight: 8 },
  searchInput: { flex: 1, paddingHorizontal: 8 },
  detailsContainer: { padding: 20, alignItems: "center" },
  detailsText: { fontSize: 16, marginBottom: 10 },
  productImage: { width: 100, height: 85 },
  productName: {
    fontSize: 20,
    fontWeight: "900",
  },

  productInfo: {
    flex: 1,
    marginLeft: 10,
  },
  productId: {
    fontSize: 15,
    color: "#888",
    marginBottom: 5,
    fontWeight: "bold",
  },
 
  productQuantity: {
    fontSize: 15,
    color: "#444",
    marginTop: 5,
    fontWeight: "bold",
  },

  detailsCard: {
    backgroundColor: "white",
    padding: 16,
    borderRadius: 8,
    elevation: 3,
    width: "92%",
    alignSelf: "center",
    marginTop: 15,
  },
  
  detailItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  
  detailIcon: {
    marginRight: 10,
  },
  
  detailLabel: {
    fontSize: 16,
    color: "#666",
    fontWeight: "bold",
    flex: 1,
  },
  
  detailValue: {
    fontSize: 16,
    fontWeight: "bold",
    color: "black",
  },
  
});

export default OrderDetailsPage;
