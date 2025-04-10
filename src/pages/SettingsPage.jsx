import React, { useState } from 'react';
import { User, Lock, Bell, CreditCard, LogOut, ChevronRight, ShoppingCart, Heart, Search, Menu, X } from 'lucide-react';

export default function AccountManagement() {
  const [activeTab, setActiveTab] = useState('profile');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [user, setUser] = useState({
    name: 'Nguyễn Văn A',
    email: 'nguyen.van.a@example.com',
    phone: '0912345678',
    avatar: '/api/placeholder/150/150',
    address: '123 Đường Lê Lợi, Quận 1, TP.HCM',
  });
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({ ...user });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setUser(formData);
    setIsEditing(false);
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'profile':
        return (
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <h2 className="text-2xl font-bold mb-6">Thông tin cá nhân</h2>
            {!isEditing ? (
              <div className="space-y-6">
                <div className="flex items-center mb-6">
                  <img src={user.avatar} alt="Avatar" className="w-24 h-24 rounded-full" />
                  <div className="ml-6">
                    <h3 className="text-lg font-semibold text-gray-900">{user.name}</h3>
                    <p className="text-gray-600">{user.email}</p>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <p className="text-sm text-gray-600">Họ và tên</p>
                    <p className="font-medium">{user.name}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Email</p>
                    <p className="font-medium">{user.email}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Số điện thoại</p>
                    <p className="font-medium">{user.phone}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Địa chỉ</p>
                    <p className="font-medium">{user.address}</p>
                  </div>
                </div>
                <button
                  className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
                  onClick={() => setIsEditing(true)}
                >
                  Chỉnh sửa thông tin
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm text-gray-600 mb-1">Họ và tên</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-600 mb-1">Email</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-600 mb-1">Số điện thoại</label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-600 mb-1">Địa chỉ</label>
                    <input
                      type="text"
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
                <div className="flex space-x-4 mt-6">
                  <button
                    type="submit"
                    className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
                  >
                    Lưu thay đổi
                  </button>
                  <button
                    type="button"
                    className="border border-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-50 transition-colors"
                    onClick={() => {
                      setFormData({ ...user });
                      setIsEditing(false);
                    }}
                  >
                    Hủy
                  </button>
                </div>
              </form>
            )}
          </div>
        );

      case 'security':
        return (
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <h2 className="text-2xl font-bold mb-6">Bảo mật tài khoản</h2>
            <form className="space-y-6">
              <div>
                <h3 className="text-lg font-medium mb-4">Đổi mật khẩu</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm text-gray-600 mb-1">Mật khẩu hiện tại</label>
                    <input
                      type="password"
                      className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-600 mb-1">Mật khẩu mới</label>
                    <input
                      type="password"
                      className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-600 mb-1">Xác nhận mật khẩu mới</label>
                    <input
                      type="password"
                      className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
              </div>
              <button
                type="submit"
                className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
              >
                Lưu thay đổi
              </button>
            </form>
          </div>
        );

      case 'notifications':
        return (
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <h2 className="text-2xl font-bold mb-6">Thiết lập thông báo</h2>
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-medium mb-4">Email</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Thông báo khuyến mãi</p>
                      <p className="text-sm text-gray-600">Nhận thông tin về chương trình khuyến mãi</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" className="sr-only peer" defaultChecked />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-blue-500 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                    </label>
                  </div>
                </div>
              </div>
              <button
                className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
              >
                Lưu thay đổi
              </button>
            </div>
          </div>
        );

      case 'payment':
        return (
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <h2 className="text-2xl font-bold mb-6">Phương thức thanh toán</h2>
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-medium mb-4">Thẻ đã lưu</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-4 border border-gray-200 rounded-md">
                    <div className="flex items-center">
                      <CreditCard className="text-blue-600 mr-3" />
                      <div>
                        <p className="font-medium">Visa •••• 4242</p>
                        <p className="text-sm text-gray-600">Hết hạn: 10/2026</p>
                      </div>
                    </div>
                    <button className="text-red-500 hover:underline">Xóa</button>
                  </div>
                </div>
              </div>
              <button className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
                <CreditCard className="mr-2" />
                <span>Thêm thẻ mới</span>
              </button>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  const menuItems = [
    { id: 'profile', icon: <User size={20} />, label: 'Hồ sơ' },
    { id: 'security', icon: <Lock size={20} />, label: 'Bảo mật' },
    { id: 'notifications', icon: <Bell size={20} />, label: 'Thông báo' },
    { id: 'payment', icon: <CreditCard size={20} />, label: 'Thanh toán' },
  ];

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
            <a href="#" className="mr-4">Tra cứu đơn hàng</a>
            <a href="#">Hệ thống cửa hàng</a>
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
              <input
                type="text"
                placeholder="Tìm kiếm sản phẩm..."
                className="w-full py-2 px-4 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button className="bg-blue-600 text-white p-2 rounded-r-md hover:bg-blue-700">
                <Search size={20} />
              </button>
            </div>

            <div className="flex items-center space-x-4">
              <a href="#" className="hidden md:flex items-center text-gray-700 hover:text-blue-600">
                <User size={20} className="mr-1" />
                <span>{user.name}</span>
              </a>
              <a href="#" className="hidden md:flex items-center text-gray-700 hover:text-blue-600">
                <Heart size={20} className="mr-1" />
                <span>Yêu thích</span>
              </a>
              <a href="#" className="flex items-center text-gray-700 hover:text-blue-600 relative">
                <ShoppingCart size={20} className="mr-1" />
                <span className="hidden md:inline">Giỏ hàng</span>
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">3</span>
              </a>
            </div>
          </div>

          <div className="md:hidden pb-4">
            <div className="flex relative">
              <input
                type="text"
                placeholder="Tìm kiếm sản phẩm..."
                className="w-full py-2 px-4 border border-gray-300 rounded-l-md focus:outline-none"
              />
              <button className="bg-blue-600 text-white p-2 rounded-r-md">
                <Search size={20} />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-black bg-opacity-50" onClick={() => setMobileMenuOpen(false)}>
          <div className="fixed inset-y-0 left-0 max-w-xs w-full bg-white shadow-xl p-4 z-50" onClick={(e) => e.stopPropagation()}>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Menu</h2>
              <button onClick={() => setMobileMenuOpen(false)}>
                <X size={24} />
              </button>
            </div>
            <div className="space-y-1">
              <a href="#" className="block py-2 px-3 text-gray-700 hover:bg-gray-100 rounded-md">Tài khoản</a>
              <a href="#" className="block py-2 px-3 text-gray-700 hover:bg-gray-100 rounded-md">Yêu thích</a>
              <a href="#" className="block py-2 px-3 text-gray-700 hover:bg-gray-100 rounded-md">Giỏ hàng</a>
            </div>
          </div>
        </div>
      )}

      {/* Main content */}
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">Quản lý tài khoản</h1>
        <div className="flex flex-col md:flex-row gap-6">
          {/* Sidebar */}
          <div className="w-full md:w-1/4">
            <div className="bg-white rounded-lg shadow-sm border">
              <div className="p-4 border-b">
                <div className="flex items-center">
                  <img src={user.avatar} alt="Avatar" className="w-10 h-10 rounded-full" />
                  <div className="ml-3">
                    <p className="text-sm font-medium text-gray-900">{user.name}</p>
                    <p className="text-xs text-gray-600">{user.email}</p>
                  </div>
                </div>
              </div>
              <nav className="mt-2">
                {menuItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id)}
                    className={`flex items-center justify-between w-full px-4 py-3 text-gray-700 hover:bg-gray-100 ${
                      activeTab === item.id ? 'bg-blue-100 text-blue-600' : ''
                    }`}
                  >
                    <div className="flex items-center">
                      <span className="mr-2">{item.icon}</span>
                      {item.label}
                    </div>
                    <ChevronRight size={16} />
                  </button>
                ))}
                <button className="flex items-center w-full px-4 py-3 text-gray-700 hover:bg-gray-100">
                  <LogOut size={20} className="mr-2" />
                  Đăng xuất
                </button>
              </nav>
            </div>
          </div>

          {/* Tab content */}
          <div className="w-full md:w-3/4">{renderTabContent()}</div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white">
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">ElectroShop</h3>
              <p className="mb-4">Chuyên cung cấp các sản phẩm điện tử chính hãng với giá tốt nhất thị trường.</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Hỗ Trợ Khách Hàng</h3>
              <ul className="space-y-2">
                <li><a href="#" className="hover:text-blue-400">Hướng dẫn mua hàng</a></li>
                <li><a href="#" className="hover:text-blue-400">Chính sách bảo hành</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Thông Tin Liên Hệ</h3>
              <ul className="space-y-2">
                <li>Địa chỉ: 123 Đường Công Nghệ, TP.HCM</li>
                <li>Hotline: 1800 1234</li>
                <li>Email: support@electroshop.com</li>
              </ul>
            </div>
            <div></div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-6 text-center">
            <p className="text-sm">© 2025 ElectroShop. All rights reserved. Designed by xAI Team.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}