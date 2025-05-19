import Colors from '@/constants/Colors';
import React, { useState } from 'react';
import { ActivityIndicator, Alert, StyleSheet, Text, View } from 'react-native';
import API_IP from '../../config';
import WelcomeBanner from '../Home/WelcomeBanner';
import LoginForm from './LoginForm';

interface UserInfo {
    id: string;
    name: string;
    role: 'admin' | 'casher';
    // thêm các trường khác nếu cần
}

interface AuthScreenProps {
    onLoginSuccess: (user: UserInfo) => void;
}

const AuthScreen: React.FC<AuthScreenProps> = ({ onLoginSuccess }) => {
    const [loading, setLoading] = useState(false);

    const handleLogin = async (email: string, password: string) => {
        setLoading(true);

        try {
            // Gọi API backend để đăng nhập, ví dụ POST /api/login
            const response = await fetch(`${API_IP}/api/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });
            if (!response.ok) {
                // Nếu lỗi, hiện thông báo
                Alert.alert('Đăng nhập thất bại', 'Email hoặc mật khẩu không đúng.');
                setLoading(false);
                return;
            }

            // Giả sử API trả về JSON có dạng: { role: 'admin' | 'casher', token: string, ... }
            const data = await response.json();

            // Lấy role từ dữ liệu trả về
            console.log(data.role_id)
            const role = data.role_id == 1 ? 'admin' : 'casher';
            console.log('role: ', role)
            // Gọi callback thông báo đăng nhập thành công với role
            onLoginSuccess({
                id: data.id,
                name: data.name,
                role: role,
            });
        } catch (error) {
            Alert.alert('Lỗi kết nối', 'Không thể kết nối đến máy chủ.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <View style={styles.container}>
                <WelcomeBanner />
                <Text style={styles.title}>Đăng nhập</Text>
                <LoginForm onLogin={handleLogin} />
                {loading && <ActivityIndicator size="large" color="#007AFF" style={styles.loading} />}
            </View>
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 0,
        paddingTop: 0,        // đảm bảo không có padding trên
        justifyContent: 'flex-start',  // đẩy nội dung lên trên
        backgroundColor: Colors.secondary,
    },
    title: {
        marginTop: 20,
        fontSize: 28,
        fontWeight: '700',
        color: Colors.primary,
        textAlign: 'center',
        marginBottom: 0,
    },
    loading: {
        marginTop: 20,
    },
});


export default AuthScreen;
