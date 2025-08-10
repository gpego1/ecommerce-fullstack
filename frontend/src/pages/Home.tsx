import React from 'react';
import ProductCard from '../components/ProductCard';
import type { Product } from '../types/types';

const mockProducts: Product[] = [
    {
        id: 1,
        name: 'Smart TV 4K 55"',
        price: 2499.99,
        description: 'TV inteligente com resolução 4K, HDR e sistema Android TV',
        image: 'https://m.media-amazon.com/images/I/81QWL6gbRBL._AC_SL1500_.jpg',
        category: 'Televisores'
    },
    {
        id: 2,
        name: 'Notebook Ultra Slim',
        price: 4299.99,
        description: 'Notebook i7 16GB RAM, SSD 512GB, tela Full HD 15.6"',
        image: 'https://m.media-amazon.com/images/I/71S8qt+K8hL._AC_SL1500_.jpg',
        category: 'Informática'
    },
    {
        id: 3,
        name: 'Smartphone Premium',
        price: 3599.99,
        description: 'Câmera tripla 48MP, 128GB armazenamento, tela AMOLED 6.5"',
        image: 'https://m.media-amazon.com/images/I/71GeYyJt1hL._AC_SL1500_.jpg',
        category: 'Celulares'
    },
    {
        id: 4,
        name: 'Fone Bluetooth',
        price: 499.99,
        description: 'Cancelamento de ruído, 30h bateria, à prova d\'água',
        image: 'https://m.media-amazon.com/images/I/61CqYq+xwNL._AC_SL1500_.jpg',
        category: 'Áudio'
    },
    {
        id: 5,
        name: 'Console de Games',
        price: 2899.99,
        description: 'Última geração, 1TB SSD, controle sem fio incluído',
        image: 'https://m.media-amazon.com/images/I/71H6J+2sXGL._AC_SL1500_.jpg',
        category: 'Games'
    },
    {
        id: 6,
        name: 'Câmera DSLR',
        price: 3199.99,
        description: '24.2MP, gravação 4K, kit com lente 18-55mm',
        image: 'https://m.media-amazon.com/images/I/81U00W9gHZL._AC_SL1500_.jpg',
        category: 'Fotografia'
    },
    {
        id: 7,
        name: 'Tablet 10"',
        price: 1299.99,
        description: 'Tela Full HD, 64GB, caneta stylus inclusa',
        image: 'https://m.media-amazon.com/images/I/61XDeaOrAoL._AC_SL1500_.jpg',
        category: 'Tablets'
    },
    {
        id: 8,
        name: 'Smartwatch Esportivo',
        price: 899.99,
        description: 'Monitor cardíaco, GPS, resistente à água',
        image: 'https://m.media-amazon.com/images/I/71Swqqe7XAL._AC_SL1500_.jpg',
        category: 'Wearables'
    }
];

interface HomeProps {
    onAddToCart: (product: Product) => void;
}

const Home: React.FC<HomeProps> = ({ onAddToCart }) => {
    return (
        <div className="bg-gray-50 min-h-screen">
            <div className="container mx-auto py-12 px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <h2 className="text-4xl font-extrabold text-gray-900 sm:text-5xl sm:tracking-tight lg:text-6xl">
                        Nossos Produtos
                    </h2>
                    <p className="mt-5 max-w-xl mx-auto text-xl text-gray-500">
                        Os melhores eletrônicos com as melhores condições
                    </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                    {mockProducts.map((product) => (
                        <ProductCard
                            key={product.id}
                            product={product}
                            onAddToCart={onAddToCart}
                            className="transform hover:-translate-y-2 transition-transform duration-300"
                        />
                    ))}
                </div>

                <div className="mt-16 text-center">
                    <button className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-300">
                        Ver mais produtos
                        <svg className="ml-3 -mr-1 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Home;