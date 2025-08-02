import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/Home';
import CustomerRegistration from './pages/CustomerRegistration';
import CartPage from './pages/CartPage';
import { useCart } from './hooks/useCart';
import SidebarCart from "./components/SideBarCart.tsx";

function App() {
    const {
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        cartTotal,
        cartItemCount,
        isCartOpen,
        setIsCartOpen,
    } = useCart();

    return (
        <Router>
            <div className="min-h-screen bg-gray-100">
                <Header
                    cartItemCount={cartItemCount}
                    onCartClick={() => setIsCartOpen(true)}
                />

                <SidebarCart
                    isOpen={isCartOpen}
                    onClose={() => setIsCartOpen(false)}
                    cartItems={cartItems}
                    onRemoveItem={removeFromCart}
                    onUpdateQuantity={updateQuantity}
                    cartTotal={cartTotal}
                    onCheckout={() => {
                        setIsCartOpen(false);
                    }}
                />

                <main className="pb-12">
                    <Routes>
                        <Route
                            path="/"
                            element={<Home onAddToCart={addToCart} />}
                        />
                        <Route
                            path="/cadastro"
                            element={<CustomerRegistration />}
                        />
                        <Route
                            path="/carrinho"
                            element={
                                <CartPage
                                    cartItems={cartItems}
                                    onRemoveItem={removeFromCart}
                                    onUpdateQuantity={updateQuantity}
                                    cartTotal={cartTotal}
                                />
                            }
                        />
                    </Routes>
                </main>
            </div>
        </Router>
    );
}

export default App;