import { Tabs } from 'expo-router';

export default function TabLayout() {
  return (
    <Tabs>
      <Tabs.Screen
        name="dashboard" // Adjust the route name to match your file name without extension.
        options={{ title: "Home" }}
      />
      <Tabs.Screen
        name="placeholder1" // Adjust the route name to match your file name without extension.
        options={{ title: "Products" }}
      />
      <Tabs.Screen
        name="placeholder2"    // This screen should be inside app/(tabs) if it needs the bottom nav.
        options={{ title: "Inventory" }}
      />
      <Tabs.Screen
        name="settings"     // Adjust as needed.
        options={{ title: "placeholder3" }}
      />
      {/* Add more screens as necessary */}
    </Tabs>
  );
}