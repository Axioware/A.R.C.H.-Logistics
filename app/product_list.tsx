import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  SafeAreaView,
  Image,
  Dimensions,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import ProductListComponent from "../components/list_component";
import { useNavigation } from "@react-navigation/native";
import AntDesign from "@expo/vector-icons/AntDesign";

// Get screen height for dynamic logo sizing
const screenHeight = Dimensions.get("window").height;
const logoHeight = screenHeight * 0.07;

const ProductsPage = () => {
  const navigation = useNavigation();
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState<
    { id: number; name: string; image: string }[]
  >([]);
  const [page, setPage] = useState(1);
  const [isFetching, setIsFetching] = useState(false);

  useEffect(() => {
    fetchProducts(page);
  }, [page]);

  const defaultImage = require("../assets/default.png");

  const fetchProducts = (pageNum: number) => {
    if (isFetching) return;
    setIsFetching(true);
    setLoading(pageNum === 1);

    setTimeout(() => {
      const newProducts = Array.from({ length: 10 }, (_, i) => ({
        id: (pageNum - 1) * 10 + i + 1,
        name: `Product ${(pageNum - 1) * 10 + i + 1}`,
        image: Math.random() > 0.5 ? `https://via.placeholder.com/100` : null, // Simulating missing images
      }));

      // Ensure each product has a valid image
      const updatedProducts = newProducts.map((product) => ({
        ...product,
        image: product.image ? { uri: product.image } : defaultImage, // If image is missing, use default
      }));

      setProducts((prev) => [...prev, ...updatedProducts]);
      setIsFetching(false);
      setLoading(false);
    }, 1500);
  };

  const loadMore = () => {
    if (!isFetching) setPage((prev) => prev + 1);
  };

  return (
    <SafeAreaView style={styles.safeAreaContainer}>
      <View style={styles.container}>
        {/* Back Button & Logo Container */}
        <View style={styles.header}>
          <View style={styles.sideContainer}>
            <TouchableOpacity
              style={styles.backButton}
              onPress={() => navigation.goBack()}
            >
              <AntDesign name="arrowleft" size={24} color="black" />
            </TouchableOpacity>
          </View>

          <View style={styles.logoContainer}>
            <Image
              source={require("../assets/logo.png")}
              style={[styles.logo, { height: logoHeight }]}
              resizeMode="contain"
            />
          </View>

          <View style={styles.sideContainer} />
        </View>

        {/* Pass Product Data as Props */}
        <ProductListComponent
          title="Products"
          searchPlaceholder="Find a product..."
          products={products}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          loading={loading}
          loadMore={loadMore}
          isFetching={isFetching}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeAreaContainer: { flex: 1, backgroundColor: "#fff" },
  container: { flex: 1, paddingTop: 0 },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    marginBottom: 8,
  },
  sideContainer: { width: 40, alignItems: "center" },
  backButton: { padding: 8 },
  logoContainer: { flex: 1, alignItems: "center" },
  logo: { width: "50%", height: 50 },
});

export default ProductsPage;
