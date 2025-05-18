import API_URL from '@/config';
import React, { useEffect, useState } from 'react';
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
import CategoryList from '../Menu/CategoryList';

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
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState<string | null>(null);
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

  useEffect(() => {
    fetchCategoriesWithProducts();
  }, []);

  useEffect(() => {
    // Cập nhật danh sách items cho DropDown khi categories thay đổi
    const items = categories.map((cat) => ({
      label: cat.name,
      value: cat.name,
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
      price,
      description,
      image:
        image ||
        'https://congcaphe.com/wp-content/uploads/2023/04/cfden-247x296.jpg',
      category_id: category, // hoặc category_id nếu bạn dùng ID
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

          <Text style={styles.formLabel}>Giá</Text>
          <TextInput
            style={styles.input}
            value={price}
            onChangeText={setPrice}
            placeholder="Nhập giá (vd: 30000đ)"
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
