import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Colors from '../../constants/Colors';

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

interface Props {
  billId: number;
  items: BillItem | null;
}


const BillDetail: React.FC<Props> = ({ billId, items }) => {

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Chi tiết đơn hàng #{billId}</Text>
      {items?.items.map((product) => (
        <View key={product.id} style={styles.itemRow}>
          <Text style={styles.itemText}>{product.product_name} x {product.quantity}</Text>
          <Text style={styles.itemText}>{(product.price * product.quantity).toLocaleString()}đ</Text>
        </View>
      ))}
      <Text style={styles.total}>Tổng tiền: {items?.totalPrice}đ</Text>
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
