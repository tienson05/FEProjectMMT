import API_URL from '@/config';
import Colors from '@/constants/Colors'; // Giả sử bạn có file màu
import React, { useState } from 'react';
import { Alert, Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

const EditDish = ({ route, navigation }) => {
    const { dish } = route.params;

    const [name, setName] = useState(dish.name);
    const [price, setPrice] = useState(String(dish.price));
    const [description, setDescription] = useState(dish.description || '');
    const [imageUrl, setImageUrl] = useState(dish.image_url || '');

    const handleSave = async () => {
        try {
            const updatedDish = {
                id: dish.id,
                name,
                price: parseFloat(price),
                description,
                image_url: imageUrl,
            };

            // Gửi dữ liệu lên server
            const response = await fetch(`${API_URL}/api/product/${dish.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedDish),
            });

            if (!response.ok) throw new Error('Cập nhật thất bại');
            Alert.alert('Thành công', 'Món ăn đã được cập nhật');
            navigation.navigate('PreviousScreenName', { updatedDish: updatedDish });
            navigation.goBack();
            route.params?.onGoBack && route.params.onGoBack(updatedDish);
        } catch (err) {
            Alert.alert('Lỗi', err.message);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Chỉnh sửa món ăn</Text>
            <Image source={{ uri: imageUrl }} style={styles.image} />
            <Text style={styles.label}>Tên món</Text>
            <TextInput
                style={styles.input}
                value={name}
                onChangeText={setName}
                placeholder="Nhập tên món"
                placeholderTextColor={Colors.accent}
            />
            <Text style={styles.label}>Giá (VNĐ)</Text>
            <TextInput
                style={styles.input}
                value={price}
                onChangeText={setPrice}
                placeholder="Nhập giá"
                keyboardType="numeric"
                placeholderTextColor={Colors.accent}
            />
            <Text style={styles.label}>Ảnh (URL)</Text>
            <TextInput
                style={styles.input}
                value={imageUrl}
                onChangeText={setImageUrl}
                placeholder="Nhập URL ảnh"
                placeholderTextColor={Colors.accent}
            />
            <TouchableOpacity style={styles.saveButton} onPress={handleSave} activeOpacity={0.8}>
                <Text style={styles.saveButtonText}>Lưu thay đổi</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: Colors.secondary,
    },
    header: {
        fontSize: 24,
        fontWeight: '700',
        color: Colors.dark,
        marginBottom: 20,
        textAlign: 'center',
    },
    image: {
        width: 120,
        height: 120,
        borderRadius: 15,
        alignSelf: 'center',
        marginBottom: 20,
        borderWidth: 2,
        borderColor: Colors.primary,
    },
    label: {
        color: Colors.accent,
        fontWeight: '600',
        marginBottom: 6,
    },
    input: {
        backgroundColor: Colors.white,
        borderColor: Colors.primary,
        borderWidth: 1.5,
        borderRadius: 10,
        paddingHorizontal: 12,
        paddingVertical: 8,
        marginBottom: 15,
        color: Colors.dark,
    },
    buttonContainer: {
        marginTop: 15,
        borderRadius: 10,
        overflow: 'hidden', // để button không bị bo tròn sai trên Android
    },
    saveButton: {
        backgroundColor: Colors.primary,
        paddingVertical: 14,
        borderRadius: 12,
        alignItems: 'center',
        marginTop: 15,
        shadowColor: Colors.dark,
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        elevation: 5, // dành cho Android shadow
    },
    saveButtonText: {
        color: Colors.white,
        fontWeight: '700',
        fontSize: 16,
    },
});

export default EditDish;