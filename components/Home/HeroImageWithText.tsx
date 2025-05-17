import React from 'react';
import { Dimensions, ImageBackground, StyleSheet, Text } from 'react-native';

const HeroImageWithText = () => {
  return (
    <ImageBackground
      source={require('@/assets/images/caycaphe.jpg')}
      style={styles.hero}
      imageStyle={styles.imageStyle}
    >
      <Text style={styles.text}>Cà Phê – Hương vị hoài niệm</Text>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  hero: {
    width: '100%',
    height: Dimensions.get('window').width * 0.8,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 20,
  },
  imageStyle: {
    borderRadius: 15,
  },
  text: {
    color: 'white',
    fontSize: 26,
    fontWeight: '900',
    letterSpacing: 1,
    textAlign: 'center',
    paddingHorizontal: 25,
    paddingVertical: 12,
    borderRadius: 15,
    backgroundColor: 'rgba(0, 0, 0, 0.35)', // nền mờ vừa phải
    textShadowColor: 'rgba(0, 0, 0, 0.8)', // bóng đổ chữ
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 6,
  },
});

export default HeroImageWithText;
