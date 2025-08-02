import React from 'react';
import { FiShoppingCart } from 'react-icons/fi';
import Button from './generic/Button';

interface HeaderProps {
    cartItemCount: number;
    onCartClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ cartItemCount, onCartClick }) => {
    return (
        <header className="bg-white shadow-sm py-4 px-6 sticky top-0 z-10">
            <div className="container mx-auto flex justify-between items-center">
                <h1 className="text-2xl font-bold text-blue-600">E-commerce</h1>
                <Button
                    variant="secondary"
                    size="sm"
                    onClick={onCartClick}
                    className="relative"
                >
                    <FiShoppingCart className="inline mr-2" />
                    Carrinho
                    {cartItemCount > 0 && (
                        <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
              {cartItemCount}
            </span>
                    )}
                </Button>
            </div>
        </header>
    );
};

export default Header;