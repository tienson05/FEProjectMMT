import API_URL from '@/config';
import { useRoute } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import Colors from '../../constants/Colors';
import WelcomeBanner from '../Home/WelcomeBanner';

interface BillItem {
  id: number;
  total_price: number;
  created_by: number;
  created_at: string;
  note: string;
  items: {
    id: number;
    bill_id: number;
    product_id: number;
    quantity: number;
    price: number;
    product_name: string;
  }[];
  employee: {
    id: number;
    name: string;
  };
}

const BillDetailScreen: React.FC = () => {
  const route = useRoute();
  const { billId } = route.params as { billId: number };

  const [bill, setBill] = useState<BillItem | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBill = async () => {
      try {
        const response = await fetch(`${API_URL}/api/bill/${billId}`);
        if (!response.ok) throw new Error('Lỗi mạng hoặc dữ liệu');
        const data = await response.json();
        setBill(data);
      } catch (error) {
        console.error('Lỗi lấy chi tiết hóa đơn:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchBill();
  }, [billId]);

  if (loading) return <ActivityIndicator size="large" color={Colors.primary} />;
  if (!bill) return <Text>Không tìm thấy hóa đơn</Text>;

  return (
    <>
      <WelcomeBanner />
      <Text style={styles.pageTitle}>CHI TIẾT ĐƠN HÀNG</Text>

      <View style={styles.container}>
        <Text style={styles.title}>Đơn hàng #{bill.id}</Text>

        {bill.items.map((product) => (
          <View key={product.id} style={styles.itemRow}>
            <Text style={styles.itemName}>
              {product.product_name} <Text style={styles.quantity}>x{product.quantity}</Text>
            </Text>
            <Text style={styles.itemPrice}>
              {(product.price * product.quantity).toLocaleString()}đ
            </Text>
          </View>
        ))}

        <View style={styles.divider} />
        <Text style={styles.total}>Tổng tiền: {bill.total_price.toLocaleString()}đ</Text>
        <Text style={styles.meta}>Ngày tạo: {new Date(bill.created_at).toLocaleString('vi-VN')}</Text>
        <Text style={styles.meta}>Nhân viên: {bill.employee.name}</Text>
      </View>
    </>
  );

};

const styles = StyleSheet.create({
  pageTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 12,
    marginBottom: 8,
    color: Colors.accent,
  },
  container: {
    margin: 16,
    padding: 16,
    borderRadius: 10,
    backgroundColor: Colors.secondary,
    borderWidth: 1,
    borderColor: Colors.accent,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 12,
    color: Colors.dark,
  },
  itemRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
    borderBottomWidth: 0.5,
    borderBottomColor: Colors.accent,
    paddingBottom: 4,
  },
  itemName: {
    fontSize: 15,
    color: Colors.black,
  },
  quantity: {
    fontSize: 14,
    color: Colors.primary,
  },
  itemPrice: {
    fontSize: 15,
    fontWeight: '500',
    color: Colors.accent,
  },
  divider: {
    borderTopWidth: 1,
    borderTopColor: Colors.dark,
    marginVertical: 12,
  },
  total: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.primary,
    textAlign: 'right',
    marginBottom: 6,
  },
  meta: {
    fontSize: 13,
    color: Colors.dark,
    textAlign: 'right',
  },
});



export default BillDetailScreen;
