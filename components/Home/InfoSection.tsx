import Colors from '@/constants/Colors';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const InfoSection = () => {
  return (
    <View style={styles.section}>
      <Text style={styles.heading}>Giờ mở cửa</Text>
      <Text style={styles.infoText}>8:00 sáng - 10:00 tối mỗi ngày</Text>
      <Text style={styles.heading}>Địa chỉ</Text>
      <Text style={styles.infoText}>123 Đường Nguyễn Lương Bằng, Quận 1, TP.HCM</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  section: {
    backgroundColor: Colors.dark,
    padding: 20,
    borderRadius: 15,
    marginHorizontal: 15,
    marginBottom: 30,
  },
  heading: {
    color: Colors.secondary,
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 6,
  },
  infoText: {
    color: Colors.secondary,
    fontSize: 16,
    marginBottom: 12,
  },
});

export default InfoSection;
