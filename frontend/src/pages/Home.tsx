import React from 'react';
import ProductCard from '../components/ProductCard';
import type { Product } from '../types/types';

const mockProducts: Product[] = [
    {
        id: 1,
        name: 'Smart TV 4K 55"',
        price: 2499.99,
        description: 'TV inteligente com resolução 4K, HDR e sistema Android TV',
        image: 'https://a-static.mlcdn.com.br/1500x1500/smart-tv-55-crystal-4k-samsung-55au8000-wi-fi-bluetooth-hdr-alexa-built-in-3-hdmi-2-usb/magazineluiza/193441900/7fabc39533e941e2c669887a003e6a4f.jpg',
        category: 'Televisores'
    },
    {
        id: 2,
        name: 'Notebook Ultra Slim',
        price: 4299.99,
        description: 'Notebook i7 16GB RAM, SSD 512GB, tela Full HD 15.6"',
        image: 'https://thf.bing.com/th/id/OIP.iirMVAkix0PPv5cZEY2x4AHaHa?r=0&o=7&cb=thfc1rm=3&rs=1&pid=ImgDetMain&o=7&rm=3',
        category: 'Informática'
    },
    {
        id: 3,
        name: 'Smartphone Premium',
        price: 3599.99,
        description: 'Câmera tripla 48MP, 128GB armazenamento, tela AMOLED 6.5"',
        image: 'https://tse1.mm.bing.net/th/id/OIP.GBjrxZcWPyb5nW6_tPUqkwHaEK?r=0&cb=thfc1&rs=1&pid=ImgDetMain&o=7&rm=3',
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
        image: 'https://www.nme.com/wp-content/uploads/2020/07/Xbox-Series-X.jpg',
        category: 'Games'
    },
    {
        id: 6,
        name: 'Câmera DSLR',
        price: 3199.99,
        description: '24.2MP, gravação 4K, kit com lente 18-55mm',
        image: 'https://www.bestreviewguide.com/images/category/DSLR%20Cameras%20-%20What%20To%20Look%20For.jpeg',
        category: 'Fotografia'
    },
    {
        id: 7,
        name: 'Tablet 10"',
        price: 1299.99,
        description: 'Tela Full HD, 64GB, caneta stylus inclusa',
        image: 'data:image/webp;base64,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',
        category: 'Tablets'
    },
    {
        id: 8,
        name: 'Smartwatch Esportivo',
        price: 899.99,
        description: 'Monitor cardíaco, GPS, resistente à água',
        image: 'https://tse4.mm.bing.net/th/id/OIP.kXhahrvCly_UfEqaeTSfkwHaHa?r=0&cb=thfc1&rs=1&pid=ImgDetMain&o=7&rm=3',
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