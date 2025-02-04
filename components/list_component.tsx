import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
  Image,
  StyleSheet,
} from "react-native";
import AntDesign from '@expo/vector-icons/AntDesign';

interface ProductListProps {
  title: string;
}

const ProductListComponent: React.FC<ProductListProps> = ({ title }) => {
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

  const fetchProducts = (pageNum: number) => {
    if (isFetching) return;
    setIsFetching(true);
    setLoading(pageNum === 1);

    setTimeout(() => {
      const newProducts = Array.from({ length: 10 }, (_, i) => ({
        id: (pageNum - 1) * 10 + i + 1,
        name: `Product ${(pageNum - 1) * 10 + i + 1}`,
        image: "https://via.placeholder.com/100",
      }));
      setProducts((prev) => [...prev, ...newProducts]);
      setIsFetching(false);
      setLoading(false);
    }, 1500);
  };

  const loadMore = () => {
    if (!isFetching) setPage((prev) => prev + 1);
  };

  return (
    <View style={styles.container}>
      {/* Card with Title, Product Count, Search Bar, and Loading Spinner */}
      <View style={styles.card}>
        <View style={styles.titleContainer}>
          <Text style={styles.titleBar}></Text>
          <Text style={styles.title}>
            {title} <Text style={styles.productCount}>({products.length})</Text>
          </Text>
        </View>
        <View style={styles.searchBar}>
          <AntDesign name="search1" size={18} color="black" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search product"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          {loading && <ActivityIndicator size="small" color="#007BFF" />}
        </View>
      </View>

      <FlatList
        data={products}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.productItem}>
            <Image source={{ uri: item.image }} style={styles.productImage} />
            <Text style={styles.productName}>{item.name}</Text>
          </View>
        )}
        ListFooterComponent={() => (
          <TouchableOpacity style={styles.loadMoreButton} onPress={loadMore}>
            <Text style={styles.loadMoreText}>
              {isFetching ? "Loading..." : "Load More"}
            </Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: "#fff" },
  card: {
    padding: 16,
    backgroundColor: "white",
    borderRadius: 8,
    marginBottom: 8,
    elevation: 3,
  },
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  titleBar: {
    fontSize: 20,
    color: "black",
    marginRight: 8,
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
  searchIcon: {
    marginRight: 8,
  },
  searchInput: { flex: 1, paddingHorizontal: 8 },
  productItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
    backgroundColor: "white",
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  productImage: { width: 50, height: 50, borderRadius: 8, marginRight: 10 },
  productName: { fontSize: 16, flex: 1 },
  loadMoreButton: {
    padding: 12,
    backgroundColor: "#000",
    borderRadius: 8,
    alignItems: "center",
    marginVertical: 12,
  },
  loadMoreText: { color: "white", fontSize: 16, fontWeight: "bold" },
});

export default ProductListComponent;
