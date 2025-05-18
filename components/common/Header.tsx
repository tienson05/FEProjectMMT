import { Ionicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React, { useRef } from 'react';
import { Animated, Dimensions, StyleSheet } from 'react-native';

import BillScreen from '../Bills/BillScreen';
import CartScreen from '../Cart/CartScreen';
import HomeScreen from '../Home/HomeScreen';
import ManageMenuScreen from '../ManageMenu/ManageMenuScreen';
import ManageUsersScreen from '../ManageUsers/ManageUsersScreen';
import MenuScreen from '../Menu/MenuScreen';
import OrderScreen from '../Order/OrderScreen';
import ProfileScreen from '../Profile/ProfileScreen';

const Tab = createBottomTabNavigator();
const SCREEN_WIDTH = Dimensions.get('window').width;

interface MyTabsProps {
    userRole: 'admin' | 'casher' | null;
}

export default function MyTabs({ userRole }: MyTabsProps) {
    const translateX = useRef(new Animated.Value(0)).current;

    // Hàm chạy animation underline trượt
    const animateIndicator = (index: number) => {
        Animated.spring(translateX, {
            toValue: index * (SCREEN_WIDTH / 5), // animate theo thứ tự hiển thị tab
            useNativeDriver: true,
        }).start();
    };

    // Danh sách tab tùy theo role
    const getTabs = () => {
        const tabs = [{ name: 'Home', component: HomeScreen }];

        if (userRole === 'casher') {
            tabs.push(
                { name: 'Menu', component: MenuScreen },
                { name: 'Order', component: OrderScreen },
                { name: 'Cart', component: CartScreen },
            );
        }

        if (userRole === 'admin') {
            tabs.push(
                { name: 'Bill', component: BillScreen },
                { name: 'ManageUsers', component: ManageUsersScreen },
                { name: 'ManageMenu', component: ManageMenuScreen },
            );
        }

        tabs.push({ name: 'Profile', component: ProfileScreen });

        return tabs;
    };

    const tabs = getTabs();

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
                            ManageMenu: { focused: 'restaurant', unfocused: 'restaurant-outline' },
                            ManageUsers: { focused: 'person', unfocused: 'person-outline' },
                            Profile: { focused: 'person-circle', unfocused: 'person-circle-outline' },
                        };

                        const icon = icons[route.name];
                        const iconName = icon ? (focused ? icon.focused : icon.unfocused) : 'help-circle-outline';

                        return <Ionicons name={iconName as any} size={size} color={color} />;
                    },
                })}
                screenListeners={{
                    tabPress: e => {
                        const routeName = e.target?.split('-')[0];
                        const index = tabs.findIndex(tab => tab.name === routeName);
                        if (index >= 0) animateIndicator(index);
                    },
                }}
            >
                {tabs.map(tab => (
                    <Tab.Screen key={tab.name} name={tab.name} component={tab.component} />
                ))}
            </Tab.Navigator>

            {/* Underline indicator */}
            <Animated.View
                style={[
                    styles.indicator,
                    {
                        width: SCREEN_WIDTH / 5,
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
    },
    indicator: {
        height: 3,
        backgroundColor: '#FF6347',
        position: 'absolute',
        bottom: 58,
        left: 0,
        borderRadius: 2,
    },
});
