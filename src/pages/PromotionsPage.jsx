import React, { useState } from 'react';
import { Search, ShoppingCart, Menu, X, Heart, User, ChevronDown, ChevronRight } from 'lucide-react';

// Dữ liệu mẫu cho khuyến mãi
const promotions = [
  {
    id: 1,
    title: 'Giảm 25% Điện thoại cao cấp',
    description: 'Áp dụng cho tất cả điện thoại từ 10 triệu trở lên. Nhập mã FLASH25 khi thanh toán.',
    code: 'FLASH25',
    image: '/api/placeholder/300/200',
    startDate: '2025-04-01',
    endDate: '2025-04-15',
    discount: 'Giảm tối đa 1.000.000đ',
  },
  {
    id: 2,
    title: 'Miễn phí vận chuyển',
    description: 'Miễn phí vận chuyển cho mọi đơn hàng khi sử dụng mã FREESHIP.',
    code: 'FREESHIP',
    image: '/api/placeholder/300/200',
    startDate: '2025-04-01',
    endDate: '2025-04-30',
    discount: 'Miễn phí shipping',
  },
  {
    id: 3,
    title: 'Chào mừng khách mới - Giảm 10%',
    description: 'Giảm 10% cho đơn hàng đầu tiên với mã WELCOME10.',
    code: 'WELCOME10',
    image: '/api/placeholder/300/200',
    startDate: '2025-04-01',
    endDate: '2025-12-31',
    discount: 'Giảm tối đa 500.000đ',
  },
  {
    id: 4,
    title: 'Sale tai nghe - Giảm đến 30%',
    description: 'Ưu đãi đặc biệt cho tất cả tai nghe Sony và JBL. Không cần mã.',
    code: null,
    image: '/api/placeholder/300/200',
    startDate: '2025-04-08',
    endDate: '2025-04-20',
    discount: 'Giảm đến 30%',
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

export default function PromotionsPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [hoveredCategory, setHoveredCategory] = useState(null);

  // Hàm sao chép mã khuyến mãi
  const copyToClipboard = (code) => {
    navigator.clipboard.writeText(code);
    alert(`Đã sao chép mã: ${code}`);
  };

  // Kiểm tra khuyến mãi còn hiệu lực
  const isActive = (endDate) => {
    const today = new Date();
    const expiry = new Date(endDate);
    return today <= expiry;
  };

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
            <a href="#" className="hover:underline">Hệ thống cửa hàng</a>
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
              <a href="/promotions" className="block py-2 px-3 text-gray-700 hover:bg-gray-100 rounded-md">Khuyến mãi</a>
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
            <a href="/promotions" className="text-gray-700 hover:text-blue-600 flex items-center font-semibold">Khuyến mãi HOT</a>
          </div>
        </div>
      </nav>

      <main className="container mx-auto px-4 py-8">
        {/* Breadcrumbs */}
        <div className="flex items-center text-sm mb-6">
          <a href="#" className="text-gray-500 hover:text-blue-600">Trang chủ</a>
          <ChevronRight size={16} className="mx-2 text-gray-500" />
          <span className="text-gray-900 font-medium">Khuyến mãi</span>
        </div>

        <h1 className="text-2xl font-bold mb-6">Khuyến mãi & Ưu đãi</h1>

        {/* Danh sách khuyến mãi */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {promotions.map((promo) => (
            <div key={promo.id} className="bg-white rounded-lg shadow-sm overflow-hidden">
              <img src={promo.image} alt={promo.title} className="w-full h-48 object-cover" />
              <div className="p-4">
                <h2 className="text-lg font-semibold mb-2">{promo.title}</h2>
                <p className="text-sm text-gray-600 mb-2">{promo.description}</p>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium text-blue-600">{promo.discount}</span>
                  <span className={`text-xs px-2 py-1 rounded-full ${isActive(promo.endDate) ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-600'}`}>
                    {isActive(promo.endDate) ? 'Đang hoạt động' : 'Đã hết hạn'}
                  </span>
                </div>
                <p className="text-xs text-gray-500 mb-2">
                  Thời hạn: {promo.startDate} - {promo.endDate}
                </p>
                <div className="flex gap-2">
                  {promo.code ? (
                    <button
                      onClick={() => copyToClipboard(promo.code)}
                      className="flex-1 bg-gray-100 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-200 transition-colors"
                    >
                      {promo.code} (Sao chép)
                    </button>
                  ) : null}
                  <a
                    href="/cart"
                    className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 text-center transition-colors"
                  >
                    Mua ngay
                  </a>
                </div>
              </div>
            </div>
          ))}
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