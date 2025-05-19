import { useNavigation } from 'expo-router';
import React from 'react';
import { FlatList, StyleSheet, Text, TouchableOpacity } from 'react-native';
import Colors from '../../constants/Colors';

interface Bill {
  id: number;
  total_price: number;
  created_by: number;
  created_at: string;
  status: string,
  user: {
    name: string;
  }
}

interface Props {
  bills: Bill[];
  onSelect: (billId: number) => void;
}

const BillList: React.FC<Props> = ({ bills }) => {
  const navigation = useNavigation();

  const renderItem = ({ item }: { item: Bill }) => (
    <TouchableOpacity
      style={styles.item}
      onPress={() => navigation.navigate('BillDetail', { billId: item.id })}
    >
      <Text style={styles.id}>Mã đơn: {item.id}</Text>
      <Text style={styles.text}>Tổng tiền: {item.total_price}</Text>
      <Text style={styles.text}>Status: {item.status}</Text>
      <Text style={styles.text}>
        Thời gian: {new Date(item.created_at).toLocaleString('vi-VN')}
      </Text>
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
