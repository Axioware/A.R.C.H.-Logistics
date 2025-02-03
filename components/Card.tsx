import React from 'react';
import { View, Image, Text, StyleSheet, ViewStyle } from 'react-native';

interface CardProps {
  children: React.ReactNode;
  imageSource: any; // You can use a static image or dynamic source
}

const Card: React.FC<CardProps> = ({ children, imageSource }) => {
  return (
    <View style={styles.card}>
      <Image source={imageSource} style={styles.cardImage} />
      <View style={styles.cardContent}>
        {children}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    width: '100%',
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 20,
    alignItems: 'center', // Center the card content horizontally
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 5 },
    elevation: 2,
    justifyContent: 'flex-start', // Ensure content starts from the top
  },
  cardImage: {
    width: 250,
    height: 250,
    marginBottom: 20,
  },
  cardContent: {
    width: '100%',
    alignItems: 'center',  // Center child content horizontally
    justifyContent: 'center',  // Center child content vertically
    paddingBottom: 80, // Bottom margin between the content and the card
  }
});

export default Card;
