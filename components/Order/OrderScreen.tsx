import React, { useState } from 'react';
import { Alert, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Colors from '../../constants/Colors';
import WelcomeBanner from '../Home/WelcomeBanner';

const dishData = {
  id: '5326',
  name: 'Hồng Mơ',
  price: 49000,
  description: 'Hồng Mơ – thức uống được làm từ hồng và mơ tươi thơm ngon, giải khát tuyệt vời cho ngày hè.',
  image: 'https://congcaphe.com/wp-content/uploads/2023/04/hong-mo-500x500.jpg',
};

const ProductOrderScreen = () => {
  const [quantity, setQuantity] = useState(1);

  const increment = () => setQuantity(q => q + 1);
  const decrement = () => setQuantity(q => (q > 1 ? q - 1 : 1));

  const addToCart = () => {
    Alert.alert('Thêm vào giỏ', `Bạn đã thêm ${quantity} x ${dishData.name} vào giỏ hàng.`);
  };

  return (
    <ScrollView 
      contentContainerStyle={styles.scrollContentContainer} 
      style={styles.container}
    >
      {/* Bọc toàn bộ nội dung trong 1 View chính với flex:1 và justifyContent: space-between */}
      <View style={styles.mainContent}>
        <WelcomeBanner />

        <View style={styles.imageContainer}>
  <Image source={{ uri: dishData.image }} style={styles.image} resizeMode="cover" />
</View>

<View style={styles.infoContainer}>
  <Text style={styles.name}>{dishData.name}</Text>
  <Text style={styles.price}>{dishData.price.toLocaleString()}đ</Text>
  <Text style={styles.description}>{dishData.description}</Text>

  <View style={styles.quantityContainer}>
    <TouchableOpacity style={styles.qtyBtn} onPress={decrement}>
      <Text style={styles.qtyBtnText}>-</Text>
    </TouchableOpacity>

    <Text style={styles.qtyText}>{quantity}</Text>

    <TouchableOpacity style={styles.qtyBtn} onPress={increment}>
      <Text style={styles.qtyBtnText}>+</Text>
    </TouchableOpacity>
  </View>

  <TouchableOpacity style={styles.addToCartBtn} onPress={addToCart}>
    <Text style={styles.addToCartText}>Thêm vào giỏ</Text>
  </TouchableOpacity>
</View>


        {/* InfoSection luôn ở dưới cùng */}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.secondary, // nền màu vàng nhạt nhẹ nhàng
  },
  scrollContentContainer: {
    flexGrow: 1, // scrollview sẽ chiếm đủ chiều cao màn hình
  },
  mainContent: {
    flex: 1,
    justifyContent: 'space-between', // đẩy phần đầu và InfoSection cách xa nhau
    minHeight: '100%', // đảm bảo chiều cao tối thiểu 100%
  },
  rowContainer: {
    flexDirection: 'row',
    paddingVertical: 16,
    paddingHorizontal: 10,
    alignItems: 'center',
  },
  emptySpace: {
    flex: 1,
  },
  imageContainer: {
  width: '100%',
  paddingHorizontal: 16,
  marginTop: 20,
  alignItems: 'center',
},
image: {
  width: '100%',
  height: 250,
  borderRadius: 16,
  borderWidth: 2,
  borderColor: Colors.primary,
},
infoContainer: {
  paddingHorizontal: 20,
  paddingTop: 20,
    marginBottom: 30, // Thêm dòng này để đẩy cách InfoSection ra

},

  name: {
    fontSize: 32,
    fontWeight: 'bold',
    color: Colors.dark, // màu tím nâu đậm
    marginBottom: 8,
  },
  price: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.primary, // cam nâu nổi bật
    marginBottom: 12,
  },
  description: {
    fontSize: 16,
    color: Colors.accent, // màu xanh xám bụi nhẹ nhàng
    marginBottom: 24,
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  qtyBtn: {
    backgroundColor: Colors.primary, // nút tăng giảm cam nâu
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 6,
  },
  qtyBtnText: {
    color: Colors.white,
    fontSize: 24,
    fontWeight: 'bold',
  },
  qtyText: {
    marginHorizontal: 20,
    fontSize: 20,
    minWidth: 40,
    textAlign: 'center',
    color: Colors.dark, // số lượng màu tím nâu đậm
  },
  addToCartBtn: {
    backgroundColor: Colors.primary, // nút thêm giỏ cam nâu
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
  },
  addToCartText: {
    color: Colors.white,
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default ProductOrderScreen;
