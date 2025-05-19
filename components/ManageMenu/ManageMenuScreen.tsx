import API_URL from '@/config';
import { useFocusEffect } from '@react-navigation/native';
import React, { useCallback, useEffect, useState } from 'react';
import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import Colors from '../../constants/Colors';
import WelcomeBanner from '../Home/WelcomeBanner';
import CategoryList from './CategoryList';

interface IProduct {
  id: number;
  name: string;
  price: string;
  category_id: number;
  unit: string;
}

interface ICategory {
  id: number;
  name: string;
  products: IProduct[];
  dishes?: any[]; // dùng để render trong CategoryList
}

const ManageMenuScreen = () => {
  const [categories, setCategories] = useState<ICategory[]>([]);
  const [name, setName] = useState('');
  const [unit, setUnit] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState<string | number | null>(null);
  const [description, setDescription] = useState('');
  const [image, setImage] = useState('');
  const [showForm, setShowForm] = useState(false);

  const [open, setOpen] = useState(false);
  const [categoryItems, setCategoryItems] = useState<{ label: string; value: string }[]>([]);

  const fetchCategoriesWithProducts = async () => {
    try {
      const response = await fetch(`${API_URL}/api/category`);
      const data = await response.json();

      const formatted = data.map((cat: ICategory) => ({
        ...cat,
        dishes: cat.products,
      }));

      setCategories(formatted);
    } catch (error) {
      console.error('Lỗi khi tải danh mục và món:', error);
      Alert.alert('Lỗi', 'Không thể tải danh mục và món ăn từ server');
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchCategoriesWithProducts();
    }, [])
  );

  useEffect(() => {
    // Cập nhật danh sách items cho DropDown khi categories thay đổi
    const items = categories.map((cat) => ({
      label: cat.name,
      value: String(cat.id),
    }));
    setCategoryItems(items);
  }, [categories]);

  const handleAddDish = async () => {
    if (!name || !price || !category) {
      Alert.alert('Lỗi', 'Vui lòng nhập đầy đủ tên, giá và danh mục');
      return;
    }

    const newDish = {
      name,
      unit,
      price: Number(price),
      description,
      image_url:
        image ||
        'data:image/jpeg;base64,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',
      category_id: Number(category),
    };

    try {
      const response = await fetch(`${API_URL}/api/product`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newDish),
      });

      if (!response.ok) {
        throw new Error('Thêm món thất bại');
      }

      const createdDish = await response.json();

      // Gọi lại API categories nếu muốn cập nhật luôn danh sách
      await fetchCategoriesWithProducts();

      // Reset form
      setName('');
      setPrice('');
      setCategory('');
      setDescription('');
      setImage('');
      setShowForm(false);

      Alert.alert('Thành công', 'Món ăn đã được thêm');
    } catch (error) {
      console.error('Lỗi khi thêm món:', error);
      Alert.alert('Lỗi', 'Không thể thêm món ăn. Vui lòng thử lại.');
    }
  };


  return (
    <ScrollView style={styles.container} keyboardShouldPersistTaps="handled">
      <WelcomeBanner />

      <View style={styles.menuTitleContainer}>
        <Text style={styles.menuTitle}>Menu</Text>
      </View>

      {!showForm && (
        <TouchableOpacity
          style={[styles.submitButton, { marginHorizontal: 16 }]}
          onPress={() => setShowForm(true)}
        >
          <Text style={styles.submitButtonText}>Thêm món</Text>
        </TouchableOpacity>
      )}

      {showForm && (
        <View style={styles.formContainer}>
          <Text style={styles.formLabel}>Tên món</Text>
          <TextInput
            style={styles.input}
            value={name}
            onChangeText={setName}
            placeholder="Nhập tên món"
          />

          <Text style={styles.formLabel}>Đơn vị tính</Text>
          <TextInput
            style={styles.input}
            value={unit}
            onChangeText={setUnit}
            placeholder="Nhập đơn vị tính"
          />

          <Text style={styles.formLabel}>Giá</Text>
          <TextInput
            style={styles.input}
            value={price}
            onChangeText={setPrice}
            placeholder="Nhập giá (vd: 30000)"
            keyboardType="numeric"
          />

          <Text style={styles.formLabel}>Danh mục</Text>
          <View style={{ zIndex: 1000, marginTop: 4 }}>
            <DropDownPicker
              open={open}
              setOpen={setOpen}
              value={category}
              setValue={setCategory}
              items={categoryItems}
              setItems={setCategoryItems}
              placeholder="-- Chọn danh mục --"
              style={styles.dropdown}
              dropDownContainerStyle={styles.dropdownContainer}
            />
          </View>

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
  dropdown: {
    backgroundColor: Colors.white,
    borderColor: Colors.primary,
    borderWidth: 1,
    borderRadius: 6,
  },
  dropdownContainer: {
    backgroundColor: Colors.white,
    borderColor: Colors.primary,
    borderWidth: 1,
    borderRadius: 6,
    zIndex: 1000,
  },



});

export default ManageMenuScreen;
