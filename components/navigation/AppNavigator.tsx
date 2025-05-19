// AppNavigator.tsx
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import BillDetail from '../Bills/BillDetail';
import MyTabs from '../common/Header';
import EditDish from '../ManageMenu/EditDish';
import ProductOrderScreen from '../Order/OrderScreen';

const Stack = createStackNavigator();

interface AppNavigatorProps {
    userRole: 'admin' | 'casher';
}

export default function AppNavigator({ userRole }: AppNavigatorProps) {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="MainTabs">
                {() => <MyTabs userRole={userRole} />}
            </Stack.Screen>
            <Stack.Screen name="OrderScreen" component={ProductOrderScreen} />
            <Stack.Screen name="Order" component={ProductOrderScreen} />
            <Stack.Screen name="EditDish" component={EditDish} />
            <Stack.Screen name="BillDetail" component={BillDetail} />
        </Stack.Navigator>
    );
}
