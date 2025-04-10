import React, { useState } from 'react';
import { Search, ShoppingCart, Menu, X, Heart, User, ChevronDown, ChevronRight, ChevronLeft } from 'lucide-react';

// Dữ liệu mẫu từ CartPage
const initialCartItems = [
  { id: 1, name: 'iPhone 15 Pro Max', price: 32990000, quantity: 1, image: '/api/placeholder/100/100', color: 'Titan Đen', storage: '256GB' },
  { id: 3, name: 'MacBook Pro M3', price: 36990000, quantity: 1, image: '/api/placeholder/100/100', color: 'Xám', storage: '512GB' },
  { id: 5, name: 'Sony WH-1000XM5', price: 6990000, quantity: 2, image: '/api/placeholder/100/100', color: 'Đen', options: 'Bluetooth 5.0' }
];

const availableVouchers = [
  { code: 'WELCOME10', discount: 0.1, maxDiscount: 500000, minOrder: 5000000 },
  { code: 'FLASH25', discount: 0.25, maxDiscount: 1000000, minOrder: 10000000 },
  { code: 'FREESHIP', discount: 0, shipping: true }
];

// Danh mục sản phẩm cho menu
const categories = [
  { id: 1, name: 'Điện thoại', subcategories: ['iPhone', 'Samsung', 'Xiaomi', 'OPPO'] },
  { id: 2, name: 'Laptop', subcategories: ['Macbook', 'Dell', 'HP', 'Lenovo', 'Asus'] },
  { id: 3, name: 'Máy tính bảng', subcategories: ['iPad', 'Samsung Galaxy Tab', 'Xiaomi Pad'] },
  { id: 4, name: 'Tai nghe', subcategories: ['AirPods', 'Sony', 'JBL', 'Beats'] },
  { id: 5, name: 'Đồng hồ thông minh', subcategories: ['Apple Watch', 'Samsung Galaxy Watch', 'Xiaomi Watch'] },
];

