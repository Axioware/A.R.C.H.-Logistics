import { Tabs } from 'expo-router';
import { Text } from 'react-native';

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarStyle: {
          backgroundColor: 'black', // Black background
          height: 60, // Optional: Adjust height if needed
        },
        tabBarActiveTintColor: 'white',   // Active tab color
        tabBarInactiveTintColor: 'gray', // Inactive tab color
      }}
    >
      {/* Home Tab */}
      <Tabs.Screen
        name="dashboard"
        options={{
          title: 'Home',
          tabBarIcon: () => <Text style={{ color: 'white' }}>🏠</Text>, // White icon
        }}
      />

      {/* Placeholder1 Tab */}
      <Tabs.Screen
        name="placeholder1"
        options={{
          title: 'Option 1',
          tabBarIcon: () => <Text style={{ color: 'white' }}>🔧</Text>, // White icon
        }}
      />
    </Tabs>
  );
}
