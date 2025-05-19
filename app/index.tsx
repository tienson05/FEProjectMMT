import React from 'react';
import { StyleSheet } from 'react-native';

import AuthScreen from '@/components/Auth/AuthScreen';
import { CartProvider } from '@/components/Cart/CartContext';
import { UserProvider, useUser } from '@/components/Profile/UserContext';
import AppNavigator from '../components/navigation/AppNavigator';

export default function HomePage() {
    return (
        <UserProvider>
            <CartProvider>
                <MainApp />
            </CartProvider>
        </UserProvider>
    );
}

function MainApp() {
    const { user, login } = useUser();

    const handleLoginSuccess = (userInfo: { id: string; role: 'admin' | 'casher'; name: string }) => {
        login(userInfo); // từ UserContext
    };


    return user
        ? <AppNavigator userRole={user.role} />
        : <AuthScreen onLoginSuccess={handleLoginSuccess} />;
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});
