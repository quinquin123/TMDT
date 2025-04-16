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

function App() {
  return (
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
      </Routes>
    </BrowserRouter>
  );
}

export default App;