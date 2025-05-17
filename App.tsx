// App.tsx
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React, { useState } from 'react';
import { View } from 'react-native';

import MyTabs from './components/common/Header'; // sửa đường dẫn nếu cần

const Stack = createNativeStackNavigator();

export default function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    return (
        <NavigationContainer>
            <View style={{ flex: 1 }}>
                <MyTabs />
            </View>
        </NavigationContainer>
    );
}
