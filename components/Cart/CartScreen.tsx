import React, { useState } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, View } from 'react-native';
import Colors from '../../constants/Colors';
import InfoSection from '../Home/InfoSection'; // import InfoSection
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

      <InfoSection />
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
