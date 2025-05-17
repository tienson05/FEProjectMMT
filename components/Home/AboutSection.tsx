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
Thèm một không gian thư thái, ấm cúng hay năng động để tận hưởng tách cà phê thơm lừng và "chậm" lại một chút giữa bộn bề? Ghé [Tên quán cà phê] nhé! Chúng tôi có cả hai, và còn nhiều hơn thế nữa để bạn khám phá.  </Text>
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
