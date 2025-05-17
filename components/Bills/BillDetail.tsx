import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Colors from '../../constants/Colors';

interface BillItem {
  name: string;
  quantity: number;
  price: number;
}

interface Props {
  billId: string;
  items: BillItem[];
}

const BillDetail: React.FC<Props> = ({ billId, items }) => {
  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Chi tiết đơn hàng #{billId}</Text>
      {items.map((item, index) => (
        <View key={index} style={styles.itemRow}>
          <Text style={styles.itemText}>{item.name} x{item.quantity}</Text>
          <Text style={styles.itemText}>{(item.price * item.quantity).toLocaleString()}đ</Text>
        </View>
      ))}
      <Text style={styles.total}>Tổng tiền: {total.toLocaleString()}đ</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: Colors.secondary,
    borderTopWidth: 2,
    borderTopColor: Colors.accent,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.dark,
    marginBottom: 12,
  },
  itemRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 6,
  },
  itemText: {
    color: Colors.black,
  },
  total: {
    marginTop: 16,
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.accent,
  },
});

export default BillDetail;
