import React, { useState } from 'react';
import {
    KeyboardAvoidingView,
    Platform,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    View,
} from 'react-native';
import Colors from '../../constants/Colors';
import WelcomeBanner from '../Home/WelcomeBanner';
import BillDetail from './BillDetail';
import BillList from './BillList';

interface Bill {
  id: string;
  createdBy: string;
  createdAt: string;
}

interface BillItem {
  name: string;
  quantity: number;
  price: number;
}

// Mock data cho danh sách hóa đơn
const mockBills: Bill[] = [
  { id: 'B001', createdBy: 'Nguyễn Văn A', createdAt: '2025-05-17 10:30' },
  { id: 'B002', createdBy: 'Trần Thị B', createdAt: '2025-05-16 15:20' },
  { id: 'B003', createdBy: 'Lê Văn C', createdAt: '2025-05-15 09:10' },
  { id: 'B004', createdBy: 'Phạm Thị D', createdAt: '2025-05-14 14:00' },
  { id: 'B005', createdBy: 'Hoàng Văn E', createdAt: '2025-05-13 11:25' },
  { id: 'B006', createdBy: 'Vũ Thị F', createdAt: '2025-05-12 13:30' },
  { id: 'B007', createdBy: 'Trần Văn G', createdAt: '2025-05-11 16:40' },
  { id: 'B008', createdBy: 'Lê Thị H', createdAt: '2025-05-10 08:15' },
  { id: 'B009', createdBy: 'Nguyễn Văn I', createdAt: '2025-05-09 17:00' },
  { id: 'B010', createdBy: 'Phạm Thị J', createdAt: '2025-05-08 12:45' },
  { id: 'B011', createdBy: 'Hoàng Văn K', createdAt: '2025-05-07 10:00' },
  { id: 'B012', createdBy: 'Vũ Thị L', createdAt: '2025-05-06 15:10' },
  { id: 'B013', createdBy: 'Trần Văn M', createdAt: '2025-05-05 14:50' },
  { id: 'B014', createdBy: 'Lê Thị N', createdAt: '2025-05-04 09:30' },
  { id: 'B015', createdBy: 'Nguyễn Văn O', createdAt: '2025-05-03 11:20' },
];

// Mock data chi tiết các món theo hóa đơn
const mockItemsByBill: Record<string, BillItem[]> = {
  B001: [
    { name: 'Cà phê sữa', quantity: 2, price: 35000 },
    { name: 'Bánh ngọt', quantity: 1, price: 25000 },
  ],
  B002: [
    { name: 'Trà đào', quantity: 1, price: 40000 },
    { name: 'Nước suối', quantity: 2, price: 10000 },
  ],
  B003: [
    { name: 'Cà phê đen', quantity: 1, price: 30000 },
    { name: 'Bánh mì', quantity: 3, price: 15000 },
  ],
  B004: [{ name: 'Sinh tố bơ', quantity: 2, price: 45000 }],
  B005: [
    { name: 'Trà xanh', quantity: 1, price: 35000 },
    { name: 'Bánh ngọt', quantity: 2, price: 25000 },
  ],
  B006: [
    { name: 'Cà phê sữa', quantity: 3, price: 35000 },
    { name: 'Trà đào', quantity: 1, price: 40000 },
  ],
  B007: [{ name: 'Nước cam', quantity: 2, price: 30000 }],
  B008: [
    { name: 'Bánh mì kẹp', quantity: 1, price: 20000 },
    { name: 'Cà phê đen', quantity: 1, price: 30000 },
  ],
  B009: [{ name: 'Sinh tố dâu', quantity: 2, price: 45000 }],
  B010: [{ name: 'Trà đào', quantity: 3, price: 40000 }],
  B011: [
    { name: 'Cà phê sữa', quantity: 1, price: 35000 },
    { name: 'Bánh ngọt', quantity: 1, price: 25000 },
  ],
  B012: [{ name: 'Nước suối', quantity: 4, price: 10000 }],
  B013: [
    { name: 'Trà xanh', quantity: 2, price: 35000 },
    { name: 'Bánh mì', quantity: 2, price: 15000 },
  ],
  B014: [{ name: 'Cà phê đen', quantity: 2, price: 30000 }],
  B015: [
    { name: 'Sinh tố bơ', quantity: 1, price: 45000 },
    { name: 'Nước cam', quantity: 1, price: 30000 },
  ],
};

const BillsScreen: React.FC = () => {
  const [selectedBillId, setSelectedBillId] = useState<string | null>(null);

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
            <BillList bills={mockBills} onSelect={setSelectedBillId} />

            {/* Hiển thị chi tiết đơn hàng nếu đã chọn */}
            {selectedBillId && (
              <BillDetail billId={selectedBillId} items={mockItemsByBill[selectedBillId]} />
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
    justifyContent: 'space-between',
    paddingBottom: 24,
  },
  content: {
    paddingHorizontal: 16,
  },
});

export default BillsScreen;
