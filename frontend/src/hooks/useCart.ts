import { useState } from 'react';
import type { CartItem, Product } from '../types/types';

export const useCart = () => {
    const [cartItems, setCartItems] = useState<CartItem[]>([]);
    const [isCartOpen, setIsCartOpen] = useState(false);

    const addToCart = (product: Product)=> {
        setCartItems(prevItems => {
            const existingItem = prevItems.find(item => item.id === product.id);

            if(existingItem) {
                return prevItems.map(item =>
                item.id === product.id
                ? {...item, quantity: existingItem.quantity + 1}
                : item);
            }
            return [...prevItems, {...product, quantity:1}];
        });
    };

    const removeFromCart = (productId: number) => {
        setCartItems(prevItems => prevItems.filter(item => item.id !== productId))
    }

    const updateQuantity = (productId: number, quantity: number) => {
        if (quantity <= 0) {
            removeFromCart(productId);
            return;
        }
        setCartItems(prevItems =>
            prevItems.map(item =>
                item.id === productId ? {...item, quantity} : item
            )
        );
    };

    const cartTotal = cartItems.reduce((total, item) => total+ item.price * item.quantity, 0);

    const cartItemCount = cartItems.reduce((count, item) => count + item.quantity, 0);

    return {
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        cartTotal,
        cartItemCount,
        isCartOpen,
        setIsCartOpen,
    };
};