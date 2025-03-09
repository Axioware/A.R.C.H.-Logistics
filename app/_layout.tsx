import { Stack } from 'expo-router';

export default function RootLayout() {
  return (
    <Stack initialRouteName="select_tenant" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="(tabs)" />
      <Stack.Screen name="acc_info" />
      <Stack.Screen name="acc_change_pass" />
      <Stack.Screen name="edit_product" />
      <Stack.Screen name="forgot_password" />
      <Stack.Screen name="inventory_count" />
      <Stack.Screen name="inventory" />
      <Stack.Screen name="login" />
      <Stack.Screen name="multi_item" />
      <Stack.Screen name="order_details" />
      <Stack.Screen name="orders_page" />
      <Stack.Screen name="otp_verification" />
      <Stack.Screen name="picked" />
      <Stack.Screen name="product_list" />
      <Stack.Screen name="profile" />
      <Stack.Screen name="reset_password" />
      <Stack.Screen name="select_tenant" />
      <Stack.Screen name="settings" />
      <Stack.Screen name="single_order" />
      <Stack.Screen name="select_tote" />
      <Stack.Screen name="count_product" />
      <Stack.Screen name="search_by_location" />
    </Stack>
  );
}
