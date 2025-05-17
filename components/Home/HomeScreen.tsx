import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import AboutSection from './AboutSection';
import WelcomeBanner from './WelcomeBanner';

const HomeScreen = () => {
  return (
    <ScrollView style={styles.container}>
      <WelcomeBanner />
      <AboutSection />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});

export default HomeScreen;
