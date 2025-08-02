import React from 'react';
import ProductCard from '../components/ProductCard';
import type { Product } from '../types/types';

const mockProducts: Product[] = [
    {
        id: 1,
        name: 'Produto 1',
        price: 99.99,
        description: 'Descrição do produto 1',
        image: 'https://via.placeholder.com/300',
    },
    {
        id: 2,
        name: 'Produto 2',
        price: 149.99,
        description: 'Descrição do produto 2',
        image: 'https://via.placeholder.com/300',
    },
    {
        id: 3,
        name: 'Produto 3',
        price: 199.99,
        description: 'Descrição do produto 3',
        image: 'https://via.placeholder.com/300',
    },
    {
        id: 4,
        name: 'Produto 4',
        price: 79.99,
        description: 'Descrição do produto 4',
        image: 'https://via.placeholder.com/300',
    },
];

interface HomeProps {
    onAddToCart: (product: Product) => void;
}

const Home: React.FC<HomeProps> = ({ onAddToCart }) => {
    return (
        <div className="container mx-auto py-8 px-4">
            <h2 className="text-2xl font-bold mb-8">Produtos em destaque</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {mockProducts.map((product) => (
                    <ProductCard
                        key={product.id}
                        product={product}
                        onAddToCart={onAddToCart}
                    />
                ))}
            </div>
        </div>
    );
};

export default Home;