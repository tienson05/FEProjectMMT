import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import Colors from '../../constants/Colors';

const DishCard = ({ dish }: any) => {
  return (
    <View style={styles.card}>
      <Image source={{ uri: dish.image }} style={styles.image} />
      <Text style={styles.name}>{dish.name}</Text>
      <Text style={styles.price}>{dish.price}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    width: 150,
    marginRight: 15,
    backgroundColor: Colors.white,
    borderRadius: 10,
    overflow: 'hidden',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: 150,
  },
  name: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.dark,
    marginTop: 8,
    textAlign: 'center',
  },
  price: {
    fontSize: 14,
    color: Colors.accent,
    marginBottom: 10,
  },
});

export default DishCard;
