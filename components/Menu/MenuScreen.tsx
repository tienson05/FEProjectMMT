import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import Colors from '../../constants/Colors';
import WelcomeBanner from '../Home/WelcomeBanner';
import CategoryList from './CategoryList';

const generateSampleData = () => {
  const categories = [
    {
      id: '1',
      name: 'Cà Phê',
      dishes: Array.from({ length: 10 }).map((_, i) => ({
        id: `cf${i + 1}`,
        name: `Cà Phê Đặc Biệt ${i + 1}`,
        price: `${29 + i}000đ`,
        image: 'https://congcaphe.com/wp-content/uploads/2023/04/cfden-247x296.jpg',
      })),
    },
    {
      id: '2',
      name: 'Sinh Tố',
      dishes: Array.from({ length: 10 }).map((_, i) => ({
        id: `st${i + 1}`,
        name: `Sinh Tố Thơm Ngon ${i + 1}`,
        price: `${35 + i}000đ`,
        image: 'https://congcaphe.com/wp-content/uploads/2023/04/stbo-247x296.jpg',
      })),
    },
    {
      id: '3',
      name: 'Combo',
      dishes: Array.from({ length: 10 }).map((_, i) => ({
        id: `combo${i + 1}`,
        name: `Combo Tiết Kiệm ${i + 1}`,
        price: `${59 + i}000đ`,
        image: 'https://congcaphe.com/wp-content/uploads/2023/04/cfden-247x296.jpg',
      })),
    },
  ];
  return categories;
};

const MenuScreen = () => {
  const sampleData = generateSampleData();

  return (
    <ScrollView style={styles.container}>
      <WelcomeBanner   />

      {/* Tiêu đề Menu ở giữa dưới banner */}
      <View style={styles.menuTitleContainer}>
        <Text style={styles.menuTitle}>Menu</Text>
      </View>

      {/* Phần khuyến mãi đặt phía trên menu */}
      <View style={styles.promoContainer}>
        <Text style={styles.promoText}>- Giảm 10% cho đơn hàng trên 100k</Text>
        <Text style={styles.promoText}>- Mua 1 tặng 1 cho món sinh tố</Text>
        <Text style={styles.promoText}>- Tặng kèm bánh quy cho cà phê đặc biệt</Text>
      </View>

      {/* Danh sách menu theo danh mục */}
      <CategoryList categories={sampleData} />

    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.secondary,
  },
  menuTitleContainer: {
    alignItems: 'center',
    marginVertical: 16,
  },
  menuTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    color: Colors.primary,
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  promoContainer: {
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  promoText: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.dark,
    marginBottom: 10,
    fontStyle: 'italic',
  },
});

export default MenuScreen;
