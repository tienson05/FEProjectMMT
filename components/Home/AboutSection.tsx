import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';

const AboutSection = () => {
  return (
    <View style={styles.section}>
      <Image
        source={{ uri: 'https://example.com/image.jpg' }}
        style={styles.image}
      />
      <Text style={styles.heading}>Giới Thiệu</Text>
      <Text style={styles.description}>
        Quán cà phê ABC là nơi phục vụ cà phê cùng với món ăn nhẹ truyền thống Việt Nam. 
        Chúng tôi mở cửa từ 9:00 sáng đến 10:00 tối mỗi ngày.
        Địa chỉ: 123 Đường Nguyễn Lương Bằng, Quận 1, TP.HCM
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  section: {
    padding: 20,
  },
  heading: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 10,
  },
  description: {
    marginTop: 10,
    fontSize: 16,
    lineHeight: 22,
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 10,
  },
});

export default AboutSection;
