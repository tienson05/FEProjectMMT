import React, { useState } from 'react';
import {
    Alert,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity
} from 'react-native';
import Colors from '../../constants/Colors';

const MenuForm = ({ onAddDish }: any) => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState('');
  const [category, setCategory] = useState('');

  const handleSubmit = () => {
    if (!name || !price || !category) {
      Alert.alert('Vui lòng nhập đầy đủ thông tin');
      return;
    }

    const newDish = {
      id: Math.random().toString(),
      name,
      price: parseFloat(price),
      description,
      image,
      category,
    };

    onAddDish(newDish);

    setName('');
    setPrice('');
    setDescription('');
    setImage('');
    setCategory('');
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.label}>Tên món</Text>
      <TextInput
        style={styles.input}
        placeholder="VD: Trà sữa thạch"
        value={name}
        onChangeText={setName}
      />

      <Text style={styles.label}>Giá</Text>
      <TextInput
        style={styles.input}
        placeholder="VD: 29000"
        value={price}
        onChangeText={setPrice}
        keyboardType="numeric"
      />

      <Text style={styles.label}>Mô tả</Text>
      <TextInput
        style={[styles.input, { height: 80 }]}
        placeholder="VD: Ngọt nhẹ, topping thạch trái cây"
        value={description}
        onChangeText={setDescription}
        multiline
      />

      <Text style={styles.label}>Link ảnh</Text>
      <TextInput
        style={styles.input}
        placeholder="https://link-to-image.jpg"
        value={image}
        onChangeText={setImage}
      />

      <Text style={styles.label}>Danh mục</Text>
      <TextInput
        style={styles.input}
        placeholder="VD: Đồ uống"
        value={category}
        onChangeText={setCategory}
      />

      <TouchableOpacity onPress={handleSubmit} style={styles.button}>
        <Text style={styles.buttonText}>➕ Thêm món</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: Colors.white,
  },
  label: {
    fontWeight: 'bold',
    color: Colors.primary,
    marginTop: 12,
  },
  input: {
    borderWidth: 1,
    borderColor: Colors.secondary,
    borderRadius: 8,
    padding: 10,
    backgroundColor: '#fff',
    marginTop: 6,
  },
  button: {
    backgroundColor: Colors.primary,
    marginTop: 20,
    padding: 14,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: Colors.white,
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default MenuForm;
