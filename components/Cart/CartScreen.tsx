import React, { useState } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, View } from 'react-native';
import Colors from '../../constants/Colors';
import WelcomeBanner from '../Home/WelcomeBanner';
import CartList from './CartList';
import CartSummary from './CartSummary';

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

const initialCart: CartItem[] = [
  { id: '1', name: 'Cà phê sữa', price: 35000, quantity: 2 },
  { id: '2', name: 'Trà đào', price: 40000, quantity: 1 },
  { id: '3', name: 'Sinh tố xoài', price: 45000, quantity: 1 },
  { id: '4', name: 'Nước cam', price: 30000, quantity: 2 },
  { id: '5', name: 'Sữa chua đánh đá', price: 32000, quantity: 1 },
  { id: '6', name: 'Matcha đá xay', price: 48000, quantity: 1 },
  { id: '7', name: 'Cà phê đen', price: 30000, quantity: 2 },
  { id: '8', name: 'Trà sữa trân châu', price: 50000, quantity: 1 },
  { id: '9', name: 'Trà đào cam sả', price: 49000, quantity: 1 },
  { id: '10', name: 'Cacao nóng', price: 45000, quantity: 1 },
];

const CartScreen: React.FC = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>(initialCart);

  const updateQuantity = (id: string, newQty: number) => {
    setCartItems(items =>
      items.map(item =>
        item.id === id ? { ...item, quantity: newQty } : item
      )
    );
  };

  const removeItem = (id: string) => {
    setCartItems(items => items.filter(item => item.id !== id));
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <WelcomeBanner />

        <View style={styles.cartContainer}>
          <CartList
            cartItems={cartItems}
            onUpdateQuantity={updateQuantity}
            onRemoveItem={removeItem}
          />
        </View>

        <CartSummary items={cartItems} />
      </ScrollView>

    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.secondary,
  },
  scrollContent: {
    padding: 16,
    flexGrow: 1,
  },
  cartContainer: {
    marginTop: 8,
    marginBottom: 16,
  },
});

export default CartScreen;
