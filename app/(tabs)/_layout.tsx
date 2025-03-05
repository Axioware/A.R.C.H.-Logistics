import React from "react";
import { View, StyleSheet } from "react-native";
import { createMaterialBottomTabNavigator } from "react-native-paper/react-navigation";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { FAB } from "react-native-paper";
import Dashboard from "../../app/(tabs)/dashboard";
import Inventory from "../../app/(tabs)/inventory";
import OrdersPage from "../../app/(tabs)/orders_page";
import Picking from "../../app/(tabs)/picking"; // New screen

const Tab = createMaterialBottomTabNavigator();

export default function TabLayout() {
  return (
    <View style={styles.container}>
      <Tab.Navigator
        initialRouteName="Dashboard"
        shifting={false} // Keeps the bar simple
        sceneAnimationEnabled={false} // Smooth transitions
        barStyle={styles.bottomBar} // Floating black navigation bar
        activeColor="#fff" // White icon color when active
        inactiveColor="#666" // Gray icon when inactive
      >
        <Tab.Screen
          name="Dashboard"
          component={Dashboard}
          options={{
            tabBarLabel: "Home",
            tabBarIcon: ({ color }: { color: string }) => (
              <MaterialCommunityIcons name="home-outline" color={color} size={26} />
            ),
          }}
        />
        <Tab.Screen
          name="Inventory"
          component={Inventory}
          options={{
            tabBarLabel: "Products",
            tabBarIcon: ({ color }: { color: string }) => (
              <MaterialCommunityIcons name="package-variant" color={color} size={26} />
            ),
          }}
        />
        <Tab.Screen
          name="Orders"
          component={OrdersPage}
          options={{
            tabBarLabel: "Orders",
            tabBarIcon: ({ color }: { color: string }) => (
              <MaterialCommunityIcons name="clipboard-list-outline" color={color} size={26} />
            ),
          }}
        />
        <Tab.Screen
          name="Picking"
          component={Picking}
          options={{
            tabBarLabel: "Picking",
            tabBarIcon: ({ color }: { color: string }) => (
              <MaterialCommunityIcons name="account-circle-outline" color={color} size={26} />
            ),
          }}
        />
      </Tab.Navigator>

      {/* Floating Action Button */}
      {/* <View style={styles.fabContainer}>
        <FAB icon="qrcode-scan" style={styles.fab} color="#fff" onPress={() => console.log("FAB Pressed")} />
      </View> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000", // Full black background
  },
  bottomBar: {
    backgroundColor: "#000", // Black bottom bar
    position: "absolute",
    left: 16,
    right: 16,
    bottom: 15,
    borderRadius: 16,
    height: 72,
    borderTopWidth: 0,
    elevation: 10,
    shadowColor: "#fff", // White shadow for slight effect
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    overflow: "hidden",
    zIndex: 1,
    justifyContent: "center",
    marginHorizontal: -5,
  },
  fabContainer: {
    position: "absolute",
    bottom: 50,
    alignSelf: "center",
    zIndex: 2,
  },
  fab: {
    backgroundColor: "#000", // Black FAB
    width: 65,
    height: 65,
    borderRadius: 35,
    justifyContent: "center",
    alignItems: "center",
    elevation: 10,
    shadowColor: "#fff", // White subtle shadow
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
  },
});
