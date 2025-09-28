import React, { useState } from 'react';
import type { CartItem, Customer } from '../types/types';
import Button from '../components/generic/Button';
import { useNavigate } from 'react-router-dom';
import api from "../api";

const getAuthToken = (): string | null => {
    return localStorage.getItem('authToken');
}

//Async function para carregar os dados de usuario de acordo com o type Customer(usuario la no backend)
//
async function fetchUserId(): Promise<number>{
    const token = getAuthToken();

    if(!token) {
        throw new Error("The user doesn't exists or the has a Invalid Token JWT");
    }

    try {
        const response = await fetch(`${api}/users/me`,{
            method: 'GET',
            headers: {
                'Content-Type':'application/json',
                'Authorization': `Bearer ${token}`,
            },
        });
        console.log(token);
        if(!response.ok){
            const errorBody = await response.json().catch(() => ({}));
            const errorMessage = errorBody.message || "The token doesn't match with any user";
            throw new Error(`Fail to get user Deatils: ${errorMessage}`);
        }
        const data: Customer = await response.json();

        if(data.id === undefined || data.id === null){
            throw new Error("The API doesn't has the user with the informed token");
        }
        return data.id;
    } catch (e){
        console.log("Error to get user details ", e);
        throw new Error("Could not load the User Id");
    }
}

interface CartPageProps {
    cartItems: CartItem[];
    onRemoveItem: (productId: number) => void;
    onUpdateQuantity: (productId: number, quantity: number) => void;
    cartTotal: number;
    onClearCart: () => void;
}

const CartPage: React.FC<CartPageProps> = ({
                                               cartItems,
                                               onRemoveItem,
                                               onUpdateQuantity,
                                               cartTotal,
                                               onClearCart,
                                           }) => {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const createOrder = async () => {
        if(cartItems.length === 0) {
            setError("The cart got no items");
            return;
        }
        setIsLoading(true);
        setError(null);

        try {
            const currentUserId = await fetchUserId();
            const orderProducts = cartItems.map(item => ({
                productId: item.id,
                quantity: item.quantity,
            }));
            const orderPayload = {
                userId: currentUserId,
                products: orderProducts,
            };
            const token = localStorage.getItem('authToken');

            const response = await fetch(`${api}/orders`, {
                method:'POST',
                headers:{
                    'Content-Type':'application/json',
                    'Authorization':`Bearer ${token}`,
                },
                body: JSON.stringify(orderPayload),
            });
            //Tratamento da Response
            //
            if(!response.ok){
                const errorData = await response.json().catch(() => ({
                    message:'Unknowm Error'
                }));
                throw new Error(`Fail to create Order: ${errorData.message}`);
            }
            const newOrder = await response.json();

            onClearCart();

            navigate('/checkout');
        } catch(e) {
            const errorMessage = e instanceof Error ? e.message : 'An unexpected error happend';
            setError(errorMessage);
            console.error(e);
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <div className="container mx-auto py-8 px-4">
            <h2 className="text-2xl font-bold mb-8">Seu Carrinho</h2>

            {/* ⭐️ Exibe a mensagem de erro se houver */}
            {error && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4" role="alert">
                    <p className="font-bold">Erro</p>
                    <p className="text-sm">{error}</p>
                </div>
            )}

            {cartItems.length === 0 ? (
                <div className="text-center py-12">
                    <p className="text-gray-600 mb-4">Seu carrinho está vazio</p>
                    <Button variant="primary" onClick={() => navigate('/')}>
                        Continuar comprando
                    </Button>
                </div>
            ) : (
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Coluna 1: Itens do Carrinho (Mantida) */}
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

                    {/* Coluna 2: Resumo e Botão */}
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
                                // ⭐️ Desabilita durante o carregamento ou se o carrinho estiver vazio
                                disabled={isLoading || cartItems.length === 0}
                            >
                                {/* ⭐️ Texto dinâmico */}
                                {isLoading ? 'Processando Pedido...' : 'Finalizar compra'}
                            </Button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CartPage;