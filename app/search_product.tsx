import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  FlatList,
  ActivityIndicator,
  RefreshControl,
  Image,
} from "react-native";

// Define the product type
interface Product {
  id: string;
  name: string;
  price: string;
  imageUrl: string;
}

// Dummy product list (20 products for demonstration)
const dummyProducts: Product[] = Array.from({ length: 20 }, (_, i) => {
  const id = (i + 1).toString();
  return {
    id,
    name: `Product ${id}`,
    price: `$${(10 + i * 5).toFixed(2)}`,
    imageUrl: "https://via.placeholder.com/100",
  };
});

const ProductsPage: React.FC = () => {
  // State variables for products, loading, refresh, pagination, and search text
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [searchText, setSearchText] = useState("");

  // Set pageSize to 10 to display 10 items initially
  const pageSize = 10;

  // Simulate fetching products from a backend
  const fetchProducts = async (pageNumber: number, refresh = false) => {
    if (refresh) {
      setRefreshing(true);
    } else {
      setIsLoading(true);
    }
    try {
      // Simulate network delay
      await new Promise((resolve) => setTimeout(resolve, 1500));
      const start = (pageNumber - 1) * pageSize;
      const end = start + pageSize;
      const newProducts = dummyProducts.slice(start, end);
      if (refresh) {
        setProducts(newProducts);
        setPage(2);
      } else {
        setProducts((prev) => [...prev, ...newProducts]);
        setPage(pageNumber + 1);
      }
      if (end >= dummyProducts.length) {
        setHasMore(false);
      } else {
        setHasMore(true);
      }
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setIsLoading(false);
      setRefreshing(false);
    }
  };

  // Initial load
  useEffect(() => {
    fetchProducts(1);
  }, []);

  // Handler for pull-to-refresh
  const handleRefresh = () => {
    setHasMore(true);
    fetchProducts(1, true);
  };

  // Handler for loading more items
  const handleLoadMore = () => {
    if (hasMore && !isLoading) {
      fetchProducts(page);
    }
  };

  // Render a single product item
  const renderProductItem = ({ item }: { item: Product }) => {
    return (
      <View style={styles.productItem}>
        <Image source={{ uri: item.imageUrl }} style={styles.productImage} />
        <View style={styles.productDetails}>
          <Text style={styles.productName}>{item.name}</Text>
          <Text style={styles.productPrice}>{item.price}</Text>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {/* Back Button */}
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => console.log("Back pressed")}
      >
        <Text style={styles.backButtonText}>{"< Back"}</Text>
      </TouchableOpacity>

      {/* Main Products Card */}
      <View style={styles.card}>
        {/* Header with Title and Item Count Badge */}
        <View style={styles.header}>
          <Text style={styles.cardTitle}>Products</Text>
          <View style={styles.itemCountContainer}>
            <Text style={styles.itemCountText}>{products.length}</Text>
          </View>
        </View>

        {/* Search Bar */}
        <TextInput
          style={styles.searchBar}
          placeholder="Search Products..."
          value={searchText}
          onChangeText={setSearchText}
        />

        {/* List Card */}
        <View style={styles.listCard}>
          {isLoading && products.length === 0 ? (
            // Loading view inside its own card
            <View style={styles.loadingContainer}>
              <ActivityIndicator size="large" color="#333" />
              <Text style={styles.loadingText}>Loading...</Text>
            </View>
          ) : (
            // Display the list of products
            <FlatList
              data={products}
              renderItem={renderProductItem}
              keyExtractor={(item, index) => `${item.id}-${index}`}
              refreshControl={
                <RefreshControl
                  refreshing={refreshing}
                  onRefresh={handleRefresh}
                />
              }
              ListFooterComponent={
                hasMore ? (
                  <TouchableOpacity
                    style={styles.loadMoreButton}
                    onPress={handleLoadMore}
                  >
                    <Text style={styles.loadMoreText}>Load More</Text>
                  </TouchableOpacity>
                ) : (
                  <Text style={styles.endText}>No more products</Text>
                )
              }
            />
          )}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f9f9f9",
    padding: 16,
  },
  backButton: {
    marginBottom: 16,
  },
  backButtonText: {
    fontSize: 16,
    color: "#333",
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
  },
  itemCountContainer: {
    backgroundColor: "#e0e0e0",
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 4,
    marginLeft: 8,
  },
  itemCountText: {
    fontSize: 14,
    color: "#333",
  },
  searchBar: {
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 16,
  },
  listCard: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  loadingContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 20,
  },
  loadingText: {
    marginLeft: 10,
    fontSize: 16,
    color: "#333",
  },
  productItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  productImage: {
    width: 60,
    height: 60,
    borderRadius: 8,
    marginRight: 12,
  },
  productDetails: {
    flex: 1,
  },
  productName: {
    fontSize: 16,
    fontWeight: "500",
    color: "#333",
  },
  productPrice: {
    fontSize: 14,
    color: "#666",
    marginTop: 4,
  },
  loadMoreButton: {
    padding: 12,
    alignItems: "center",
    backgroundColor: "#f0f0f0",
    borderRadius: 8,
    marginVertical: 12,
    marginHorizontal: 50,
  },
  loadMoreText: {
    color: "#333",
    fontSize: 16,
  },
  endText: {
    textAlign: "center",
    padding: 12,
    color: "#666",
  },
});

export default ProductsPage;