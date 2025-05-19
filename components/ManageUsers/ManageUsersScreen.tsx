import API_URL from '@/config';
import { Ionicons } from '@expo/vector-icons';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Alert, FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Colors from '../../constants/Colors';
import WelcomeBanner from '../Home/WelcomeBanner';

interface Employee {
    id: string;
    name: string;
    role_id: number;
}

const ManageUsersScreen = () => {
    const [employees, setEmployees] = useState<Employee[]>([]);
    const [loading, setLoading] = useState(false);

    const fetchEmployees = async () => {
        setLoading(true);
        try {
            const response = await fetch(`${API_URL}/api/user`); // chỉnh đường dẫn nếu cần
            const data = await response.json();
            setEmployees(data);
        } catch (error) {
            Alert.alert('Lỗi', 'Không thể tải danh sách nhân viên.');
        } finally {
            setLoading(false);
        }
    };
    const handleUpdate = (id: string) => {
        Alert.alert("Hiện tại tính năng này chưa cần thiết")

    }

    const handleDelete = (id: string) => {
        Alert.alert('Xác nhận', 'Bạn có chắc chắn muốn xóa nhân viên này?', [
            { text: 'Hủy' },
            {
                text: 'Xóa',
                style: 'destructive',
                onPress: async () => {
                    try {
                        const res = await fetch(`${API_URL}/api/user/${id}`, { method: 'DELETE' });
                        if (res.ok) {
                            setEmployees(prev => prev.filter(emp => emp.id !== id));
                        } else {
                            throw new Error();
                        }
                    } catch {
                        Alert.alert('Lỗi', 'Xóa thất bại.');
                    }
                },
            },
        ]);
    };

    useEffect(() => {
        fetchEmployees();
    }, []);

    const renderItem = ({ item }: { item: Employee }) => (
        <View style={styles.card}>
            <View style={{ flex: 1 }}>
                <Text style={styles.name}>{item.name}</Text>
                <Text style={styles.role}>{item.role_id === 1 ? 'Quản trị viên' : 'Thu ngân'}</Text>
                <Text style={styles.id}>Mã NV: {item.id}</Text>
            </View>
            <View style={styles.actions}>
                <TouchableOpacity onPress={() => handleUpdate(item.id)}>
                    <Ionicons name="create-outline" size={22} color={Colors.primary} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => handleDelete(item.id)} style={{ marginLeft: 12 }}>
                    <Ionicons name="trash-outline" size={22} color={Colors.accent} />
                </TouchableOpacity>
            </View>
        </View>
    );

    return (
        <View style={styles.container}>
            <WelcomeBanner />
            <Text style={styles.title}>Quản lý nhân viên</Text>
            {loading ? (
                <ActivityIndicator size="large" color={Colors.primary} />
            ) : (
                <FlatList
                    data={employees}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={renderItem}
                    contentContainerStyle={{ paddingBottom: 20 }}
                />
            )}
        </View>
    );
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.secondary,
        padding: 16,
    },
    title: {
        marginTop: 10,
        fontSize: 24,
        fontWeight: '700',
        color: Colors.primary,
        marginBottom: 16,
        textAlign: 'center',
    },
    card: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: Colors.white,
        borderRadius: 12,
        padding: 16,
        marginBottom: 12,
        shadowColor: Colors.black,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.08,
        shadowRadius: 4,
        elevation: 3,
    },
    name: {
        fontSize: 18,
        fontWeight: 'bold',
        color: Colors.primary,
    },
    role: {
        fontSize: 14,
        color: Colors.dark,
        marginTop: 4,
    },
    id: {
        fontSize: 12,
        color: Colors.accent,
        marginTop: 4,
    },
    actions: {
        flexDirection: 'row',
        alignItems: 'center',
    },
});


export default ManageUsersScreen;
