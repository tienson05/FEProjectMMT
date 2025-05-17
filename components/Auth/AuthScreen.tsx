import React, { useState } from 'react';
import { ActivityIndicator, Alert, StyleSheet, Text, View } from 'react-native';
import API_IP from '../../config';
import LoginForm from './LoginForm';

interface AuthScreenProps {
    onLoginSuccess: (role: 'admin' | 'casher') => void;
}

const AuthScreen: React.FC<AuthScreenProps> = ({ onLoginSuccess }) => {
    const [loading, setLoading] = useState(false);

    const handleLogin = async (email: string, password: string) => {
        setLoading(true);

        try {
            // Gọi API backend để đăng nhập, ví dụ POST /api/login
            console.warn("dda vao")
            const response = await fetch(`${API_IP}/api/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });
            console.log(response)
            if (!response.ok) {
                // Nếu lỗi, hiện thông báo
                Alert.alert('Đăng nhập thất bại', 'Email hoặc mật khẩu không đúng.');
                setLoading(false);
                return;
            }

            // Giả sử API trả về JSON có dạng: { role: 'admin' | 'casher', token: string, ... }
            const data = await response.json();

            // Lấy role từ dữ liệu trả về
            const role = data.role == 1 ? 'admin' : 'casher';
            console.log('role: ', role)
            // Gọi callback thông báo đăng nhập thành công với role
            onLoginSuccess(role);
        } catch (error) {
            Alert.alert('Lỗi kết nối', 'Không thể kết nối đến máy chủ.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Đăng nhập</Text>
            <LoginForm onLogin={handleLogin} />
            {loading && <ActivityIndicator size="large" color="#007AFF" style={styles.loading} />}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        justifyContent: 'center',
    },
    title: {
        fontSize: 26,
        fontWeight: '700',
        textAlign: 'center',
        marginBottom: 30,
    },
    loading: {
        marginTop: 20,
    },
});

export default AuthScreen;
