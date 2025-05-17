import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Colors from '../../constants/Colors';

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

interface CartSummaryProps {
  items: CartItem[];
}

const CartSummary: React.FC<CartSummaryProps> = ({ items }) => {
  const totalPrice = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const discount = totalPrice > 200000 ? totalPrice * 0.1 : 0;
  const finalPrice = totalPrice - discount;

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Tổng tiền: {totalPrice.toLocaleString()}đ</Text>
      {discount > 0 && (
        <Text style={[styles.text, styles.discount]}>
          Giảm giá: -{discount.toLocaleString()}đ (10%)
        </Text>
      )}
      <Text style={styles.finalText}>Thanh toán: {finalPrice.toLocaleString()}đ</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    borderTopWidth: 1,
    borderColor: Colors.primary,
    backgroundColor: Colors.secondary,
  },
  text: {
    fontSize: 18,
    color: Colors.dark,
  },
  discount: {
    color: 'green',
    marginTop: 4,
  },
  finalText: {
    marginTop: 8,
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.accent,
  },
});

export default CartSummary;
