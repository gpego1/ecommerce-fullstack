import { Routes, Route } from 'react-router-dom'; // Remova BrowserRouter daqui
import Header from './components/Header';
import Home from './pages/Home';
import CustomerRegistration from './pages/CustomerRegistration';
import CartPage from './pages/CartPage';
import { useCart } from './hooks/useCart';
import SidebarCart from "./components/SideBarCart.tsx";
import Login from "./pages/LonginPage.tsx";
import { AuthProvider } from './contexts/AuthContext';
import  ProfilePage  from './pages/ProfilePage.tsx'

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
                <AuthProvider>
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
                            path="/login"
                            element={<Login />}
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
                        <Route
                            path="/profile"
                            element={<ProfilePage />}
                        />

                    </Routes>
                </AuthProvider>
            </main>
        </div>
    );
}

export default App;