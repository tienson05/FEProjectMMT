import AuthScreen from '@/components/Auth/AuthScreen';
import MyTabs from '@/components/common/Header';
import React, { useState } from 'react';

export default function HomePage() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    return (
        isLoggedIn ? <MyTabs /> : <AuthScreen onLoginSuccess={() => setIsLoggedIn(true)} />
    );
}