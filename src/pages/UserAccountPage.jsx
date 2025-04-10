import React, { useState } from 'react';
import { Search, ShoppingCart, Menu, X, Heart, User, ChevronDown, ChevronRight, Trash2 } from 'lucide-react';

// Dữ liệu mẫu
const mockUser = {
  name: 'Nguyễn Văn A',
  email: 'nguyenvana@example.com',
  phone: '0909123456',
};

const mockOrders = [
  { id: 'DH123456', date: '2025-04-08', total: 46980000, status: 'Chờ xử lý', items: [{ name: 'iPhone 15 Pro Max', price: 32990000, quantity: 1 }, { name: 'Sony WH-1000XM5', price: 13990000, quantity: 1 }] },
  { id: 'DH789101', date: '2025-04-07', total: 36990000, status: 'Thành công', items: [{ name: 'MacBook Pro M3', price: 36990000, quantity: 1 }] },
  { id: 'DH456789', date: '2025-04-06', total: 32990000, status: 'Đang giao hàng', items: [{ name: 'iPhone 15 Pro Max', price: 32990000, quantity: 1 }] },
];

const mockFavorites = [
  { id: 1, name: 'iPhone 15 Pro Max', price: 32990000, image: '/api/placeholder/100/100' },
  { id: 2, name: 'MacBook Pro M3', price: 36990000, image: '/api/placeholder/100/100' },
];

const categories = [
  { id: 1, name: 'Điện thoại', subcategories: ['iPhone', 'Samsung', 'Xiaomi', 'OPPO'] },
  { id: 2, name: 'Laptop', subcategories: ['Macbook', 'Dell', 'HP', 'Lenovo', 'Asus'] },
  { id: 3, name: 'Máy tính bảng', subcategories: ['iPad', 'Samsung Galaxy Tab', 'Xiaomi Pad'] },
  { id: 4, name: 'Tai nghe', subcategories: ['AirPods', 'Sony', 'JBL', 'Beats'] },
  { id: 5, name: 'Đồng hồ thông minh', subcategories: ['Apple Watch', 'Samsung Galaxy Watch', 'Xiaomi Watch'] },
];

