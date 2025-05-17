import Colors from '@/constants/Colors';
import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';

const WelcomeBanner = () => {
  return (
    <View style={styles.banner}>
      <Image
        source={require('@/assets/images/logocafe.jpg')}
        style={styles.logo}
        resizeMode="contain"
      />
      <Text style={styles.title}>Cộng Cà Phê</Text>
      <Text style={styles.subtitle}>Nơi bạn bè hội tụ</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  banner: {
    backgroundColor: Colors.primary,
    paddingVertical: 20,
    alignItems: 'center',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    shadowColor: Colors.dark,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 6,
  },
  logo: {
    width: 60,
    height: 60,
    marginBottom: 8,
    borderRadius: 30,
    borderWidth: 1,
    borderColor: Colors.secondary,
  },
  title: {
    color: Colors.secondary,
    fontSize: 20,
    fontWeight: 'bold',
  },
  subtitle: {
    color: Colors.secondary,
    fontSize: 12,
    marginTop: 3,
    fontStyle: 'italic',
  },
});

export default WelcomeBanner;
