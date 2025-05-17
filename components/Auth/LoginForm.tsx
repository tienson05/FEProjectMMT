// LoginForm.tsx
import React, { useState } from 'react';
import { Alert, Button, StyleSheet, Text, TextInput, View } from 'react-native';

interface LoginFormProps {
    onLogin: (email: string, password: string) => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ onLogin }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = () => {
        if (!email || !password) {
            Alert.alert('Lỗi', 'Vui lòng nhập đủ email và mật khẩu');
            return;
        }
        onLogin(email, password);
    };

    return (
        <View style={styles.container}>
            <Text style={styles.label}>Email</Text>
            <TextInput
                style={styles.input}
                value={email}
                onChangeText={setEmail}
                placeholder="Nhập email"
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
            />

            <Text style={styles.label}>Mật khẩu</Text>
            <TextInput
                style={styles.input}
                value={password}
                onChangeText={setPassword}
                placeholder="Nhập mật khẩu"
                secureTextEntry
                autoCapitalize="none"
            />

            <Button title="Đăng nhập" onPress={handleSubmit} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginHorizontal: 20,
        marginTop: 50,
    },
    label: {
        fontWeight: '600',
        marginBottom: 8,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        paddingHorizontal: 12,
        paddingVertical: 8,
        borderRadius: 5,
        marginBottom: 16,
    },
});

export default LoginForm;
