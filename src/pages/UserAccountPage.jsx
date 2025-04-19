import React, { useState, useContext } from 'react';
import { ChevronRight, Trash2 } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Link, Navigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

// Dữ liệu mẫu
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
  const { isLoggedIn, userInfo, setUserInfo, logout } = useContext(AuthContext);
  const [activeTab, setActiveTab] = useState('profile');
  const [orderTab, setOrderTab] = useState('Tất cả');
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [favorites, setFavorites] = useState(mockFavorites);
  const [orders, setOrders] = useState(mockOrders);

  const formatPrice = (price) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND', maximumFractionDigits: 0 }).format(price);
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

  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header categories={categories} />

      {/* Main content */}
      <main className="container mx-auto px-4 py-8">
        <div className="flex items-center text-sm mb-6">
          <Link to="/" className="text-gray-500 hover:text-blue-600">
            Trang chủ
          </Link>
          <ChevronRight size={16} className="mx-2 text-gray-500" />
          <span className="text-gray-900 font-medium">Tài khoản</span>
        </div>

        <h1 className="text-2xl font-bold mb-6">Tài khoản của bạn</h1>

        <div className="flex flex-col lg:flex-row gap-6">
          <div className="lg:w-1/4">
            <div className="bg-white rounded-lg shadow-sm p-4">
              <div className="mb-4">
                <p className="font-medium">{userInfo.name}</p>
                <p className="text-sm text-gray-600">{userInfo.email}</p>
              </div>
              <nav className="space-y-2">
                <button onClick={() => setActiveTab('profile')} className={`w-full text-left py-2 px-4 rounded-md ${activeTab === 'profile' ? 'bg-blue-100 text-blue-600' : 'hover:bg-gray-100'}`}>
                  Thông tin cá nhân
                </button>
                <button onClick={() => setActiveTab('orders')} className={`w-full text-left py-2 px-4 rounded-md ${activeTab === 'orders' ? 'bg-blue-100 text-blue-600' : 'hover:bg-gray-100'}`}>
                  Lịch sử đơn hàng
                </button>
                <button onClick={() => setActiveTab('favorites')} className={`w-full text-left py-2 px-4 rounded-md ${activeTab === 'favorites' ? 'bg-blue-100 text-blue-600' : 'hover:bg-gray-100'}`}>
                  Sản phẩm yêu thích
                </button>
                <button onClick={logout} className="w-full text-left py-2 px-4 rounded-md text-red-600 hover:bg-red-100">
                  Đăng xuất
                </button>
              </nav>
            </div>
          </div>

          <div className="lg:w-3/4">
            <div className="bg-white rounded-lg shadow-sm p-6">
              {activeTab === 'profile' && (
                <form onSubmit={handleUpdateProfile} className="space-y-4">
                  <h2 className="text-xl font-semibold mb-4">Thông tin cá nhân</h2>
                  <div>
                    <label className="block text-sm font-medium mb-1">Họ và tên</label>
                    <input
                      type="text"
                      value={userInfo.name}
                      onChange={(e) => setUserInfo({ ...userInfo, name: e.target.value })}
                      className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Email</label>
                    <input
                      type="email"
                      value={userInfo.email}
                      onChange={(e) => setUserInfo({ ...userInfo, email: e.target.value })}
                      className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Số điện thoại</label>
                    <input
                      type="tel"
                      value={userInfo.phone}
                      onChange={(e) => setUserInfo({ ...userInfo, phone: e.target.value })}
                      className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <button type="submit" className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700">
                    Cập nhật
                  </button>
                </form>
              )}
              {activeTab === 'orders' && !selectedOrder && (
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
              {activeTab === 'orders' && selectedOrder && (
                <div>
                  <button onClick={() => setSelectedOrder(null)} className="text-blue-600 mb-4 hover:underline">
                    Quay lại
                  </button>
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
              {activeTab === 'favorites' && (
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

      <Footer categories={categories} />
    </div>
  );
}