import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TextInput,
  FlatList,
  Image,
  TouchableOpacity,
  Dimensions,
  ActivityIndicator,
} from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";
import { useNavigation } from "@react-navigation/native";

const defaultImage = require("../../assets/default.png");
const logo = require("../../assets/logo.png");

const screenHeight = Dimensions.get("window").height;
const logoHeight = screenHeight * 0.07;

const OrdersPage = () => {
  const navigation = useNavigation();
  const [searchQuery, setSearchQuery] = useState("");
  const [orders, setOrders] = useState<
    {
      id: string;
      products: { image: string | null }[];
      quantity: number;
      date: string;
    }[]
  >([]);
  const [loading, setLoading] = useState(true);

  // Simulated API Call
  const fetchOrders = async () => {
    setLoading(true);
    try {
      setTimeout(() => {
        const dummyOrders = [
          {
            id: "#1034",
            products: [
              { image: null },
              { image: null },
              { image: null },
              { image: null },
            ],
            quantity: 3,
            date: "2024-02-24",
          },
          {
            id: "#1035",
            products: [
              { image: "https://via.placeholder.com/200" },
              { image: null },
            ],
            quantity: 2,
            date: "2024-02-23",
          },
          {
            id: "#1055",
            products: [
              { image: "https://via.placeholder.com/200" },
              { image: null },
            ],
            quantity: 2,
            date: "2025-02-23",
          },
          {
            id: "#1075",
            products: [
              { image: "https://via.placeholder.com/200" },
              { image: null },
            ],
            quantity: 2,
            date: "2029-02-23",
          },
          {
            id: "#1044",
            products: [
              { image: null },
              { image: null },
              { image: null },
              { image: null },
            ],
            quantity: 4,
            date: "2027-02-24",
          },
        ];
        setOrders(dummyOrders);
        setLoading(false);
      }, 2000);
    } catch (error) {
      console.error("Error fetching orders:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const filteredOrders = orders.filter((order) =>
    order.id.includes(searchQuery)
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <View style={styles.sideContainer}>
          <TouchableOpacity style={styles.backButton}>
            <AntDesign name="arrowleft" size={24} color="black" />
          </TouchableOpacity>
        </View>

        <View style={styles.logoContainer}>
          <Image
            source={logo}
            style={[styles.logo, { height: logoHeight }]}
            resizeMode="contain"
          />
        </View>

        <View style={styles.sideContainer} />
      </View>

      <View style={styles.content}>
        <View style={styles.searchWrapper}>
          <Text style={styles.title}>Orders</Text>
          <View style={styles.searchContainer}>
            <AntDesign
              name="search1"
              size={20}
              color="gray"
              style={styles.searchIcon}
            />
            <TextInput
              style={styles.searchInput}
              placeholder="Search orders..."
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
          </View>
        </View>

        {loading ? (
          <ActivityIndicator
            size="large"
            color="#000"
            style={{ marginTop: 20 }}
          />
        ) : (
          <FlatList
  data={filteredOrders}
  keyExtractor={(item) => item.id}
  renderItem={({ item }) => (
    <View style={styles.orderCard}>
      <TouchableOpacity
        activeOpacity={0.5}
        // onPress={() => navigation.navigate("OrderDetails", { orderId: item.id })}
      >
        <View style={styles.orderHeader}>
          <View style={styles.orderIdBox}>
            <Text style={styles.orderId}>{item.id}</Text>
          </View>
          <Text style={styles.quantity}>
            {item.quantity} ITEM{item.quantity > 1 ? "S" : ""} | {item.date}
          </Text>
        </View>
      </TouchableOpacity>

      {/* Horizontal Scrollable Product Images */}
      <FlatList
        data={item.products}
        horizontal
        keyExtractor={(_, index) => index.toString()}
        showsHorizontalScrollIndicator={false}
        scrollEnabled={true}
        renderItem={({ item }) => (
          <Image
            source={item.image ? { uri: item.image } : defaultImage}
            style={styles.orderImage}
          />
        )}
      />
    </View>
  )}
/>

        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: "#f8f9fa" },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    marginBottom: 8,
    marginTop: 10,
  },
  sideContainer: { width: 40, alignItems: "center" },
  backButton: { padding: 8 },
  logoContainer: { flex: 1, alignItems: "center" },
  logo: { width: "50%", height: 50 },
  content: { flex: 1 },

  searchWrapper: {
    width: "90%",
    alignSelf: "center",
    marginBottom: 16,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 20,
    borderLeftWidth: 3,
    borderLeftColor: "black",
    paddingLeft: 8,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    elevation: 4,
    borderWidth: 0.1,
    borderColor: "#ccc",
    width: "100%",
  },
  searchIcon: { marginRight: 8 },
  searchInput: { flex: 1 },

  orderCard: {
    marginTop: 5,
    backgroundColor: "#fff",
    padding: 17,
    borderRadius: 8,
    marginBottom: 12,
    elevation: 6,
    width: "90%",
    borderWidth: 0.1,
    borderColor: "#ccc",
    alignSelf: "center",
  },
  orderIdBox: {
    backgroundColor: "#E9ECEF",
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 5,
  },
  orderHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  orderId: { fontSize: 16, color: "#000", fontWeight: "bold" },
  quantity: {
    fontSize: 14,
    fontWeight: "700",
    color: "#bdbdbd",
  },
  orderImage: {
    width: 100,
    height: 100,
    borderRadius: 8,
    marginRight: 10,
  },
});

export default OrdersPage;
