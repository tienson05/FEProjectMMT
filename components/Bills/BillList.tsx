import React from 'react';
import { FlatList, StyleSheet, Text, TouchableOpacity } from 'react-native';
import Colors from '../../constants/Colors';

interface Bill {
  id: number;
  phoneNumberCus: string;
  totalPrice: number;
  createdByEmployID: number;
  created_at: string,
  user: {
    name: string;
  }
}

interface Props {
  bills: Bill[];
  onSelect: (billId: number) => void;
}

const BillList: React.FC<Props> = ({ bills, onSelect }) => {
  const renderItem = ({ item }: { item: Bill }) => (
    <TouchableOpacity style={styles.item} onPress={() => onSelect(item.id)}>
      <Text style={styles.id}>Mã đơn: {item.id}</Text>
      <Text style={styles.text}>Tổng tiền: {item.totalPrice}</Text>
      <Text style={styles.text}>Phone guest: {item.phoneNumberCus}</Text>
      <Text style={styles.text}>Thời gian: {item.created_at}</Text>
      <Text style={styles.text}>Người tạo: {item.user.name}</Text>
    </TouchableOpacity>
  );

  return (
    <FlatList
      data={bills}
      keyExtractor={(item) => item.id.toString()}
      renderItem={renderItem}
      contentContainerStyle={styles.list}
    />
  );
};

const styles = StyleSheet.create({
  list: {
    padding: 16,
    backgroundColor: Colors.secondary,
  },
  item: {
    backgroundColor: Colors.primary,
    padding: 12,
    borderRadius: 8,
    marginBottom: 12,
  },
  id: {
    fontWeight: 'bold',
    color: Colors.white,
    fontSize: 16,
  },
  text: {
    color: Colors.white,
    marginTop: 4,
  },
});

export default BillList;