export default function UserAccountPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [hoveredCategory, setHoveredCategory] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Ban đầu chưa đăng nhập
  const [activeTab, setActiveTab] = useState('login'); // Mặc định là tab đăng nhập
  const [orderTab, setOrderTab] = useState('Tất cả');
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [userInfo, setUserInfo] = useState(mockUser);
  const [favorites, setFavorites] = useState(mockFavorites);
  const [orders, setOrders] = useState(mockOrders);
  const [loginData, setLoginData] = useState({ email: '', password: '' });
  const [registerData, setRegisterData] = useState({ name: '', email: '', phone: '', password: '', confirmPassword: '' });

  const formatPrice = (price) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND', maximumFractionDigits: 0 }).format(price);
  };

  const handleLogin = (e) => {
    e.preventDefault();
    // Logic giả lập đăng nhập
    if (loginData.email === 'nguyenvana@example.com' && loginData.password === '123456') {
      setIsLoggedIn(true);
      setActiveTab('profile');
      alert('Đăng nhập thành công!');
    } else {
      alert('Email hoặc mật khẩu không đúng!');
    }
  };

  const handleRegister = (e) => {
    e.preventDefault();
    if (registerData.password !== registerData.confirmPassword) {
      alert('Mật khẩu xác nhận không khớp!');
      return;
    }
    // Logic giả lập đăng ký
    setUserInfo({ name: registerData.name, email: registerData.email, phone: registerData.phone });
    setIsLoggedIn(true);
    setActiveTab('profile');
    alert('Đăng ký thành công!');
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setActiveTab('login');
  };

  const handleUpdateProfile = (e) => {
    e.preventDefault();
    alert('Thông tin đã được cập nhật');
  };

  const removeFavorite = (id) => {
    setFavorites(favorites.filter((item) => item.id !== id));
  };

  const handleCancelOrder = (orderId) => {
    if (window.confirm('Bạn có chắc muốn hủy đơn hàng này không?')) {
      setOrders(orders.map(order => 
        order.id === orderId ? { ...order, status: 'Đã hủy' } : order
      ));
      setSelectedOrder(null);
      alert('Đơn hàng đã được hủy thành công');
    }
  };

  const orderTabs = ['Tất cả', 'Chờ xử lý', 'Đã xác nhận', 'Đang chuyển hàng', 'Đang giao hàng', 'Đã hủy', 'Thành công'];
  const filteredOrders = orderTab === 'Tất cả' ? orders : orders.filter(order => order.status === orderTab);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top bar */}
      <div className="bg-gray-900 text-white py-2">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <div className="text-sm">
            <span className="mr-4">Hotline: 1800 1234</span>
            <span>Email: support@electroshop.com</span>
          </div>
          <div className="text-sm">
            <a href="/track-order" className="mr-4 hover:underline">Tra cứu đơn hàng</a>
            <a href="/stores" className="hover:underline">Hệ thống cửa hàng</a>
          </div>
        </div>
      </div>

      {/* Header */}
      <header className="bg-white shadow-md sticky top-0 z-30">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between py-4">
            <div className="flex items-center">
              <button className="mr-2 md:hidden" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
                {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
              <h1 className="text-2xl font-bold text-blue-600">ElectroShop</h1>
            </div>
            <div className="hidden md:flex flex-grow mx-8 relative">
              <input type="text" placeholder="Tìm kiếm sản phẩm..." className="w-full py-2 px-4 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
              <button className="bg-blue-600 text-white p-2 rounded-r-md hover:bg-blue-700">
                <Search size={20} />
              </button>
            </div>
            <div className="flex items-center space-x-4">
              <a href="/account" className="flex items-center text-blue-600">
                <User size={20} className="mr-1" /><span>Tài khoản</span>
              </a>
              <a href="#" className="hidden md:flex items-center text-gray-700 hover:text-blue-600">
                <Heart size={20} className="mr-1" /><span>Yêu thích</span>
              </a>
              <a href="/cart" className="flex items-center text-blue-600 relative">
                <ShoppingCart size={20} className="mr-1" /><span className="hidden md:inline">Giỏ hàng</span>
              </a>
            </div>
          </div>
          <div className="md:hidden pb-4">
            <div className="flex relative">
              <input type="text" placeholder="Tìm kiếm sản phẩm..." className="w-full py-2 px-4 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
              <button className="bg-blue-600 text-white p-2 rounded-r-md hover:bg-blue-700">
                <Search size={20} />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-black bg-opacity-50" onClick={() => setMobileMenuOpen(false)}>
          <div className="fixed inset-y-0 left-0 max-w-xs w-full bg-white shadow-xl p-4 z-50" onClick={e => e.stopPropagation()}>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Menu</h2>
              <button onClick={() => setMobileMenuOpen(false)}><X size={24} /></button>
            </div>
            <div className="space-y-1">
              {categories.map(category => (
                <a key={category.id} href="#" className="block py-2 px-3 text-gray-700 hover:bg-gray-100 rounded-md">{category.name}</a>
              ))}
              <a href="/account" className="block py-2 px-3 text-gray-700 hover:bg-gray-100 rounded-md">Tài khoản</a>
            </div>
          </div>
        </div>
      )}

      {/* Navigation */}
      <nav className="bg-white shadow-sm">
        <div className="container mx-auto px-4">
          <div className="hidden md:flex items-center space-x-8 py-3">
            {categories.map((category) => (
              <div key={category.id} className="relative group" onMouseEnter={() => setHoveredCategory(category.id)} onMouseLeave={() => setHoveredCategory(null)}>
                <a href="#" className="text-gray-700 hover:text-blue-600 flex items-center">
                  {category.name} <ChevronDown size={16} className="ml-1" />
                </a>
                {hoveredCategory === category.id && (
                  <div className="absolute left-0 mt-2 bg-white border shadow-md rounded-md py-2 z-20 w-48">
                    {category.subcategories.map((sub, idx) => (
                      <a key={idx} href="#" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">{sub}</a>
                    ))}
                  </div>
                )}
              </div>
            ))}
            <a href="/promotions" className="text-gray-700 hover:text-blue-600 flex items-center">Khuyến mãi HOT</a>
          </div>
        </div>
      </nav>

      {/* Main content */}
      <main className="container mx-auto px-4 py-8">
        <div className="flex items-center text-sm mb-6">
          <a href="#" className="text-gray-500 hover:text-blue-600">Trang chủ</a>
          <ChevronRight size={16} className="mx-2 text-gray-500" />
          <span className="text-gray-900 font-medium">Tài khoản</span>
        </div>

        <h1 className="text-2xl font-bold mb-6">Tài khoản của bạn</h1>

        <div className="flex flex-col lg:flex-row gap-6">
          <div className="lg:w-1/4">
            <div className="bg-white rounded-lg shadow-sm p-4">
              {isLoggedIn ? (
                <>
                  <div className="mb-4">
                    <p className="font-medium">{userInfo.name}</p>
                    <p className="text-sm text-gray-600">{userInfo.email}</p>
                  </div>
                  <nav className="space-y-2">
                    <button onClick={() => setActiveTab('profile')} className={`w-full text-left py-2 px-4 rounded-md ${activeTab === 'profile' ? 'bg-blue-100 text-blue-600' : 'hover:bg-gray-100'}`}>Thông tin cá nhân</button>
                    <button onClick={() => setActiveTab('orders')} className={`w-full text-left py-2 px-4 rounded-md ${activeTab === 'orders' ? 'bg-blue-100 text-blue-600' : 'hover:bg-gray-100'}`}>Lịch sử đơn hàng</button>
                    <button onClick={() => setActiveTab('favorites')} className={`w-full text-left py-2 px-4 rounded-md ${activeTab === 'favorites' ? 'bg-blue-100 text-blue-600' : 'hover:bg-gray-100'}`}>Sản phẩm yêu thích</button>
                    <button onClick={handleLogout} className="w-full text-left py-2 px-4 rounded-md text-red-600 hover:bg-red-100">Đăng xuất</button>
                  </nav>
                </>
              ) : (
                <nav className="space-y-2">
                  <button onClick={() => setActiveTab('login')} className={`w-full text-left py-2 px-4 rounded-md ${activeTab === 'login' ? 'bg-blue-100 text-blue-600' : 'hover:bg-gray-100'}`}>Đăng nhập</button>
                  <button onClick={() => setActiveTab('register')} className={`w-full text-left py-2 px-4 rounded-md ${activeTab === 'register' ? 'bg-blue-100 text-blue-600' : 'hover:bg-gray-100'}`}>Đăng ký</button>
                </nav>
              )}
            </div>
          </div>

          <div className="lg:w-3/4">
            <div className="bg-white rounded-lg shadow-sm p-6">
              {!isLoggedIn && activeTab === 'login' && (
                <form onSubmit={handleLogin} className="space-y-4 max-w-md mx-auto">
                  <h2 className="text-xl font-semibold mb-4">Đăng nhập</h2>
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
                  <button type="submit" className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 w-full">Đăng nhập</button>
                  <p className="text-sm text-center">
                    Chưa có tài khoản?{' '}
                    <button onClick={() => setActiveTab('register')} className="text-blue-600 hover:underline">Đăng ký ngay</button>
                  </p>
                </form>
              )}
              {!isLoggedIn && activeTab === 'register' && (
                <form onSubmit={handleRegister} className="space-y-4 max-w-md mx-auto">
                  <h2 className="text-xl font-semibold mb-4">Đăng ký</h2>
                  <div>
                    <label className="block text-sm font-medium mb-1">Họ và tên</label>
                    <input
                      type="text"
                      value={registerData.name}
                      onChange={(e) => setRegisterData({ ...registerData, name: e.target.value })}
                      className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Email</label>
                    <input
                      type="email"
                      value={registerData.email}
                      onChange={(e) => setRegisterData({ ...registerData, email: e.target.value })}
                      className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Số điện thoại</label>
                    <input
                      type="tel"
                      value={registerData.phone}
                      onChange={(e) => setRegisterData({ ...registerData, phone: e.target.value })}
                      className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Mật khẩu</label>
                    <input
                      type="password"
                      value={registerData.password}
                      onChange={(e) => setRegisterData({ ...registerData, password: e.target.value })}
                      className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Xác nhận mật khẩu</label>
                    <input
                      type="password"
                      value={registerData.confirmPassword}
                      onChange={(e) => setRegisterData({ ...registerData, confirmPassword: e.target.value })}
                      className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>
                  <button type="submit" className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 w-full">Đăng ký</button>
                  <p className="text-sm text-center">
                    Đã có tài khoản?{' '}
                    <button onClick={() => setActiveTab('login')} className="text-blue-600 hover:underline">Đăng nhập</button>
                  </p>
                </form>
              )}
              {isLoggedIn && activeTab === 'profile' && (
                <form onSubmit={handleUpdateProfile} className="space-y-4">
                  <h2 className="text-xl font-semibold mb-4">Thông tin cá nhân</h2>
                  <div>
                    <label className="block text-sm font-medium mb-1">Họ và tên</label>
                    <input type="text" value={userInfo.name} onChange={(e) => setUserInfo({ ...userInfo, name: e.target.value })} className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Email</label>
                    <input type="email" value={userInfo.email} onChange={(e) => setUserInfo({ ...userInfo, email: e.target.value })} className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Số điện thoại</label>
                    <input type="tel" value={userInfo.phone} onChange={(e) => setUserInfo({ ...userInfo, phone: e.target.value })} className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
                  </div>
                  <button type="submit" className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700">Cập nhật</button>
                </form>
              )}
              {isLoggedIn && activeTab === 'orders' && !selectedOrder && (
                <div>
                  <h2 className="text-xl font-semibold mb-4">Lịch sử đơn hàng</h2>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {orderTabs.map((tab) => (
                      <button
                        key={tab}
                        onClick={() => setOrderTab(tab)}
                        className={`px-4 py-2 rounded-md ${orderTab === tab ? 'bg-blue-600 text-white' : 'bg-gray-100 hover:bg-gray-200'}`}
                      >
                        {tab}
                      </button>
                    ))}
                  </div>
                  {filteredOrders.length === 0 ? (
                    <p className="text-gray-600">Không có đơn hàng nào trong mục này.</p>
                  ) : (
                    <div className="space-y-4">
                      {filteredOrders.map((order) => (
                        <div key={order.id} className="p-4 border rounded-md">
                          <div className="flex justify-between">
                            <span className="font-medium">Mã đơn: {order.id}</span>
                            <span className={order.status === 'Thành công' ? 'text-green-600' : order.status === 'Đã hủy' ? 'text-red-600' : 'text-yellow-600'}>{order.status}</span>
                          </div>
                          <p className="text-sm text-gray-600 mt-1">Ngày đặt: {order.date}</p>
                          <p className="text-sm text-gray-600">Sản phẩm: {order.items.map(item => item.name).join(', ')}</p>
                          <p className="text-sm font-semibold mt-2">Tổng tiền: {formatPrice(order.total)}</p>
                          {(order.status === 'Đang giao hàng' || order.status === 'Chờ xử lý') && (
                            <button
                              onClick={() => setSelectedOrder(order)}
                              className="mt-2 text-blue-600 hover:underline"
                            >
                              Xem chi tiết
                            </button>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
              {isLoggedIn && activeTab === 'orders' && selectedOrder && (
                <div>
                  <button onClick={() => setSelectedOrder(null)} className="text-blue-600 mb-4 hover:underline">Quay lại</button>
                  <h2 className="text-xl font-semibold mb-4">Chi tiết đơn hàng #{selectedOrder.id}</h2>
                  <div className="space-y-4">
                    <div>
                      <p className="font-medium">Trạng thái: <span className={selectedOrder.status === 'Thành công' ? 'text-green-600' : selectedOrder.status === 'Đã hủy' ? 'text-red-600' : 'text-yellow-600'}>{selectedOrder.status}</span></p>
                      <p className="text-sm text-gray-600">Ngày đặt: {selectedOrder.date}</p>
                      <p className="text-sm font-semibold">Tổng tiền: {formatPrice(selectedOrder.total)}</p>
                    </div>
                    <div className="border-t pt-4">
                      <h3 className="font-medium mb-2">Sản phẩm</h3>
                      {selectedOrder.items.map((item, index) => (
                        <div key={index} className="flex justify-between items-center py-2 border-b">
                          <div>
                            <p>{item.name}</p>
                            <p className="text-sm text-gray-600">Số lượng: {item.quantity}</p>
                          </div>
                          <p className="font-medium">{formatPrice(item.price * item.quantity)}</p>
                        </div>
                      ))}
                    </div>
                    <div>
                      <h3 className="font-medium mb-2">Thông tin giao hàng</h3>
                      <p className="text-sm text-gray-600">Tên: {userInfo.name}</p>
                      <p className="text-sm text-gray-600">Số điện thoại: {userInfo.phone}</p>
                      <p className="text-sm text-gray-600">Địa chỉ: 123 Đường Lê Lợi, Quận 1, TP.HCM (Mặc định)</p>
                    </div>
                    {selectedOrder.status === 'Chờ xử lý' && (
                      <button
                        onClick={() => handleCancelOrder(selectedOrder.id)}
                        className="mt-4 bg-red-600 text-white px-6 py-2 rounded-md hover:bg-red-700"
                      >
                        Hủy đơn hàng
                      </button>
                    )}
                  </div>
                </div>
              )}
              {isLoggedIn && activeTab === 'favorites' && (
                <div>
                  <h2 className="text-xl font-semibold mb-4">Sản phẩm yêu thích</h2>
                  {favorites.length === 0 ? (
                    <p className="text-gray-600">Bạn chưa có sản phẩm yêu thích nào.</p>
                  ) : (
                    <div className="space-y-4">
                      {favorites.map((item) => (
                        <div key={item.id} className="p-4 border rounded-md flex items-center justify-between">
                          <div className="flex items-center">
                            <img src={item.image} alt={item.name} className="w-16 h-16 object-contain mr-4" />
                            <div>
                              <p className="font-medium">{item.name}</p>
                              <p className="text-sm text-blue-600">{formatPrice(item.price)}</p>
                            </div>
                          </div>
                          <button onClick={() => removeFavorite(item.id)} className="text-red-500 hover:text-red-700">
                            <Trash2 size={20} />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white mt-12">
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">ElectroShop</h3>
              <p className="mb-4">Chuyên cung cấp các sản phẩm điện tử chính hãng với giá tốt nhất thị trường.</p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Danh mục sản phẩm</h4>
              <ul className="space-y-2">
                {categories.map(category => (
                  <li key={category.id}><a href="#" className="hover:text-blue-400 transition-colors">{category.name}</a></li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Hỗ trợ khách hàng</h4>
              <ul className="space-y-2">
                <li><a href="#" className="hover:text-blue-400 transition-colors">Hướng dẫn mua hàng</a></li>
                <li><a href="#" className="hover:text-blue-400 transition-colors">Chính sách bảo hành</a></li>
                <li><a href="#" className="hover:text-blue-400 transition-colors">Chính sách đổi trả</a></li>
                <li><a href="#" className="hover:text-blue-400 transition-colors">Liên hệ</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Liên hệ</h4>
              <ul className="space-y-2">
                <li>Địa chỉ: 123 Đường Công Nghệ, TP.HCM</li>
                <li>Hotline: 1800 1234</li>
                <li>Email: support@electroshop.com</li>
                <li>Thời gian: 8:00 - 22:00</li>
              </ul>
            </div>
          </div>
          <div className="border-t mt-8 pt-4 text-center text-sm">
            <p>© 2025 ElectroShop. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}