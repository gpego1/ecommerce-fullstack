import React from 'react';
import { FiShoppingCart } from 'react-icons/fi';
import Button from './generic/Button';
import { FaUserPlus } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';

interface HeaderProps {
    cartItemCount: number;
    onCartClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ cartItemCount, onCartClick }) => {
    const navigate = useNavigate();

    return (
        <header className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-4 px-6 sticky top-0 z-50 shadow-lg">
            <div className="container mx-auto flex justify-between items-center">
                <h1
                    className="text-3xl font-bold text-white hover:text-blue-200 cursor-pointer transition-colors duration-300"
                    onClick={() => navigate(`/`)}
                >
                    <span className="bg-white text-blue-600 px-2 py-1 rounded mr-1">Eletro</span>
                    Pronto
                </h1>

                <div className="flex items-center space-x-4">
                    {/* Botão de Cadastro */}
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => navigate(`/cadastro`)}
                        className="relative group flex items-center px-4 py-2 rounded-full hover:bg-white hover:text-blue-600 transition-colors duration-300 border border-white"
                    >
                        <FaUserPlus className="mr-2 group-hover:scale-110 transition-transform" />
                        <span className="font-medium">Cadastrar</span>
                    </Button>

                    {/* Botão do Carrinho */}
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={onCartClick}
                        className="relative group flex items-center px-4 py-2 rounded-full hover:bg-white hover:text-blue-600 transition-colors duration-300 border border-white"
                    >
                        <FiShoppingCart className="mr-2 group-hover:scale-110 transition-transform" />
                        <span className="font-medium">Carrinho</span>
                        {cartItemCount > 0 && (
                            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full h-6 w-6 flex items-center justify-center transform group-hover:scale-125 transition-transform">
                                {cartItemCount}
                            </span>
                        )}
                    </Button>
                </div>
            </div>
        </header>
    );
};

export default Header;