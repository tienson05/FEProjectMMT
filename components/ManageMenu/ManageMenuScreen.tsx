import React, { useState } from 'react';
import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import Colors from '../../constants/Colors';
import WelcomeBanner from '../Home/WelcomeBanner';
import CategoryList from '../Menu/CategoryList';

const ManageMenuScreen = () => {
  // Dữ liệu ban đầu
  const [categories, setCategories] = useState([
    {
      id: '1',
      name: 'Cà Phê',
      dishes: Array.from({ length: 5 }).map((_, i) => ({
        id: `cf${i + 1}`,
        name: `Cà Phê Đặc Biệt ${i + 1}`,
        price: `${29 + i}000đ`,
        image: 'https://congcaphe.com/wp-content/uploads/2023/04/cfden-247x296.jpg',
      })),
    },
    {
      id: '2',
      name: 'Sinh Tố',
      dishes: Array.from({ length: 5 }).map((_, i) => ({
        id: `st${i + 1}`,
        name: `Sinh Tố Thơm Ngon ${i + 1}`,
        price: `${35 + i}000đ`,
        image: 'https://congcaphe.com/wp-content/uploads/2023/04/stbo-247x296.jpg',
      })),
    },
  ]);

  // State form
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState('');
  const [showForm, setShowForm] = useState(false); // kiểm soát hiển thị form

  // Xử lý thêm món ăn
  const handleAddDish = () => {
    if (!name || !price || !category) {
      Alert.alert('Lỗi', 'Vui lòng nhập đầy đủ tên, giá và danh mục');
      return;
    }

    const newDish = {
      id: Math.random().toString(),
      name,
      price: price.includes('đ') ? price : price + 'đ',
      description,
      image:
        image ||
        'https://congcaphe.com/wp-content/uploads/2023/04/cfden-247x296.jpg',
      category,
    };

    const existingCategory = categories.find(
      (cat) => cat.name.toLowerCase() === category.toLowerCase()
    );

    if (existingCategory) {
      const updatedCategories = categories.map((cat) =>
        cat.id === existingCategory.id
          ? { ...cat, dishes: [...cat.dishes, newDish] }
          : cat
      );
      setCategories(updatedCategories);
    } else {
      const newCategory = {
        id: Math.random().toString(),
        name: category,
        dishes: [newDish],
      };
      setCategories([...categories, newCategory]);
    }

    // Reset form và ẩn form sau khi thêm
    setName('');
    setPrice('');
    setCategory('');
    setDescription('');
    setImage('');
    setShowForm(false);
  };

  return (
    <ScrollView style={styles.container} keyboardShouldPersistTaps="handled">
      <WelcomeBanner />

      <View style={styles.menuTitleContainer}>
        <Text style={styles.menuTitle}>Menu</Text>
      </View>

      {/* Nút hiện form */}
      {!showForm && (
        <TouchableOpacity
          style={[styles.submitButton, { marginHorizontal: 16 }]}
          onPress={() => setShowForm(true)}
        >
          <Text style={styles.submitButtonText}>Thêm món</Text>
        </TouchableOpacity>
      )}

      {/* Form nhập món ăn */}
      {showForm && (
        <View style={styles.formContainer}>
          <Text style={styles.formLabel}>Tên món</Text>
          <TextInput
            style={styles.input}
            value={name}
            onChangeText={setName}
            placeholder="Nhập tên món"
          />

          <Text style={styles.formLabel}>Giá</Text>
          <TextInput
            style={styles.input}
            value={price}
            onChangeText={setPrice}
            placeholder="Nhập giá (vd: 30000đ)"
            keyboardType="numeric"
          />

          <Text style={styles.formLabel}>Danh mục</Text>
          <TextInput
            style={styles.input}
            value={category}
            onChangeText={setCategory}
            placeholder="Nhập danh mục món"
          />

          <Text style={styles.formLabel}>Mô tả</Text>
          <TextInput
            style={[styles.input, { height: 60 }]}
            value={description}
            onChangeText={setDescription}
            placeholder="Nhập mô tả (không bắt buộc)"
            multiline
          />

          <Text style={styles.formLabel}>Ảnh (URL)</Text>
          <TextInput
            style={styles.input}
            value={image}
            onChangeText={setImage}
            placeholder="Nhập URL ảnh (không bắt buộc)"
          />

          <TouchableOpacity style={styles.submitButton} onPress={handleAddDish}>
            <Text style={styles.submitButtonText}>Lưu món</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.submitButton, { backgroundColor: Colors.dark, marginTop: 8 }]}
            onPress={() => setShowForm(false)}
          >
            <Text style={[styles.submitButtonText, { color: Colors.white }]}>Hủy</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* Danh sách menu */}
      <CategoryList categories={categories} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.secondary,
  },
  menuTitleContainer: {
    alignItems: 'center',
    marginVertical: 16,
  },
  menuTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    color: Colors.primary,
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  formContainer: {
    paddingHorizontal: 16,
    marginBottom: 20,
  },
  formLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.dark,
    marginTop: 10,
  },
  input: {
    backgroundColor: Colors.white,
    borderRadius: 6,
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginTop: 4,
    fontSize: 16,
    borderWidth: 1,
    borderColor: Colors.primary,
  },
  submitButton: {
    backgroundColor: Colors.primary,
    marginTop: 16,
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: 'center',
  },
  submitButtonText: {
    color: Colors.white,
    fontSize: 18,
    fontWeight: '700',
  },
});

export default ManageMenuScreen;
