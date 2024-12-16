// app/components/Card.tsx
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
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    width: '110%',
    height: '83%',
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 5 },
    elevation: 2,
  },
  cardImage: {
    width: 250,
    height: 250,
    marginBottom: 20,
  },
});

export default Card;
