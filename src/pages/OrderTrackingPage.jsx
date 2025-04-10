import React, { useState } from 'react';
import { Search, ShoppingCart, Menu, X, Heart, User, ChevronDown, ChevronRight, ChevronLeft } from 'lucide-react';

// Dữ liệu mẫu trạng thái đơn hàng (thay thế bằng API thực tế trong ứng dụng thật)
const mockOrders = {
  'DH123456': {
    orderId: 'DH123456',
    status: 'Đang xử lý',
    items: [
      { name: 'iPhone 15 Pro Max', quantity: 1, price: 32990000 },
      { name: 'Sony WH-1000XM5', quantity: 2, price: 6990000 },
    ],
    total: 46980000,
    date: '2025-04-08',
    shipping: {
      fullName: 'Nguyễn Văn A',
      address: '123 Đường Lê Lợi, Quận 1',
      city: 'TP. Hồ Chí Minh',
      phone: '0909123456',
    },
  },
  'DH789101': {
    orderId: 'DH789101',
    status: 'Đã giao hàng',
    items: [
      { name: 'MacBook Pro M3', quantity: 1, price: 36990000 },
    ],
    total: 36990000,
    date: '2025-04-07',
    shipping: {
      fullName: 'Trần Thị B',
      address: '456 Đường Nguyễn Huệ, Quận 3',
      city: 'TP. Hồ Chí Minh',
      phone: '0918234567',
    },
  },
};

// Danh mục sản phẩm cho menu
const categories = [
  { id: 1, name: 'Điện thoại', subcategories: ['iPhone', 'Samsung', 'Xiaomi', 'OPPO'] },
  { id: 2, name: 'Laptop', subcategories: ['Macbook', 'Dell', 'HP', 'Lenovo', 'Asus'] },
  { id: 3, name: 'Máy tính bảng', subcategories: ['iPad', 'Samsung Galaxy Tab', 'Xiaomi Pad'] },
  { id: 4, name: 'Tai nghe', subcategories: ['AirPods', 'Sony', 'JBL', 'Beats'] },
  { id: 5, name: 'Đồng hồ thông minh', subcategories: ['Apple Watch', 'Samsung Galaxy Watch', 'Xiaomi Watch'] },
];

export default function OrderTrackingPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [hoveredCategory, setHoveredCategory] = useState(null);
  const [orderCode, setOrderCode] = useState('');
  const [orderInfo, setOrderInfo] = useState(null);
  const [error, setError] = useState('');

  // Format tiền tệ
  const formatPrice = (price) => {
    return new Intl.NumberFormat('vi-VN', { 
      style: 'currency', 
      currency: 'VND',
      maximumFractionDigits: 0
    }).format(price);
  };

  // Xử lý tra cứu đơn hàng
  const handleTrackOrder = (e) => {
    e.preventDefault();
    setError('');
    setOrderInfo(null);

    if (!orderCode) {
      setError('Vui lòng nhập mã đơn hàng');
      return;
    }

    // Giả lập tra cứu (thay bằng API thực tế)
    const foundOrder = mockOrders[orderCode.toUpperCase()];
    if (foundOrder) {
      setOrderInfo(foundOrder);
    } else {
      setError('Không tìm thấy đơn hàng với mã này');
    }
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
            <a href="#" className="mr-4 hover:underline">Tra cứu đơn hàng</a>
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
              <a href="#" className="flex items-center text-blue-600 relative">
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
            <a href="#" className="text-gray-700 hover:text-blue-600 flex items-center">Khuyến mãi HOT</a>
          </div>
        </div>
      </nav>

      <main className="container mx-auto px-4 py-8">
        {/* Breadcrumbs */}
        <div className="flex items-center text-sm mb-6">
          <a href="#" className="text-gray-500 hover:text-blue-600">Trang chủ</a>
          <ChevronRight size={16} className="mx-2 text-gray-500" />
          <span className="text-gray-900 font-medium">Tra cứu đơn hàng</span>
        </div>

        <h1 className="text-2xl font-bold mb-6">Tra cứu đơn hàng</h1>

        {/* Form tra cứu */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6 max-w-xl mx-auto">
          <form onSubmit={handleTrackOrder} className="flex flex-col gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Nhập mã đơn hàng</label>
              <div className="flex">
                <input
                  type="text"
                  value={orderCode}
                  onChange={(e) => setOrderCode(e.target.value)}
                  placeholder="Ví dụ: DH123456"
                  className="flex-grow px-3 py-2 border rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                  type="submit"
                  className="bg-blue-600 text-white px-4 py-2 rounded-r-md hover:bg-blue-700 flex items-center"
                >
                  <Search size={20} className="mr-2" /> Tra cứu
                </button>
              </div>
            </div>
            {error && <p className="text-red-500 text-sm">{error}</p>}
          </form>
        </div>

        {/* Kết quả tra cứu */}
        {orderInfo && (
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-semibold mb-4">Thông tin đơn hàng #{orderInfo.orderId}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Trạng thái và chi tiết đơn hàng */}
              <div>
                <p className="mb-2"><span className="font-medium">Trạng thái:</span> 
                  <span className={`ml-2 ${orderInfo.status === 'Đã giao hàng' ? 'text-green-600' : 'text-yellow-600'}`}>
                    {orderInfo.status}
                  </span>
                </p>
                <p className="mb-2"><span className="font-medium">Ngày đặt hàng:</span> {orderInfo.date}</p>
                <p className="mb-2"><span className="font-medium">Tổng tiền:</span> {formatPrice(orderInfo.total)}</p>
                <div className="mt-4">
                  <h3 className="font-medium mb-2">Sản phẩm:</h3>
                  {orderInfo.items.map((item, idx) => (
                    <div key={idx} className="flex justify-between mb-2">
                      <span>{item.name} (x{item.quantity})</span>
                      <span>{formatPrice(item.price * item.quantity)}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Thông tin vận chuyển */}
              <div>
                <h3 className="font-medium mb-2">Thông tin vận chuyển</h3>
                <p className="mb-2"><span className="font-medium">Họ và tên:</span> {orderInfo.shipping.fullName}</p>
                <p className="mb-2"><span className="font-medium">Số điện thoại:</span> {orderInfo.shipping.phone}</p>
                <p className="mb-2"><span className="font-medium">Địa chỉ:</span> {orderInfo.shipping.address}, {orderInfo.shipping.city}</p>
              </div>
            </div>
            <div className="mt-6 flex justify-end">
              <a href="#" className="text-blue-600 flex items-center hover:underline">
                <ChevronLeft size={16} className="mr-1" /> Quay lại mua sắm
              </a>
            </div>
          </div>
        )}
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