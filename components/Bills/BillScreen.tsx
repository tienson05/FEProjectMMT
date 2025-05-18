import API_URL from '@/config';
import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  View
} from 'react-native';
import Colors from '../../constants/Colors';
import WelcomeBanner from '../Home/WelcomeBanner';
import BillDetail from './BillDetail';
import BillList from './BillList';

interface Bill {
  id: number;
  phoneNumberCus: string;
  totalPrice: number;
  createdByEmployID: number;
  created_at: string;
  user: {
    name: string;
  }
}

interface BillItem {
  id: number,
  phoneNumberCus: string;
  totalPrice: number;
  createdByEmployID: number;
  created_at: string;
  items: [{
    id: number,
    invoice_id: number,
    product_id: number,
    quantity: number;
    price: number,
    product_name: string,
  }],
  employee: {
    id: number,
    name: string,
  }
}

const BillsScreen: React.FC = () => {
  const [bills, setBills] = useState<Bill[]>([]);
  const [selectedBillId, setSelectedBillId] = useState<number | null>(null);
  const [billItems, setBillItems] = useState<BillItem | null>(null);
  const [loadingItems, setLoadingItems] = useState(false);
  const [loadingBills, setLoadingBills] = useState(false);

  // Fetch danh sách hóa đơn khi vào màn hình
  useEffect(() => {
    const fetchBills = async () => {
      setLoadingBills(true);
      try {
        const res = await fetch(`${API_URL}/api/bill`);
        const data = await res.json();
        setBills(data);
      } catch (err) {
        console.error('Lỗi khi tải danh sách hóa đơn:', err);
      } finally {
        setLoadingBills(false);
      }
    };
    fetchBills();
  }, []);

  // Fetch chi tiết hóa đơn khi chọn một bill
  useEffect(() => {
    if (!selectedBillId) return;

    const fetchItems = async () => {
      setLoadingItems(true);
      try {
        const res = await fetch(`${API_URL}/api/bill/${selectedBillId}`);
        const data = await res.json();
        setBillItems(data);
      } catch (err) {
        console.error('Lỗi khi tải chi tiết hóa đơn:', err);
      } finally {
        setLoadingItems(false);
      }
    };
    fetchItems();
  }, [selectedBillId]);

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <WelcomeBanner />

          <View style={styles.content}>
            {/* Danh sách hóa đơn */}
            {loadingBills ? (
              <ActivityIndicator size="large" color={Colors.primary} />
            ) : (
              <BillList bills={bills} onSelect={setSelectedBillId} />
            )}

            {/* Chi tiết hóa đơn */}
            {selectedBillId && (
              loadingItems ? (
                <ActivityIndicator size="small" color={Colors.primary} />
              ) : (
                <BillDetail billId={selectedBillId} items={billItems} />
              )
            )}
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.secondary,
  },
  scrollContainer: {
    flexGrow: 1,
    paddingBottom: 24,
  },
  content: {
    paddingHorizontal: 16,
  },
});

export default BillsScreen;
