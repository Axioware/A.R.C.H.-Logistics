import { Tabs } from 'expo-router';
import CustomTabBar from '../../components/CustomTabBar';

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
      }}
      tabBar={(props) => <CustomTabBar {...props} />}
    >
      <Tabs.Screen name="dashboard" options={{ title: 'Home' }} />
      <Tabs.Screen name="placeholder1" options={{ title: 'Search' }} />
      <Tabs.Screen name="placeholder2" options={{ title: 'Settings' }} />
      <Tabs.Screen name="placeholder3" options={{ title: 'Profile' }} />
      <Tabs.Screen name="placeholder4" options={{ title: 'Profile' }} />
      
    </Tabs>
  );
}