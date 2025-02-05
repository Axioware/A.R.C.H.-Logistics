import React from "react";
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
import AntDesign from "@expo/vector-icons/AntDesign";

interface Product {
  id: number;
  name: string;
  image: string;
}

interface ProductListProps {
  title: string;
  searchPlaceholder?: string;
  products: Product[];
  searchQuery: string;
  setSearchQuery: (text: string) => void;
  loading: boolean;
  loadMore: () => void;
  isFetching: boolean;
}

const ProductListComponent: React.FC<ProductListProps> = ({
  title,
  searchPlaceholder = "Search product",
  products,
  searchQuery,
  setSearchQuery,
  loading,
  loadMore,
  isFetching,
}) => {
  return (
    <View style={styles.container}>
      {/* Card with Title, Search Bar, and Loading Indicator */}
      <View style={styles.card}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>
            {title} <Text style={styles.productCount}>({products.length})</Text>
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
            placeholder={searchPlaceholder}
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
            {/* Container for the image */}
            <View style={styles.imageContainer}>
              <Image
                source={
                  typeof item.image === "string" ? { uri: item.image } : item.image
                }
                style={styles.productImage}
                resizeMode="contain" // Ensures the image covers the container
              />
            </View>
            <Text style={styles.productName}>{item.name}</Text>
          </View>
        )}
        ListFooterComponent={() => (
          <TouchableOpacity
            style={styles.loadMoreButton}
            onPress={loadMore}
            disabled={isFetching}
          >
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
  searchIcon: { marginRight: 8 },
  searchInput: { flex: 1, paddingHorizontal: 8 },
  productItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
    backgroundColor: "white",
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  imageContainer: {
    width: 100,
    height: 75,
    borderRadius: 8,
    overflow: "hidden", // Ensures the image is clipped to the container
    marginRight: 10,
  },
  productImage: {
    width: "100%",
    height: "100%",
  },
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
