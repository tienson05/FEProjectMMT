import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import Colors from '../../constants/Colors';
import DishCard from './DishCard';
const CategoryList = ({ categories }: any) => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      {categories.map((category: any) => (
        <View key={category.id} style={styles.section}>
          <Text style={styles.title}>{category.name.toUpperCase()}</Text>
          <FlatList
            horizontal
            showsHorizontalScrollIndicator={false}
            data={category.products}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <DishCard
                dish={item}
                onPress={() => navigation.navigate('Order', { dish: item })}
              />
            )}
          />
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingBottom: 30,
  },
  section: {
    marginBottom: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    color: Colors.primary,
    marginBottom: 10,
    marginLeft: 10,
  },
});

export default CategoryList;
