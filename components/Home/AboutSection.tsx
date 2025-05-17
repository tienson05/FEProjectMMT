import Colors from '@/constants/Colors';
import React from 'react';
import { Image, StyleSheet, Text, useWindowDimensions, View } from 'react-native';

const AboutSection = () => {
  const { width } = useWindowDimensions();
  const isLargeScreen = width > 600;

  return (
    <View style={[styles.container, isLargeScreen ? styles.row : styles.column]}>
      <Image
        source={require('@/assets/images/cafe.jpg')}
        style={[styles.image, isLargeScreen ? styles.imageLarge : styles.imageSmall]}
        resizeMode="contain"
      />
      <View style={styles.textContainer}>
        <Text style={styles.heading}>Giới Thiệu</Text>
        <Text style={styles.description}>
          Bước chân vào một quán cà phê, bạn không chỉ tìm đến một tách đồ uống thơm ngon mà còn lạc vào một không gian riêng biệt, nơi thời gian dường như chậm lại. Đó có thể là một góc nhỏ ấm cúng với ánh đèn vàng dịu nhẹ, những bản nhạc du dương và mùi cà phê thoang thoảng đánh thức mọi giác quan. Hoặc một không gian hiện đại, năng động với những câu chuyện rôm rả và tiếng máy pha cà phê rộn ràng. Mỗi quán cà phê mang một cá tính riêng, một câu chuyện để kể, nơi bạn có thể tìm thấy sự thư thái, cảm hứng làm việc, hay đơn giản là một khoảnh khắc lắng đọng giữa nhịp sống hối hả.
        </Text>
        <Text style={styles.description}>
          Địa chỉ: 123 Đường Nguyễn Lương Bằng, Quận 1, TP.HCM
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.secondary,
    borderRadius: 20,
    marginHorizontal: 15,
    marginVertical: 30,
    padding: 30,
    alignItems: 'center',
    shadowColor: Colors.dark,
    shadowOpacity: 0.3,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 5 },
    elevation: 7,
  },
  row: {
    flexDirection: 'row',
  },
  column: {
    flexDirection: 'column',
  },
  image: {
    borderRadius: 20,
    marginBottom: 15,
    shadowColor: Colors.dark,
    shadowOpacity: 0.5,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 5 },
    elevation: 10,
  },
  imageLarge: {
    width: '45%',
    height: 350,
    marginRight: 20,
    marginBottom: 0,
    aspectRatio: 16 / 9,
  },
  imageSmall: {
    width: '100%',
    height: undefined,
    aspectRatio: 16 / 9,
  },
  textContainer: {
    flex: 1,
    paddingVertical: 10,
  },
  heading: {
    fontSize: 26,
    fontWeight: 'bold',
    color: Colors.dark,
    marginBottom: 15,
  },
  description: {
    fontSize: 18,
    color: Colors.dark,
    marginBottom: 16,
    lineHeight: 28,
  },
});

export default AboutSection;
