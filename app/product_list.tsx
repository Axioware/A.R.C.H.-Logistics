import React from 'react';
import { View, StyleSheet, SafeAreaView, Image, Dimensions } from 'react-native';
import ProductListComponent from '../components/list_component';


// Get screen height for dynamic logo sizing
const screenHeight = Dimensions.get("window").height;
const logoHeight = screenHeight * 0.07;

const ProductsPage = () => {
  return (
    <SafeAreaView style={styles.safeAreaContainer}>
      <View style={styles.container}>
        {/* Logo */}
        <Image
            source={require('../assets/logo.png')}
            style={[styles.logo, { height: logoHeight }]}
            resizeMode="contain"
        />
        <ProductListComponent title="Products" />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeAreaContainer: {
    flex: 1,
    backgroundColor: '#fff',
  },
  container: {
    flex: 1,
    justifyContent: 'flex-start', // Ensure content starts from the top
    // alignItems: 'center', // Center everything horizontally
    // paddingHorizontal: 20,
    paddingTop: 0, // Adjust top padding if needed
  },
  logo: {
    width: '60%', // Adjust the width of the logo
    alignSelf: 'center', // Center the logo horizontally
    marginBottom: 0, // Space between logo and content
  },
});

export default ProductsPage;