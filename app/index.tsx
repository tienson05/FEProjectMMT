import React, { useState } from 'react';
import { StyleSheet } from 'react-native';


import AuthScreen from '@/components/Auth/AuthScreen';
import MyTabs from '@/components/common/Header';

export default function HomePage() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [role, setRole] = useState<'admin' | 'casher' | null>(null);

    const handleLoginSuccess = (userRole: 'admin' | 'casher') => {
        setRole(userRole);
        setIsLoggedIn(true);
    };

    return (
        isLoggedIn && role ? <MyTabs userRole={role} /> : <AuthScreen onLoginSuccess={handleLoginSuccess} />
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});
