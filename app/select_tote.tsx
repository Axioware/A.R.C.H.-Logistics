import React, { useState } from "react";
import {
  View,
  StyleSheet,
  SafeAreaView,
  Image,
  Dimensions,
  TouchableOpacity,
  Text,
  TextInput,
  FlatList,
} from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

// Get screen height for dynamic logo sizing
const screenHeight = Dimensions.get("window").height;
const logoHeight = screenHeight * 0.07;

const dummyTotes = Array.from({ length: 24 }, (_, i) => ({
    id: `TOTE-${i + 1}`,
    barcode: `TOTE-${i + 1}`,
  }));

const ProductsPage = () => {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTote, setSelectedTote] = useState<string | null>(null);

  const filteredTotes = dummyTotes.filter((tote) =>
    tote.id.toLowerCase().includes(searchQuery.toLowerCase())
  );

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

        {/* Card Section */}
        <View style={styles.card}>
          <View style={styles.cardTitleContainer}>
            <View style={styles.cardTitleBorder} />
            <Text style={styles.cardTitle}>
              Scan an empty tote or select one from list
            </Text>
          </View>
          {/* Search Bar */}
          <View style={styles.searchContainer}>
            <Ionicons
              name="search"
              size={24}
              color="black"
              style={styles.searchIcon}
            />
            <TextInput
              style={styles.searchInput}
              placeholder="Search Tote"
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
          </View>

          {/* Tote List */}
          <FlatList
            data={filteredTotes}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={[
                  styles.toteItem,
                  selectedTote === item.id && styles.selectedTote,
                ]}
                onPress={() => setSelectedTote(item.id)}
              >
                <View style={styles.radioCircle}>
                  {selectedTote === item.id && (
                    <View style={styles.radioSelected} />
                  )}
                </View>
                <View>
                  <Text style={styles.toteTitle}>{item.id}</Text>
                  <Text style={styles.toteSubtitle}>
                    Barcode: {item.barcode}
                  </Text>
                </View>
              </TouchableOpacity>
            )}
          />
        </View>
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

  // Card Styles
  card: {
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 16,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
    marginTop: 16,
    flex: 0.98, // Adjust this to control height (0.85 means 85% of available space)
  },
  cardTitle: {
    fontSize: 21,
    fontWeight: "bold",
    paddingVertical: 8,
    paddingLeft: 12,
    position: "relative",
  },
  cardTitleBorder: {
    position: "absolute",
    left: 0,
    height: 30, // Change this height to your desired value
    width: 3,
    backgroundColor: "black",
  },
  cardTitleContainer: {
    flexDirection: "row",
    alignItems: "center",
    position: "relative",
  },

  // Search Bar Styles
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f0f0f0",
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 12,
  },
  searchIcon: { marginRight: 8 },
  searchInput: { flex: 1, height: 60, fontSize: 17, },

  // Tote List Styles
  toteItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
    borderBottomWidth: 1,
    borderColor: "#ddd",
    marginBottom: 10,
  },
  selectedTote: {
    // borderColor: "black",
    // backgroundColor: "#f5f5f5",
  },
  radioCircle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "#ddd",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10,
  },
  radioSelected: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "#000",
  },
  toteTitle: { fontSize: 16, fontWeight: "bold", left: 8, },
  toteSubtitle: { fontSize: 14, color: "gray", fontWeight: "bold", left: 8,},
});

export default ProductsPage;
