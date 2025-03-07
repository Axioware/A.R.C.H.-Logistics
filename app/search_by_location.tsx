import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
  StyleSheet,
  Image,
  SafeAreaView,
  Dimensions,
} from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";
import { useRouter } from "expo-router";

// Get screen height for dynamic logo sizing
const screenHeight = Dimensions.get("window").height;
const logoHeight = screenHeight * 0.07;

const SearchByLocationScreen: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(false);
  const router = useRouter();

  // Generate random locations
  const generateRandomLocations = (count: number) => {
    return Array.from({ length: count }, (_, i) => ({
      id: i + 1,
      name: `PR-${Math.floor(Math.random() * 100)}C`,
      barcode: `${Math.floor(10000000 + Math.random() * 90000000)}`,
    }));
  };

  const [locations, setLocations] = useState(generateRandomLocations(20));

  const loadMore = () => {
    if (isFetching) return;
    setIsFetching(true);

    // Simulate loading
    setTimeout(() => {
      setLocations((prev) => [...prev, ...generateRandomLocations(5)]);
      setIsFetching(false);
    }, 1500);
  };

  const onPressLocation = (location: any) => {
    console.log("Selected Location:", location);
  };

  return (
    <SafeAreaView style={styles.safeAreaContainer}>
      <View style={styles.container}>
        {/* Back Button & Logo Container */}
        <View style={styles.header}>
          <View style={styles.sideContainer}>
            <TouchableOpacity
              style={styles.backButton}
              onPress={() => router.back()}
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

        <View style={styles.card}>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>
              Locations <Text style={styles.locationCount}>({locations.length})</Text>
            </Text>
          </View>
          <View style={styles.searchBar}>
            <AntDesign name="search1" size={18} color="black" style={styles.searchIcon} />
            <TextInput
              style={styles.searchInput}
              placeholder="Search location"
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
            {loading && <ActivityIndicator size="small" color="#007BFF" />}
          </View>
        </View>

        <FlatList
          data={locations}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => onPressLocation(item)}>
              <View style={styles.locationItem}>
                <View style={styles.textContainer}>
                  <Text style={styles.locationName}>{item.name}</Text>
                  <Text style={styles.barcode}>Barcode: {item.barcode}</Text>
                </View>
              </View>
            </TouchableOpacity>
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
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeAreaContainer: { flex: 1, backgroundColor: "#fff" },
  container: { flex: 1, paddingTop: 0, paddingHorizontal: 16 },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 8,
    marginTop: 10,
  },
  sideContainer: { width: 40, alignItems: "center" },
  backButton: { padding: 8 },
  logoContainer: { flex: 1, alignItems: "center" },
  logo: { width: "50%", height: 50 },
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
  title: {
    fontSize: 18,
    fontWeight: "bold",
    borderLeftWidth: 3,
    borderLeftColor: "black",
    paddingLeft: 8,
  },
  locationCount: { fontSize: 16, color: "gray" },
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
  locationItem: {
    padding: 12,
    backgroundColor: "white",
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  textContainer: { flex: 1 },
  locationName: { fontSize: 16, fontWeight: "bold" },
  barcode: { fontSize: 14, color: "gray" },
  loadMoreButton: {
    padding: 12,
    backgroundColor: "#000",
    borderRadius: 8,
    alignItems: "center",
    marginVertical: 12,
  },
  loadMoreText: { color: "white", fontSize: 16, fontWeight: "bold" },
});

export default SearchByLocationScreen;
