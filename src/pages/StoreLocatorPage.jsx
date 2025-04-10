import React, { useState } from 'react';
import { Search, ShoppingCart, Menu, X, Heart, User, ChevronDown, ChevronRight } from 'lucide-react';

// Dữ liệu mẫu các cửa hàng
const stores = [
  {
    id: 1,
    name: 'ElectroShop Quận 1',
    address: '123 Đường Lê Lợi, Quận 1, TP. Hồ Chí Minh',
    phone: '0909123456',
    hours: '9:00 - 21:00',
    lat: 10.7769,
    lng: 106.7009,
  },
  {
    id: 2,
    name: 'ElectroShop Quận 7',
    address: '456 Đường Nguyễn Hữu Thọ, Quận 7, TP. Hồ Chí Minh',
    phone: '0918234567',
    hours: '9:00 - 21:00',
    lat: 10.7296,
    lng: 106.6992,
  },
  {
    id: 3,
    name: 'ElectroShop Thủ Đức',
    address: '789 Đường Võ Văn Ngân, TP. Thủ Đức, TP. Hồ Chí Minh',
    phone: '0938345678',
    hours: '9:00 - 21:00',
    lat: 10.8503,
    lng: 106.7718,
  },
];

// Danh mục sản phẩm cho menu
const categories = [
  { id: 1, name: 'Điện thoại', subcategories: ['iPhone', 'Samsung', 'Xiaomi', 'OPPO'] },
  { id: 2, name: 'Laptop', subcategories: ['Macbook', 'Dell', 'HP', 'Lenovo', 'Asus'] },
  { id: 3, name: 'Máy tính bảng', subcategories: ['iPad', 'Samsung Galaxy Tab', 'Xiaomi Pad'] },
  { id: 4, name: 'Tai nghe', subcategories: ['AirPods', 'Sony', 'JBL', 'Beats'] },
  { id: 5, name: 'Đồng hồ thông minh', subcategories: ['Apple Watch', 'Samsung Galaxy Watch', 'Xiaomi Watch'] },
];

export default function StoreLocatorPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [hoveredCategory, setHoveredCategory] = useState(null);
  const [selectedStore, setSelectedStore] = useState(stores[0]); // Mặc định chọn cửa hàng đầu tiên

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
              <a href="#" className="hidden md:flex items-center text-gray-700 hover:text-blue-600">
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
              <a href="/stores" className="block py-2 px-3 text-gray-700 hover:bg-gray-100 rounded-md">Hệ thống cửa hàng</a>
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

      <main className="container mx-auto px-4 py-8">
        {/* Breadcrumbs */}
        <div className="flex items-center text-sm mb-6">
          <a href="#" className="text-gray-500 hover:text-blue-600">Trang chủ</a>
          <ChevronRight size={16} className="mx-2 text-gray-500" />
          <span className="text-gray-900 font-medium">Hệ thống cửa hàng</span>
        </div>

        <h1 className="text-2xl font-bold mb-6">Hệ thống cửa hàng ElectroShop</h1>

        <div className="flex flex-col lg:flex-row gap-6">
          {/* Danh sách cửa hàng */}
          <div className="lg:w-1/3">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-semibold mb-4">Danh sách cửa hàng</h2>
              <div className="space-y-4">
                {stores.map((store) => (
                  <div
                    key={store.id}
                    onClick={() => setSelectedStore(store)}
                    className={`p-4 border rounded-md cursor-pointer hover:bg-gray-50 transition-colors ${
                      selectedStore.id === store.id ? 'border-blue-500 bg-blue-50' : 'border-gray-200'
                    }`}
                  >
                    <h3 className="font-medium text-blue-600">{store.name}</h3>
                    <p className="text-sm text-gray-600 mt-1">{store.address}</p>
                    <p className="text-sm text-gray-600">Điện thoại: {store.phone}</p>
                    <p className="text-sm text-gray-600">Giờ mở cửa: {store.hours}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Bản đồ */}
          <div className="lg:w-2/3">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-semibold mb-4">Vị trí trên bản đồ</h2>
              <div className="w-full h-[500px] rounded-md overflow-hidden">
                <iframe
                  src={`https://www.google.com/maps/embed/v1/place?key=YOUR_GOOGLE_MAPS_API_KEY&q=${selectedStore.lat},${selectedStore.lng}`}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>
              <p className="mt-4 text-sm text-gray-600">
                Địa chỉ: {selectedStore.address} | Điện thoại: {selectedStore.phone}
              </p>
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