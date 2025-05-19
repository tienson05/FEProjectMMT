import API_URL from '@/config';
import React, { useContext, useState } from 'react';
import { ActivityIndicator, Alert, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Colors from '../../constants/Colors';
import WelcomeBanner from '../Home/WelcomeBanner';
import { useUser } from '../Profile/UserContext';
import { CartContext } from './CartContext';
import CartList from './CartList';
import CartSummary from './CartSummary';

const CartScreen: React.FC = () => {
  const { cart, updateQuantity, removeItem, clearCart } = useContext(CartContext);
  const [loading, setLoading] = useState(false);
  const { user } = useUser();
  const handleConfirmOrder = async () => {
    if (cart.length === 0) {
      Alert.alert('Giỏ hàng trống', 'Vui lòng thêm sản phẩm trước khi xác nhận.');
      return;
    }

    setLoading(true);
    const createdByEmployID = user?.id;
    const totalPrice = cart.reduce((total, item) => total + item.price * item.quantity, 0);

    const filteredItems = cart.map(({ id, quantity, price }) => ({
      product_id: id,
      quantity,
      price,
    }));

    const billData = {
      total_price: totalPrice,
      created_by: createdByEmployID,
      items: filteredItems,
    };

    // const billData = {
    //   totalPrice,
    //   createdByEmployID,
    //   items: cart,
    // };

    try {
      const response = await fetch(`${API_URL}/api/bill`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(billData),
      });

      if (!response.ok) {
        throw new Error('Lỗi server khi gửi đơn hàng');
      }

      const data = await response.json();
      Alert.alert('Thành công', 'Đơn hàng đã được gửi thành công!');
      clearCart(); // reset giỏ hàng sau khi gửi
    } catch (error: any) {
      Alert.alert('Lỗi', error.message || 'Gửi đơn hàng thất bại.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <WelcomeBanner />

        <View style={styles.cartContainer}>
          <CartList
            cartItems={cart}
            onUpdateQuantity={updateQuantity}
            onRemoveItem={removeItem}
          />
        </View>

        <CartSummary items={cart} />

        <View style={styles.buttonContainer}>
          {loading ? (
            <ActivityIndicator size="large" color={Colors.primary} />
          ) : (
            <TouchableOpacity style={styles.button} onPress={handleConfirmOrder} activeOpacity={0.7}>
              <Text style={styles.buttonText}>Xác nhận đơn hàng</Text>
            </TouchableOpacity>
          )}
        </View>
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
  buttonContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  button: {
    backgroundColor: Colors.primary,
    paddingVertical: 14,
    paddingHorizontal: 30,
    borderRadius: 25,
    elevation: 3, // shadow cho Android
    shadowColor: Colors.dark, // shadow cho iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
  },
  buttonText: {
    color: Colors.white,
    fontWeight: '700',
    fontSize: 16,
    textAlign: 'center',
  },
});

export default CartScreen;
