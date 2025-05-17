import React from 'react';
import { Alert, FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Colors from '../../constants/Colors';

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

interface CartListProps {
  cartItems: CartItem[];
  onUpdateQuantity: (id: string, quantity: number) => void;
  onRemoveItem: (id: string) => void;
}

const CartList: React.FC<CartListProps> = ({ cartItems, onUpdateQuantity, onRemoveItem }) => {
  const renderItem = ({ item }: { item: CartItem }) => (
    <View style={styles.itemContainer}>
      <View style={styles.info}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.price}>{item.price.toLocaleString()}đ</Text>
      </View>

      <View style={styles.controls}>
        <TouchableOpacity
          style={styles.qtyBtn}
          onPress={() => onUpdateQuantity(item.id, Math.max(item.quantity - 1, 1))}
        >
          <Text style={styles.qtyBtnText}>-</Text>
        </TouchableOpacity>

        <Text style={styles.qtyText}>{item.quantity}</Text>

        <TouchableOpacity
          style={styles.qtyBtn}
          onPress={() => onUpdateQuantity(item.id, item.quantity + 1)}
        >
          <Text style={styles.qtyBtnText}>+</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.removeBtn}
          onPress={() =>
            Alert.alert(
              'Xóa món',
              `Bạn có chắc muốn xóa ${item.name} khỏi giỏ?`,
              [
                { text: 'Hủy', style: 'cancel' },
                { text: 'Xóa', style: 'destructive', onPress: () => onRemoveItem(item.id) },
              ]
            )
          }
        >
          <Text style={styles.removeText}>Xóa</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  if (cartItems.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>Giỏ hàng trống</Text>
      </View>
    );
  }

  return (
    <FlatList
      data={cartItems}
      keyExtractor={(item) => item.id}
      renderItem={renderItem}
      contentContainerStyle={styles.listContainer}
    />
  );
};

const styles = StyleSheet.create({
  listContainer: {
    padding: 16,
  },
  itemContainer: {
    backgroundColor: Colors.white,
    padding: 12,
    marginBottom: 12,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: Colors.primary,
  },
  info: {
    flex: 2,
  },
  name: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.dark,
  },
  price: {
    marginTop: 4,
    fontSize: 16,
    color: Colors.primary,
  },
  controls: {
    flex: 2,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  qtyBtn: {
    backgroundColor: Colors.primary,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
  },
  qtyBtnText: {
    color: Colors.white,
    fontSize: 20,
    fontWeight: 'bold',
  },
  qtyText: {
    marginHorizontal: 12,
    fontSize: 18,
    minWidth: 32,
    textAlign: 'center',
    color: Colors.black,
  },
  removeBtn: {
    marginLeft: 12,
    paddingHorizontal: 8,
    paddingVertical: 6,
    backgroundColor: Colors.accent,
    borderRadius: 6,
  },
  removeText: {
    color: Colors.white,
    fontWeight: 'bold',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  emptyText: {
    fontSize: 20,
    color: Colors.dark,
  },
});

export default CartList;
