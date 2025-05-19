import API_URL from '@/config';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, ScrollView, StyleSheet, Text, View } from 'react-native';
import Colors from '../../constants/Colors';
import WelcomeBanner from '../Home/WelcomeBanner';
import CategoryList from './CategoryList';

const MenuScreen = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true); // loading state
  const [error, setError] = useState<string | null>(null);     // error state

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${API_URL}/api/category`);
        if (!response.ok) {
          throw new Error('Lỗi khi lấy dữ liệu từ server');
        }
        const data = await response.json();
        setCategories(data); // data là mảng category có chứa các món
      } catch (err) {
        if (err instanceof Error) {
          console.error('Lỗi:', err.message);
          setError(err.message || 'Lỗi không xác định');
        } else {
          console.error('Lỗi không xác định:', err);
        }

      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <ScrollView style={styles.container}>
      <WelcomeBanner />

      <View style={styles.menuTitleContainer}>
        <Text style={styles.menuTitle}>Menu</Text>
      </View>

      <View style={styles.promoContainer}>
        <Text style={styles.promoText}>- Giảm 10% cho đơn hàng trên 100k</Text>
        <Text style={styles.promoText}>- Mua 1 tặng 1 cho món sinh tố</Text>
        <Text style={styles.promoText}>- Tặng kèm bánh quy cho cà phê đặc biệt</Text>
      </View>

      {/* Hiển thị trạng thái loading, error hoặc danh mục */}
      {loading ? (
        <ActivityIndicator size="large" color={Colors.primary} />
      ) : error ? (
        <Text style={{ color: 'red', textAlign: 'center' }}>{error}</Text>
      ) : (
        <CategoryList categories={categories} />
      )}
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
