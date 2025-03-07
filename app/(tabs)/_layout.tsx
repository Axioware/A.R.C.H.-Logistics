import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { AntDesign, MaterialCommunityIcons } from "@expo/vector-icons";
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Dimensions,
  ActivityIndicator,
} from "react-native";
// Import actual screens
import Dashboard from "../../app/(tabs)/dashboard";
import OrdersPage from "../../app/(tabs)/orders_page";
import Inventory from "../../app/(tabs)/inventory";
import Picking from "../../app/(tabs)/picking";
import Scan from "../../app/(tabs)/scan";

const Tab = createBottomTabNavigator();

export default function Layout() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          position: "absolute",
          bottom: 20,
          marginHorizontal: 20, // Instead of left & right
          height: 72,
          backgroundColor: "white",
          borderRadius: 16,
          width: "90%", // Ensure it takes up the right width
          alignSelf: "center", // Center it
          
          // Shadow for iOS
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 5 },
          shadowOpacity: 0.1,
          shadowRadius: 8,
        
          // Shadow for Android
          elevation: 5,
        },
              
      }}
    >
      {/* Dashboard */}
      <Tab.Screen
        name="Dashboard"
        component={Dashboard}
        options={{
          tabBarIcon: ({ focused }) => (
            <View style={{ alignItems: "center", paddingTop: 16, width: 50, alignSelf: "center"}}>
          <AntDesign
              name={focused ? "appstore1" : "appstore-o"}
              color={focused ? "#000" : "gray"}
              size={24}
            />
          <Text
            style={{
              color: focused ? "#000" : "gray",
              fontSize: 12,
              marginTop: 4,
              textAlign: "center",
            }}
          >
            Dashboard
          </Text>
        </View>
          ),
        }}
      />

      {/* Orders */}
      <Tab.Screen
        name="Orders"
        component={OrdersPage}
        options={{
          tabBarIcon: ({ focused }) => (
            <View style={{ alignItems: "center", paddingTop: 16, width: 50,}}>
          <MaterialCommunityIcons
              name={focused ? "package-variant-closed" : "package-variant"}
              color={focused ? "#000" : "gray"}
              size={24}
            />
          <Text
            style={{
              color: focused ? "#000" : "gray",
              fontSize: 12,
              marginTop: 4,
            }}
          >
            Orders
          </Text>
        </View>
          ),
        }}
      />

      {/* Scan */}
      <Tab.Screen
        name="Scan"
        component={Scan}
        options={{
          tabBarIcon: ({ focused }) => (
            <View style={{ alignItems: "center", justifyContent: "center", height: 56, width: 56, borderRadius: 999, backgroundColor: "#000"}}>
          <MaterialCommunityIcons
              name= "qrcode-scan"
              color= "white"
              size={27}
            />
        </View>
          ),
        }}
      />

      {/* Picking */}
      <Tab.Screen
        name="Picking"
        component={Picking}
        options={{
          tabBarIcon: ({ focused }) => (
            <View style={{ alignItems: "center", paddingTop: 16, width: 50,}}>
          <MaterialCommunityIcons
              name={focused ? "basket" : "basket-outline"}
              color={focused ? "#000" : "gray"}
              size={24}
            />
          <Text
            style={{
              color: focused ? "#000" : "gray",
              fontSize: 12,
              marginTop: 4,
            }}
          >
            Picking
          </Text>
        </View>
          ),
        }}
      />

      {/* Inventory */}
      <Tab.Screen
        name="Inventory"
        component={Inventory}
        options={{
          tabBarIcon: ({ focused }) => (
            <View style={{ alignItems: "center", paddingTop: 16, width: 50,}}>
          <MaterialCommunityIcons
              name={focused ? "tag-multiple" : "tag-outline"}
              color={focused ? "#000" : "gray"}
              size={24}
            />
          <Text
            style={{
              color: focused ? "#000" : "gray",
              fontSize: 12,
              marginTop: 4,
            }}
          >
            Inventory
          </Text>
        </View>
          ),
        }}
      />
    </Tab.Navigator>
  );
}
