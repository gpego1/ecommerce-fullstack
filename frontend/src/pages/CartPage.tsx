import React from 'react';
import type { CartItem } from '../types/types';
import Button from '../components/generic/Button';
import { useNavigate } from 'react-router-dom';

interface CartPageProps {
    cartItems: CartItem[];
    onRemoveItem: (productId: number) => void;
    onUpdateQuantity: (productId: number, quantity: number) => void;
    cartTotal: number;
}

const CartPage: React.FC<CartPageProps> = ({
                                               cartItems,
                                               onRemoveItem,
                                               onUpdateQuantity,
                                               cartTotal,
                                           }) => {
    const navigate = useNavigate();

    const handleCheckout = () => {
        navigate('/checkout'); // Você pode criar uma página de checkout posteriormente
    };

    return (
        <div className="container mx-auto py-8 px-4">
            <h2 className="text-2xl font-bold mb-8">Seu Carrinho</h2>

            {cartItems.length === 0 ? (
                <div className="text-center py-12">
                    <p className="text-gray-600 mb-4">Seu carrinho está vazio</p>
                    <Button variant="primary" onClick={() => navigate('/')}>
                        Continuar comprando
                    </Button>
                </div>
            ) : (
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2">
                        <div className="bg-white shadow rounded-lg overflow-hidden">
                            <ul className="divide-y divide-gray-200">
                                {cartItems.map((item) => (
                                    <li key={item.id} className="p-4">
                                        <div className="flex items-center">
                                            <div className="flex-shrink-0 h-20 w-20">
                                                <img
                                                    className="h-full w-full object-cover rounded"
                                                    src={item.image}
                                                    alt={item.name}
                                                />
                                            </div>
                                            <div className="ml-4 flex-1">
                                                <div className="flex justify-between">
                                                    <h3 className="text-lg font-medium">{item.name}</h3>
                                                    <p className="ml-4 font-medium">R${item.price.toFixed(2)}</p>
                                                </div>
                                                <div className="mt-2 flex justify-between items-center">
                                                    <div className="flex items-center">
                                                        <label htmlFor={`quantity-${item.id}`} className="mr-2">
                                                            Quantidade:
                                                        </label>
                                                        <input
                                                            type="number"
                                                            id={`quantity-${item.id}`}
                                                            min="1"
                                                            value={item.quantity}
                                                            onChange={(e) =>
                                                                onUpdateQuantity(item.id, parseInt(e.target.value) || 1)
                                                            }
                                                            className="w-16 border rounded px-2 py-1"
                                                        />
                                                    </div>
                                                    <button
                                                        type="button"
                                                        className="text-red-600 hover:text-red-500"
                                                        onClick={() => onRemoveItem(item.id)}
                                                    >
                                                        Remover
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    <div>
                        <div className="bg-white shadow rounded-lg p-6">
                            <h3 className="text-lg font-medium mb-4">Resumo do pedido</h3>
                            <div className="space-y-4">
                                <div className="flex justify-between">
                                    <span>Subtotal</span>
                                    <span>R${cartTotal.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span>Frete</span>
                                    <span>Grátis</span>
                                </div>
                                <div className="border-t border-gray-200 pt-4">
                                    <div className="flex justify-between font-medium">
                                        <span>Total</span>
                                        <span>R${cartTotal.toFixed(2)}</span>
                                    </div>
                                </div>
                            </div>
                            <Button
                                variant="primary"
                                className="w-full mt-6"
                                onClick={handleCheckout}
                            >
                                Finalizar compra
                            </Button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CartPage;