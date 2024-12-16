// app/components/Footer.tsx
import React from 'react';
import { Text, StyleSheet } from 'react-native';

const Footer = () => {
  return <Text style={styles.footer}>© A.R.C.H Labs 2024</Text>;
};

const styles = StyleSheet.create({
  footer: {
    fontSize: 14,
    color: '#666',
    marginBottom: 10,
  },
});

export default Footer;
