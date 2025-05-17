import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import AboutSection from './AboutSection';
import GallerySection from './GallerySection'; // import mới
import HeroImageWithText from './HeroImageWithText';
import InfoSection from './InfoSection';
import WelcomeBanner from './WelcomeBanner';

const HomeScreen = () => {
  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
      showsVerticalScrollIndicator={false}
    >
      <WelcomeBanner />
      <HeroImageWithText />
      <AboutSection />
      <GallerySection />   {/* Thêm gallery dưới AboutSection */}
      <InfoSection />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fbdb93',
  },
  contentContainer: {
    paddingBottom: 40,
  },
});

export default HomeScreen;
