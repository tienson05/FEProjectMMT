// CartContext.tsx (ví dụ đơn giản)
import React, { createContext, useState } from 'react';

export const CartContext = createContext(null);

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState([]);

    const addItemToCart = (item, quantity) => {
        setCart(prev => {
            const index = prev.findIndex(i => i.id === item.id);
            if (index >= 0) {
                const updated = [...prev];
                updated[index].quantity += quantity;
                return updated;
            }
            return [...prev, { ...item, quantity }];
        });
    };

    const updateQuantity = (id, newQty) => {
        setCart(prev => prev.map(item => item.id === id ? { ...item, quantity: newQty } : item));
    };

    const removeItem = (id: number) => {
        setCart(prev => prev.filter(item => item.id !== id));
    };
    const clearCart = () => setCart([]);

    return (
        <CartContext.Provider value={{ cart, addItemToCart, updateQuantity, removeItem, clearCart }}>
            {children}
        </CartContext.Provider>
    );
};
