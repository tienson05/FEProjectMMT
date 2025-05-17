import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import AboutSection from './AboutSection';
import GallerySection from './GallerySection';
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
      <Spacing />
      <HeroImageWithText />
      <Spacing />
      <AboutSection />
      <Spacing />
      <GallerySection />
      <Spacing />
      <InfoSection />
    </ScrollView>
  );
};

// Component tạo khoảng cách giữa các section
const Spacing = () => <View style={{ height: 24 }} />;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fbdb93', // Có thể thay bằng màu trung tính hơn nếu quá chói
  },
  contentContainer: {
    paddingHorizontal: 16, // tránh dính sát lề
    paddingBottom: 40,
  },
});

export default HomeScreen;
