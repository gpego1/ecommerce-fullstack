import React from 'react';
import ProductCard from '../components/ProductCard';
import type { Product } from '../types/types';

const mockProducts: Product[] = [
    {
        id: 1,
        name: 'Produto 1',
        price: 99.99,
        description: 'Descrição do produto 1',
        image: 'https://m.media-amazon.com/images/I/51JNhjr4McL._AC_SL1500_.jpg',
    },
    {
        id: 2,
        name: 'Produto 2',
        price: 149.99,
        description: 'Descrição do produto 2',
        image: 'https://th.bing.com/th/id/R.7997bbb82c3365f595073806db0741e2?rik=Kf%2b57PX41XWOaQ&riu=http%3a%2f%2fg-ecx.images-amazon.com%2fimages%2fG%2f01%2fSAMF9%2fTV%2f2012%2fAPLUS_Content%2fEH5300_SmartTV._V148036906_.jpg&ehk=pmvY2SL%2f%2fD1VCX7yDGAnnP638sQm3Tu1GuasNc7HypE%3d&risl=&pid=ImgRaw&r=0',
    },
    {
        id: 3,
        name: 'Produto 3',
        price: 199.99,
        description: 'Descrição do produto 3',
        image: 'https://tse2.mm.bing.net/th/id/OIP.iirMVAkix0PPv5cZEY2x4AHaHa?r=0&cb=thfc1&rs=1&pid=ImgDetMain&o=7&rm=3',
    },
    {
        id: 4,
        name: 'Produto 4',
        price: 79.99,
        description: 'Descrição do produto 4',
        image: 'https://tse1.mm.bing.net/th/id/OIP.T58LP3wivYFLP31tyDZX9AHaHa?r=0&cb=thfc1&rs=1&pid=ImgDetMain&o=7&rm=3',
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