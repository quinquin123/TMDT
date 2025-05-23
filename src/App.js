import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import SettingsPage from './pages/SettingsPage';
import DetailPage from './pages/DetailPage';
import DetailProduct from './pages/DetailProduct';
import CartPage from './pages/CartPage';
import CheckoutPage from './pages/CheckoutPage';
import OrderTrackingPage from './pages/OrderTrackingPage';
import PromotionsPage from './pages/PromotionsPage';
import StoreLocatorPage from './pages/StoreLocatorPage';
import UserAccountPage from './pages/UserAccountPage';
import NewProductPage from './pages/NewProductsPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import { AuthProvider } from './context/AuthContext';
import ContactPage from './pages/ContactPage';
import NewsPage from './pages/NewsPage';  
function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/settings" element={<SettingsPage />} />
          <Route path="/detail" element={<DetailPage />} />
          <Route path="/products/:id" element={<DetailProduct />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/orders" element={<OrderTrackingPage />} />
          <Route path="/promotions" element={<PromotionsPage />} />
          <Route path="/stores" element={<StoreLocatorPage />} />
          <Route path="/account" element={<UserAccountPage />} />
          <Route path="/NewProducts" element={<NewProductPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/news" element={<NewsPage />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;