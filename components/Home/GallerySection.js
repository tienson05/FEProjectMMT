import { Dimensions, Image, ScrollView, StyleSheet, View } from 'react-native';

const images = [
  require('@/assets/images/anh1.jpg'),
  require('@/assets/images/anh3.jpg'),
  require('@/assets/images/anh2.jpg'),
  require('@/assets/images/anh4.jpg'),
  // Thêm ảnh bạn muốn ở đây
];

const screenWidth = Dimensions.get('window').width;

const GallerySection = () => {
  return (
    <View style={styles.container}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {images.map((img, index) => (
          <Image key={index} source={img} style={styles.image} />
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 20,
  },
  scrollContent: {
    paddingHorizontal: 10,
  },
  image: {
    width: screenWidth * 0.8,
    height: screenWidth * 0.8,
    borderRadius: 10,
    marginRight: 15,
  },
});

export default GallerySection;
