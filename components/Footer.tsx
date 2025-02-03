// app/components/Footer.tsx
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Footer = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.footer}>© A.R.C.H Labs 2025</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end', // Align footer at the bottom
    marginBottom: 10, // Add margin bottom
  },
  footer: {
    fontSize: 14,
    color: '#666',
  },
});

export default Footer;
