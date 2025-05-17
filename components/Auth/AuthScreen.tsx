// AuthScreen.tsx
import React, { useState } from 'react';
import { ActivityIndicator, Alert, StyleSheet, Text, View } from 'react-native';
import LoginForm from './LoginForm';

interface AuthScreenProps {
    onLoginSuccess: () => void;
}

const AuthScreen: React.FC<AuthScreenProps> = ({ onLoginSuccess }) => {
    const [loading, setLoading] = useState(false);

    const handleLogin = (email: string, password: string) => {
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            if (email === 'user@example.com' && password === '123456') {
                Alert.alert('Thành công', 'Đăng nhập thành công!');
                onLoginSuccess(); // báo app đã đăng nhập
            } else {
                Alert.alert('Lỗi', 'Email hoặc mật khẩu không đúng');
            }
        }, 1500);
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

