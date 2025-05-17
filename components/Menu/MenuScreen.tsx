import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import Colors from '../../constants/Colors';
import InfoSection from '../Home/InfoSection'; // import InfoSection
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
      <WelcomeBanner
        title="MENU"
        imageUri="https://congcaphe.com/wp-content/uploads/2023/04/BANNER-MENU_WEB.jpg"
      />

      {/* Tiêu đề Menu ở giữa dưới banner */}
      <View style={styles.menuTitleContainer}>
        <Text style={styles.menuTitle}>Menu</Text>
      </View>

      {/* Nội dung 2 cột */}
      <View style={styles.contentRow}>
        {/* 1/3 phần text bên trái */}
        <View style={styles.introSection}>
          <Text style={styles.promoText}>- Giảm 10% cho đơn hàng trên 100k</Text>
          <Text style={styles.promoText}>- Mua 1 tặng 1 cho món sinh tố</Text>
          <Text style={styles.promoText}>- Tặng kèm bánh quy cho cà phê đặc biệt</Text>
        </View>

        {/* Đường kẻ dọc phân cách */}
        <View style={styles.separator} />

        {/* 2/3 phần menu bên phải */}
        <View style={styles.menuSection}>
          <CategoryList categories={sampleData} />
        </View>
      </View>
            <InfoSection />
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
    color: Colors.primary, // bạn có thể chỉnh màu
    textShadowColor: 'rgba(0, 0, 0, 0.3)', // tạo bóng chữ
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  contentRow: {
    flexDirection: 'row',
    paddingHorizontal: 10,
  },
  introSection: {
    flex: 1,
    paddingRight: 10,
    justifyContent: 'flex-start',
  },
  separator: {
    width: 1,
    backgroundColor: Colors.dark,
    marginHorizontal: 10,
  },
  menuSection: {
    flex: 2,
  },
  promoText: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.dark,
    marginBottom: 10,
    fontStyle: 'italic', // chữ nghiêng nhẹ cho đẹp
  },
});

export default MenuScreen;
