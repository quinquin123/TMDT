import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { AuthContext } from '../context/AuthContext';

// Dữ liệu mẫu
const categories = [
  { id: 1, name: 'Điện thoại', subcategories: ['iPhone', 'Samsung', 'Xiaomi', 'OPPO'] },
  { id: 2, name: 'Laptop', subcategories: ['Macbook', 'Dell', 'HP', 'Lenovo', 'Asus'] },
  { id: 3, name: 'Máy tính bảng', subcategories: ['iPad', 'Samsung Galaxy Tab', 'Xiaomi Pad'] },
  { id: 4, name: 'Tai nghe', subcategories: ['AirPods', 'Sony', 'JBL', 'Beats'] },
  { id: 5, name: 'Đồng hồ thông minh', subcategories: ['Apple Watch', 'Samsung Galaxy Watch', 'Xiaomi Watch'] },
];

const LoginPage = () => {
  const { setIsLoggedIn } = useContext(AuthContext);
  const [loginData, setLoginData] = useState({ email: '', password: '' });
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    if (loginData.email === 'nguyenvana@example.com' && loginData.password === '123456') {
      setIsLoggedIn(true);
      alert('Đăng nhập thành công!');
      navigate('/account');
    } else {
      alert('Email hoặc mật khẩu không đúng!');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header categories={categories} />

      <main className="container mx-auto px-4 py-8">
        <div className="flex items-center text-sm mb-6">
          <Link to="/" className="text-gray-500 hover:text-blue-600">
            Trang chủ
          </Link>
          <ChevronRight size={16} className="mx-2 text-gray-500" />
          <span className="text-gray-900 font-medium">Đăng nhập</span>
        </div>

        <h1 className="text-2xl font-bold mb-6">Đăng nhập</h1>

        <div className="bg-white rounded-lg shadow-sm p-6 max-w-md mx-auto">
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Email</label>
              <input
                type="email"
                value={loginData.email}
                onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Mật khẩu</label>
              <input
                type="password"
                value={loginData.password}
                onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <button type="submit" className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 w-full">
              Đăng nhập
            </button>
            <p className="text-sm text-center">
              Chưa có tài khoản?{' '}
              <Link to="/register" className="text-blue-600 hover:underline">Đăng ký ngay</Link>
            </p>
          </form>
        </div>
      </main>

      <Footer categories={categories} />
    </div>
  );
};

export default LoginPage;