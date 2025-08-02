import React from 'react';
import type {CartItem} from '../types/types';
import Button from './generic/Button';

interface SidebarCartProps {
    isOpen: boolean;
    onClose: () => void;
    cartItems: CartItem[];
    onRemoveItem: (productId: number) => void;
    onUpdateQuantity: (productId: number, quantity: number) => void;
    cartTotal: number;
    onCheckout: () => void;
}

const SidebarCart: React.FC<SidebarCartProps> = ({
                                                     isOpen,
                                                     onClose,
                                                     cartItems,
                                                     onRemoveItem,
                                                     onUpdateQuantity,
                                                     cartTotal,
                                                     onCheckout,
                                                 }) => {
    return (
        <div
            className={`fixed inset-0 z-50 overflow-hidden ${isOpen ? 'block' : 'hidden'}`}
        >
            <div className="absolute inset-0 bg-black bg-opacity-50" onClick={onClose}></div>
            <div className="absolute inset-y-0 right-0 max-w-full flex">
                <div className="relative w-screen max-w-md">
                    <div className="h-full flex flex-col bg-white shadow-xl">
                        <div className="flex-1 overflow-y-auto py-6 px-4 sm:px-6">
                            <div className="flex items-start justify-between">
                                <h2 className="text-lg font-medium text-gray-900">Carrinho de compras</h2>
                                <button
                                    type="button"
                                    className="text-gray-400 hover:text-gray-500"
                                    onClick={onClose}
                                >
                                    <span className="sr-only">Fechar</span>
                                    &times;
                                </button>
                            </div>

                            <div className="mt-8">
                                {cartItems.length === 0 ? (
                                    <p className="text-gray-500">Seu carrinho está vazio</p>
                                ) : (
                                    <div className="flow-root">
                                        <ul className="-my-6 divide-y divide-gray-200">
                                            {cartItems.map((item) => (
                                                <li key={item.id} className="py-6 flex">
                                                    <div className="flex-shrink-0 w-24 h-24 border border-gray-200 rounded-md overflow-hidden">
                                                        <img
                                                            src={item.image}
                                                            alt={item.name}
                                                            className="w-full h-full object-cover"
                                                        />
                                                    </div>

                                                    <div className="ml-4 flex-1 flex flex-col">
                                                        <div>
                                                            <div className="flex justify-between text-base font-medium text-gray-900">
                                                                <h3>{item.name}</h3>
                                                                <p className="ml-4">R${item.price.toFixed(2)}</p>
                                                            </div>
                                                        </div>
                                                        <div className="flex-1 flex items-end justify-between text-sm">
                                                            <div className="flex items-center">
                                                                <label htmlFor={`quantity-${item.id}`} className="mr-2">
                                                                    Qtd:
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

                                                            <div className="flex">
                                                                <button
                                                                    type="button"
                                                                    className="font-medium text-red-600 hover:text-red-500"
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
                                )}
                            </div>
                        </div>

                        {cartItems.length > 0 && (
                            <div className="border-t border-gray-200 py-6 px-4 sm:px-6">
                                <div className="flex justify-between text-base font-medium text-gray-900 mb-4">
                                    <p>Total</p>
                                    <p>R${cartTotal.toFixed(2)}</p>
                                </div>
                                <Button
                                    variant="primary"
                                    className="w-full"
                                    onClick={onCheckout}
                                >
                                    Finalizar compra
                                </Button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SidebarCart;