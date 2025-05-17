import React from 'react';
import { Dimensions, Image, StyleSheet, Text, View } from 'react-native';
import Colors from '../../constants/Colors';

const screenWidth = Dimensions.get('window').width;
const cardWidth = screenWidth / 3 - 20; // trừ padding/margin cho vừa 3 ảnh

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
    width: cardWidth,
    marginRight: 20,
    backgroundColor: Colors.white,
    borderRadius: 10,
    overflow: 'hidden',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: cardWidth, // hình vuông cho đều đẹp
    resizeMode: 'cover', // giữ bố cục ảnh ổn
  },
  name: {
    fontSize: 13,
    fontWeight: '600',
    color: Colors.dark,
    marginTop: 6,
    textAlign: 'center',
  },
  price: {
    fontSize: 12,
    color: Colors.accent,
    marginBottom: 8,
  },
});

export default DishCard;
