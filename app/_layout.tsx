import { Stack } from 'expo-router';

export default function RootLayout() {
  return (
    <Stack>
      {/* Pages Without Tabs */}
      <Stack.Screen name="select_tenant" options={{ headerShown: false }} />
      <Stack.Screen name="login" options={{ headerShown: false }} />
      {/* <Stack.Screen name="forgot_password" options={{ headerShown: false }} />
      <Stack.Screen name="otp_verincation" options={{ headerShown: false }} />
      <Stack.Screen name="reset_password" options={{ headerShown: false }} />
      <Stack.Screen name="acc_change_password" options={{ headerShown: false }} />
      <Stack.Screen name="profile" options={{ headerShown: false }} />
      <Stack.Screen name="settings" options={{ headerShown: false }} /> */}

      {/* Tabs Layout */}
      <Stack.Screen name="tabs" options={{ headerShown: false }} />
    </Stack>
  );
}

// import { ThemeProvider, DarkTheme, DefaultTheme} from '@react-navigation/native';
// import * as SplashScreen from 'expo-splash-screen';
// import { Stack } from 'expo-router';
// import { StatusBar } from 'expo-status-bar';
// import { useEffect } from 'react';
// import { useColorScheme } from '@/hooks/useColorScheme';
// import { useFonts } from 'expo-font';

// SplashScreen.preventAutoHideAsync();

// export default function RootLayout() {
//   const colorScheme = useColorScheme();
//   const [fontsLoaded] = useFonts({
//     SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
//   });

//   useEffect(() => {
//     if (fontsLoaded) {
//       SplashScreen.hideAsync();
//     }
//   }, [fontsLoaded]);

//   if (!fontsLoaded) {
//     return null;
//   }

//   return (
//     <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
//       <Stack
//        initialRouteName="select_tenant"
//        screenOptions={{headerShown: false }}
//        >
//         <Stack.Screen name="select_tenant"/>
//         <Stack.Screen name="login"/>
//         <Stack.Screen name="forgot_password" />
//         <Stack.Screen name="otp_verification"/>
//         <Stack.Screen name="profile"/>
//         <Stack.Screen name="reset_password"/>
//         <Stack.Screen name="settings"/>
//         <Stack.Screen name="acc_change_password"/>
//         <Stack.Screen name="dashboard"/>
        
//       </Stack>
//       <StatusBar style="auto" />
//     </ThemeProvider>
//   );
// }