export default function CheckoutPage({ cartItems = initialCartItems, appliedVoucher = null }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [hoveredCategory, setHoveredCategory] = useState(null);
  const [shippingInfo, setShippingInfo] = useState({
    fullName: '',
    phone: '',
    address: '',
    city: '',
    note: ''
  });
  const [paymentMethod, setPaymentMethod] = useState('cod'); // cod, card, momo
  const [orderConfirmed, setOrderConfirmed] = useState(false);

  // Tính toán tổng tiền
  const subtotal = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  const discount = appliedVoucher ? 
    (appliedVoucher.shipping ? 0 : Math.min(subtotal * appliedVoucher.discount, appliedVoucher.maxDiscount)) : 0;
  const shipping = subtotal > 2000000 || (appliedVoucher && appliedVoucher.shipping) ? 0 : 30000;
  const total = subtotal - discount + shipping;

  const formatPrice = (price) => {
    return new Intl.NumberFormat('vi-VN', { 
      style: 'currency', 
      currency: 'VND',
      maximumFractionDigits: 0
    }).format(price);
  };

  const handleShippingChange = (e) => {
    setShippingInfo({ ...shippingInfo, [e.target.name]: e.target.value });
  };

  const handleSubmitOrder = (e) => {
    e.preventDefault();
    // Kiểm tra thông tin vận chuyển
    if (!shippingInfo.fullName || !shippingInfo.phone || !shippingInfo.address || !shippingInfo.city) {
      alert('Vui lòng điền đầy đủ thông tin vận chuyển');
      return;
    }
    // Xử lý đặt hàng (có thể gửi API ở đây)
    setOrderConfirmed(true);
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
                <ShoppingCart size={20} className="mr-1" />
                <span className="hidden md:inline">Giỏ hàng</span>
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">{cartItems.length}</span>
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
          <a href="#" className="text-gray-500 hover:text-blue-600">Giỏ hàng</a>
          <ChevronRight size={16} className="mx-2 text-gray-500" />
          <span className="text-gray-900 font-medium">Thanh toán</span>
        </div>

        {orderConfirmed ? (
          <div className="bg-white rounded-lg shadow-sm p-8 text-center">
            <h1 className="text-2xl font-bold mb-4 text-green-600">Đặt hàng thành công!</h1>
            <p className="text-gray-600 mb-6">Cảm ơn bạn đã mua sắm tại ElectroShop. Đơn hàng của bạn đã được ghi nhận.</p>
            <p className="text-gray-600 mb-6">Chúng tôi sẽ liên hệ với bạn sớm để xác nhận chi tiết.</p>
            <a href="#" className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700">Quay lại trang chủ</a>
          </div>
        ) : (
          <div className="flex flex-col lg:flex-row gap-6">
            {/* Thông tin vận chuyển & phương thức thanh toán */}
            <div className="lg:w-2/3">
              <form onSubmit={handleSubmitOrder}>
                {/* Thông tin vận chuyển */}
                <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
                  <h2 className="text-xl font-semibold mb-4">Thông tin vận chuyển</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-1">Họ và tên *</label>
                      <input
                        type="text"
                        name="fullName"
                        value={shippingInfo.fullName}
                        onChange={handleShippingChange}
                        className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">Số điện thoại *</label>
                      <input
                        type="tel"
                        name="phone"
                        value={shippingInfo.phone}
                        onChange={handleShippingChange}
                        className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium mb-1">Địa chỉ giao hàng *</label>
                      <input
                        type="text"
                        name="address"
                        value={shippingInfo.address}
                        onChange={handleShippingChange}
                        className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">Tỉnh/Thành phố *</label>
                      <input
                        type="text"
                        name="city"
                        value={shippingInfo.city}
                        onChange={handleShippingChange}
                        className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium mb-1">Ghi chú (tùy chọn)</label>
                      <textarea
                        name="note"
                        value={shippingInfo.note}
                        onChange={handleShippingChange}
                        className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        rows="3"
                      />
                    </div>
                  </div>
                </div>

                {/* Phương thức thanh toán */}
                <div className="bg-white rounded-lg shadow-sm p-6">
                  <h2 className="text-xl font-semibold mb-4">Phương thức thanh toán</h2>
                  <div className="space-y-4">
                    <label className="flex items-center p-4 border rounded-md cursor-pointer hover:bg-gray-50">
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="cod"
                        checked={paymentMethod === 'cod'}
                        onChange={(e) => setPaymentMethod(e.target.value)}
                        className="mr-2"
                      />
                      <div>
                        <p className="font-medium">Thanh toán khi nhận hàng (COD)</p>
                        <p className="text-sm text-gray-600">Bạn sẽ thanh toán khi nhận được hàng</p>
                      </div>
                    </label>
                    <label className="flex items-center p-4 border rounded-md cursor-pointer hover:bg-gray-50">
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="card"
                        checked={paymentMethod === 'card'}
                        onChange={(e) => setPaymentMethod(e.target.value)}
                        className="mr-2"
                      />
                      <div>
                        <p className="font-medium">Thẻ tín dụng/Thẻ ghi nợ</p>
                        <p className="text-sm text-gray-600">Visa, Mastercard, JCB</p>
                      </div>
                    </label>
                    <label className="flex items-center p-4 border rounded-md cursor-pointer hover:bg-gray-50">
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="momo"
                        checked={paymentMethod === 'momo'}
                        onChange={(e) => setPaymentMethod(e.target.value)}
                        className="mr-2"
                      />
                      <div>
                        <p className="font-medium">Ví điện tử MoMo</p>
                        <p className="text-sm text-gray-600">Thanh toán qua ứng dụng MoMo</p>
                      </div>
                    </label>
                  </div>
                </div>
              </form>
            </div>

            {/* Tóm tắt đơn hàng */}
            <div className="lg:w-1/3">
              <div className="bg-white rounded-lg shadow-sm p-6 sticky top-20">
                <h2 className="text-xl font-semibold mb-4">Tóm tắt đơn hàng</h2>
                {cartItems.map((item) => (
                  <div key={item.id} className="flex items-center mb-4">
                    <img src={item.image} alt={item.name} className="w-16 h-16 object-contain mr-4" />
                    <div className="flex-1">
                      <p className="font-medium">{item.name}</p>
                      <p className="text-sm text-gray-600">Số lượng: {item.quantity}</p>
                      <p className="text-sm text-gray-600">{item.color || item.storage || item.options}</p>
                    </div>
                    <p className="font-semibold">{formatPrice(item.price * item.quantity)}</p>
                  </div>
                ))}
                <div className="border-t pt-4 space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Tạm tính:</span>
                    <span>{formatPrice(subtotal)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Giảm giá:</span>
                    <span className="text-green-600">- {formatPrice(discount)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Phí vận chuyển:</span>
                    <span>{shipping > 0 ? formatPrice(shipping) : <span className="text-green-600">Miễn phí</span>}</span>
                  </div>
                  <div className="border-t pt-2 flex justify-between font-semibold text-base">
                    <span>Tổng cộng:</span>
                    <span className="text-blue-600">{formatPrice(total)}</span>
                  </div>
                </div>
                <button
                  onClick={handleSubmitOrder}
                  className="w-full bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700 mt-4 font-medium transition-colors"
                >
                  Xác nhận đặt hàng
                </button>
                <p className="text-xs text-gray-500 mt-2 text-center">(Đã bao gồm VAT nếu có)</p>
              </div>
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