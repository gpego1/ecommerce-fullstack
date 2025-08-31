import React from 'react';
import type { Product } from '../types/types';
import Card from './generic/Card';
import Button from './generic/Button';

interface ProductCardProps {
    product: Product;
    onAddToCart: (product: Product) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onAddToCart }) => {
    return (
        <Card className="hover:shadow-lg transition-shadow">
            <img
                src={product.image}
                alt={product.name}
                className="w-full h-48 object-cover"
            />
            <div className="p-4">
                <h3 className="text-lg font-semibold mb-2">{product.name}</h3>
                <p className="text-gray-600 mb-4">{product.description}</p>
                <div className="flex justify-between items-center">
                    <span className="text-xl font-bold">R${product.price.toFixed(2)}</span>
                    <Button
                        variant="primary"
                        size="sm"
                        onClick={() => onAddToCart(product)}
                        className="cursor-pointer bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 px-4 rounded-lg transition-all duration-200 hover:shadow-md border-0 flex items-center gap-2 group"
                    >
                        <span className="group-hover:scale-110 transition-transform duration-200">🛒</span>
                        Adicionar
                    </Button>
                </div>
            </div>
        </Card>
    );
};

export default ProductCard;