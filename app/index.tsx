import React from 'react';
import { StyleSheet, View } from 'react-native';
import HomeScreen from '../components/Home/HomeScreen';
import MenuScreen from '../components/Menu/MenuScreen';
import OrderScreen from '../components/Order/OrderScreen';
import CartScreen from '../components/Cart/CartScreen';
import BillScreen from '../components/Bills/BillScreen';
import ManageMenuScreen from '../components/ManageMenu/ManageMenuScreen';






export default function Index() {
  return (
    <View style={styles.container}>
      < MenuScreen/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});