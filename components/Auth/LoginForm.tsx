// LoginForm.tsx
import Colors from '@/constants/Colors';
import React, { useState } from 'react';
import { Alert, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

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
                placeholderTextColor={Colors.dark}
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
                placeholderTextColor={Colors.dark}
                secureTextEntry
                autoCapitalize="none"
            />

            <TouchableOpacity style={styles.button} onPress={handleSubmit}>
                <Text style={styles.buttonText}>Đăng nhập</Text>
            </TouchableOpacity>
        </View>
    );

};

const styles = StyleSheet.create({
    container: {
        paddingLeft: 20,
        paddingRight: 20,
        backgroundColor: Colors.secondary,
        justifyContent: 'center',
    },
    label: {
        fontSize: 14,
        color: Colors.dark,
        marginBottom: 6,
        marginTop: 12,
        fontWeight: '500',
    },
    input: {
        height: 48,
        borderWidth: 1,
        borderColor: Colors.accent,
        borderRadius: 8,
        paddingHorizontal: 12,
        backgroundColor: Colors.white,
        color: Colors.black,
        fontSize: 15,
    },
    button: {
        marginTop: 24,
        backgroundColor: Colors.primary,
        paddingVertical: 14,
        borderRadius: 8,
        alignItems: 'center',
        shadowColor: Colors.black,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 3,
    },
    buttonText: {
        color: Colors.white,
        fontWeight: 'bold',
        fontSize: 16,
    },
});

export default LoginForm;
