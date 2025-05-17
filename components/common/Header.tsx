import { Ionicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React, { useRef } from 'react';
import { Animated, Dimensions, StyleSheet } from 'react-native';

import BillScreen from '../Bills/BillScreen';
import CartScreen from '../Cart/CartScreen';
import HomeScreen from '../Home/HomeScreen';
import MenuScreen from '../Menu/MenuScreen';
import OrderScreen from '../Order/OrderScreen';

const Tab = createBottomTabNavigator();
const SCREEN_WIDTH = Dimensions.get('window').width;

const TAB_WIDTH = SCREEN_WIDTH / 5; // 5 tab

export default function MyTabs() {
    const translateX = useRef(new Animated.Value(0)).current;

    // Hàm chạy animation underline trượt
    const animateIndicator = (index: number) => {
        Animated.spring(translateX, {
            toValue: index * TAB_WIDTH,
            useNativeDriver: true,
        }).start();
    };

    return (
        <>
            <Tab.Navigator
                screenOptions={({ route }) => ({
                    headerShown: false,
                    tabBarShowLabel: true,
                    tabBarActiveTintColor: '#FF6347',
                    tabBarInactiveTintColor: '#555',
                    tabBarStyle: styles.tabBar,
                    tabBarIcon: ({ focused, color, size }) => {
                        const icons: Record<string, { focused: string; unfocused: string }> = {
                            Home: { focused: 'home', unfocused: 'home-outline' },
                            Menu: { focused: 'restaurant', unfocused: 'restaurant-outline' },
                            Order: { focused: 'receipt', unfocused: 'receipt-outline' },
                            Bill: { focused: 'card', unfocused: 'card-outline' },
                            Cart: { focused: 'cart', unfocused: 'cart-outline' },
                        };

                        const iconName = focused
                            ? icons[route.name]?.focused
                            : icons[route.name]?.unfocused;

                        // TypeScript vẫn có thể nghi ngờ iconName là string | undefined
                        // Nên cần kiểm tra hoặc ép kiểu
                        if (!iconName) return null;

                        return <Ionicons name={iconName as any} size={size} color={color} />;
                    },
                })}
                // Khi tab thay đổi, chạy animation
                // index tương ứng với vị trí tab
                // Dùng onStateChange hoặc onTabPress có thể dùng, đây dùng onTabPress
                screenListeners={{
                    tabPress: e => {
                        const index = ['Home', 'Menu', 'Order', 'Bill', 'Cart'].indexOf(e.target?.split('-')[0] ?? '');
                        if (index >= 0) animateIndicator(index);
                    },
                }}
            >
                <Tab.Screen name="Home" component={HomeScreen} />
                <Tab.Screen name="Menu" component={MenuScreen} />
                <Tab.Screen name="Order" component={OrderScreen} />
                <Tab.Screen name="Bill" component={BillScreen} />
                <Tab.Screen name="Cart" component={CartScreen} />
            </Tab.Navigator>

            {/* Underline indicator */}
            <Animated.View
                style={[
                    styles.indicator,
                    {
                        width: TAB_WIDTH,
                        transform: [{ translateX }],
                    },
                ]}
            />
        </>
    );
}

const styles = StyleSheet.create({
    tabBar: {
        backgroundColor: '#FFF6DA',
        borderTopWidth: 1,
        borderTopColor: '#ddd',
        height: 60,
        paddingBottom: 8,
        elevation: 5,
        color: 'white'
    },
    indicator: {
        height: 3,
        backgroundColor: '#FF6347',
        position: 'absolute',
        bottom: 58, // ngay trên tab bar
        left: 0,
        borderRadius: 2,
    },
});
