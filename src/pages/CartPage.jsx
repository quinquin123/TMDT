import React, { useState, useEffect } from 'react';
import { Search, ShoppingCart, Menu, X, Heart, User, ChevronDown, ChevronRight, Trash2, Minus, Plus, ChevronLeft } from 'lucide-react';

// Data mẫu cho giỏ hàng
const initialCartItems = [
  { 
    id: 1, 
    name: 'iPhone 15 Pro Max', 
    price: 32990000, 
    originalPrice: 34990000,
    quantity: 1, 
    image: '/api/placeholder/100/100',
    color: 'Titan Đen',
    storage: '256GB'
  },
  { 
    id: 3, 
    name: 'MacBook Pro M3', 
    price: 36990000, 
    originalPrice: 38990000,
    quantity: 1, 
    image: '/api/placeholder/100/100',
    color: 'Xám',
    storage: '512GB'
  },
  { 
    id: 5, 
    name: 'Sony WH-1000XM5', 
    price: 6990000, 
    originalPrice: 8990000,
    quantity: 2, 
    image: '/api/placeholder/100/100',
    color: 'Đen',
    options: 'Bluetooth 5.0'
  }
];

// Các mã giảm giá có thể sử dụng
const availableVouchers = [
  { code: 'WELCOME10', discount: 0.1, maxDiscount: 500000, minOrder: 5000000 },
  { code: 'FLASH25', discount: 0.25, maxDiscount: 1000000, minOrder: 10000000 },
  { code: 'FREESHIP', discount: 0, shipping: true }
];

export default function CartPage() {
  const [cartItems, setCartItems] = useState(initialCartItems);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [hoveredCategory, setHoveredCategory] = useState(null);
  const [voucherCode, setVoucherCode] = useState('');
  const [appliedVoucher, setAppliedVoucher] = useState(null);
  const [voucherError, setVoucherError] = useState('');
  
  // Tính toán tổng tiền
  const subtotal = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  const discount = appliedVoucher ? 
    (appliedVoucher.shipping ? 0 : Math.min(subtotal * appliedVoucher.discount, appliedVoucher.maxDiscount)) : 0;
  const shipping = subtotal > 2000000 || (appliedVoucher && appliedVoucher.shipping) ? 0 : 30000;
  const total = subtotal - discount + shipping;
  
  // Format số tiền thành VND
  const formatPrice = (price) => {
    return new Intl.NumberFormat('vi-VN', { 
      style: 'currency', 
      currency: 'VND',
      maximumFractionDigits: 0
    }).format(price);
  };
  
  // Cập nhật số lượng sản phẩm
  const updateQuantity = (id, newQuantity) => {
    if (newQuantity < 1) return;
    setCartItems(cartItems.map(item => 
      item.id === id ? { ...item, quantity: newQuantity } : item
    ));
  };
  
  // Xóa sản phẩm khỏi giỏ hàng
  const removeItem = (id) => {
    setCartItems(cartItems.filter(item => item.id !== id));
  };
  
  // Áp dụng mã giảm giá
  const applyVoucher = () => {
    const voucher = availableVouchers.find(v => v.code === voucherCode);
    if (!voucher) {
      setVoucherError('Mã giảm giá không hợp lệ');
      return;
    }
    
    if (voucher.minOrder && subtotal < voucher.minOrder) {
      setVoucherError(`Đơn hàng tối thiểu ${formatPrice(voucher.minOrder)} để sử dụng mã này`);
      return;
    }
    
    setAppliedVoucher(voucher);
    setVoucherError('');
    setVoucherCode(''); // Reset input sau khi áp dụng thành công
  };
  
  // Danh mục sản phẩm cho menu
  const categories = [
    { id: 1, name: 'Điện thoại', subcategories: ['iPhone', 'Samsung', 'Xiaomi', 'OPPO'] },
    { id: 2, name: 'Laptop', subcategories: ['Macbook', 'Dell', 'HP', 'Lenovo', 'Asus'] },
    { id: 3, name: 'Máy tính bảng', subcategories: ['iPad', 'Samsung Galaxy Tab', 'Xiaomi Pad'] },
    { id: 4, name: 'Tai nghe', subcategories: ['AirPods', 'Sony', 'JBL', 'Beats'] },
    { id: 5, name: 'Đồng hồ thông minh', subcategories: ['Apple Watch', 'Samsung Galaxy Watch', 'Xiaomi Watch'] },
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
            <a href="#" className="mr-4 hover:underline">Tra cứu đơn hàng</a>
            <a href="#" className="hover:underline">Hệ thống cửa hàng</a>
          </div>
        </div>
      </div>

      {/* Header */}
      <header className="bg-white shadow-md sticky top-0 z-30">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between py-4">
            {/* Logo */}
            <div className="flex items-center">
              <button 
                className="mr-2 md:hidden"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
              <h1 className="text-2xl font-bold text-blue-600">ElectroShop</h1>
            </div>

            {/* Search */}
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

            {/* Actions */}
            <div className="flex items-center space-x-4">
              <a href="#" className="hidden md:flex items-center text-gray-700 hover:text-blue-600">
                <User size={20} className="mr-1" />
                <span>Tài khoản</span>
              </a>
              <a href="#" className="hidden md:flex items-center text-gray-700 hover:text-blue-600">
                <Heart size={20} className="mr-1" />
                <span>Yêu thích</span>
              </a>
              <a href="#" className="flex items-center text-blue-600 relative">
                <ShoppingCart size={20} className="mr-1" />
                <span className="hidden md:inline">Giỏ hàng</span>
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">{cartItems.length}</span>
              </a>
            </div>
          </div>

          {/* Mobile search */}
          <div className="md:hidden pb-4">
            <div className="flex relative">
              <input 
                type="text" 
                placeholder="Tìm kiếm sản phẩm..." 
                className="w-full py-2 px-4 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
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
              <button onClick={() => setMobileMenuOpen(false)}>
                <X size={24} />
              </button>
            </div>
            <div className="space-y-1">
              <a href="#" className="block py-2 px-3 text-gray-700 hover:bg-gray-100 rounded-md">Tài khoản</a>
              <a href="#" className="block py-2 px-3 text-gray-700 hover:bg-gray-100 rounded-md">Yêu thích</a>
              <div className="border-t my-2"></div>
              {categories.map(category => (
                <a key={category.id} href="#" className="block py-2 px-3 text-gray-700 hover:bg-gray-100 rounded-md">
                  {category.name}
                </a>
              ))}
              <div className="border-t my-2"></div>
              <a href="#" className="block py-2 px-3 text-gray-700 hover:bg-gray-100 rounded-md">Khuyến mãi</a>
              <a href="#" className="block py-2 px-3 text-gray-700 hover:bg-gray-100 rounded-md">Tin tức</a>
              <a href="#" className="block py-2 px-3 text-gray-700 hover:bg-gray-100 rounded-md">Liên hệ</a>
            </div>
          </div>
        </div>
      )}

      {/* Navigation */}
      <nav className="bg-white shadow-sm">
        <div className="container mx-auto px-4">
          <div className="hidden md:flex items-center space-x-8 py-3">
            {categories.map((category) => (
              <div 
                key={category.id} 
                className="relative group"
                onMouseEnter={() => setHoveredCategory(category.id)}
                onMouseLeave={() => setHoveredCategory(null)}
              >
                <a href="#" className="text-gray-700 hover:text-blue-600 flex items-center">
                  {category.name}
                  <ChevronDown size={16} className="ml-1" />
                </a>
                {hoveredCategory === category.id && (
                  <div className="absolute left-0 mt-2 bg-white border shadow-md rounded-md py-2 z-20 w-48">
                    {category.subcategories.map((sub, idx) => (
                      <a 
                        key={idx} 
                        href="#" 
                        className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                      >
                        {sub}
                      </a>
                    ))}
                  </div>
                )}
              </div>
            ))}
            <a href="#" className="text-gray-700 hover:text-blue-600 flex items-center">
              Khuyến mãi HOT
            </a>
          </div>
        </div>
      </nav>

      <main className="container mx-auto px-4 py-8">
        {/* Breadcrumbs */}
        <div className="flex items-center text-sm mb-6">
          <a href="#" className="text-gray-500 hover:text-blue-600">Trang chủ</a>
          <ChevronRight size={16} className="mx-2 text-gray-500" />
          <span className="text-gray-900 font-medium">Giỏ hàng</span>
        </div>

        <h1 className="text-2xl font-bold mb-6">Giỏ hàng của bạn ({cartItems.length} sản phẩm)</h1>

        {cartItems.length === 0 ? (
          <div className="bg-white rounded-lg shadow-sm p-8 text-center">
            <div className="flex justify-center mb-4">
              <ShoppingCart size={64} className="text-gray-300" />
            </div>
            <h2 className="text-xl font-semibold mb-2">Giỏ hàng của bạn đang trống</h2>
            <p className="text-gray-600 mb-6">Hãy thêm sản phẩm vào giỏ hàng để tiếp tục mua sắm</p>
            <a href="#" className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700">
              Tiếp tục mua sắm
            </a>
          </div>
        ) : (
          <div className="flex flex-col lg:flex-row gap-6">
            {/* Danh sách sản phẩm */}
            <div className="lg:w-2/3">
              <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                <div className="hidden md:flex items-center p-4 bg-gray-50 border-b">
                  <div className="w-2/5">Sản phẩm</div>
                  <div className="w-1/5 text-center">Đơn giá</div>
                  <div className="w-1/5 text-center">Số lượng</div>
                  <div className="w-1/5 text-center">Thành tiền</div>
                </div>
                
                {cartItems.map((item) => (
                  <div key={item.id} className="p-4 border-b flex flex-col md:flex-row md:items-center">
                    <div className="flex md:w-2/5 mb-4 md:mb-0">
                      <img src={item.image} alt={item.name} className="w-20 h-20 object-contain mr-4" />
                      <div>
                        <h3 className="font-medium mb-1">{item.name}</h3>
                        <div className="text-sm text-gray-500 mb-1">
                          {item.color && <p>Màu: {item.color}</p>}
                          {item.storage && <p>Bộ nhớ: {item.storage}</p>}
                          {item.options && <p>Tùy chọn: {item.options}</p>}
                        </div>
                        <button 
                          onClick={() => removeItem(item.id)}
                          className="text-red-500 text-sm flex items-center md:hidden"
                        >
                          <Trash2 size={16} className="mr-1" />
                          Xóa
                        </button>
                      </div>
                    </div>
                    
                    <div className="md:w-1/5 md:text-center flex justify-between mb-3 md:mb-0">
                      <span className="md:hidden font-medium">Đơn giá:</span>
                      <div>
                        <span className="text-blue-600 font-semibold">{formatPrice(item.price)}</span>
                        {item.originalPrice > item.price && (
                          <p className="text-gray-400 text-sm line-through">{formatPrice(item.originalPrice)}</p>
                        )}
                      </div>
                    </div>
                    
                    <div className="md:w-1/5 md:text-center flex justify-between mb-3 md:mb-0">
                      <span className="md:hidden font-medium">Số lượng:</span>
                      <div className="flex items-center border rounded-md">
                        <button 
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="px-2 py-1 text-gray-600 hover:bg-gray-100 disabled:opacity-50"
                          disabled={item.quantity <= 1}
                        >
                          <Minus size={16} />
                        </button>
                        <input 
                          type="number" 
                          value={item.quantity} 
                          onChange={(e) => updateQuantity(item.id, parseInt(e.target.value) || 1)}
                          className="w-12 text-center border-x focus:outline-none"
                        />
                        <button 
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="px-2 py-1 text-gray-600 hover:bg-gray-100"
                        >
                          <Plus size={16} />
                        </button>
                      </div>
                    </div>
                    
                    <div className="md:w-1/5 md:text-center flex justify-between">
                      <span className="md:hidden font-medium">Thành tiền:</span>
                      <span className="text-blue-600 font-semibold">{formatPrice(item.price * item.quantity)}</span>
                    </div>
                    
                    <button 
                      onClick={() => removeItem(item.id)}
                      className="hidden md:block text-gray-400 hover:text-red-500 ml-4"
                    >
                      <Trash2 size={20} />
                    </button>
                  </div>
                ))}
                
                <div className="p-4 flex justify-between items-center">
                  <a href="#" className="text-blue-600 flex items-center hover:underline">
                    <ChevronLeft size={16} className="mr-1" />
                    Tiếp tục mua sắm
                  </a>
                  <button 
                    onClick={() => {
                      if (window.confirm('Bạn có chắc chắn muốn xóa tất cả sản phẩm trong giỏ hàng?')) {
                        setCartItems([]);
                      }
                    }}
                    className="text-red-500 flex items-center hover:underline"
                  >
                    <Trash2 size={16} className="mr-1" />
                    Xóa tất cả
                  </button>
                </div>
              </div>
            </div>
            
            {/* Thanh toán */}
            <div className="lg:w-1/3">
              <div className="bg-white rounded-lg shadow-sm p-4 mb-4">
                <h2 className="font-semibold mb-4">Mã giảm giá</h2>
                <div className="flex">
                  <input 
                    type="text" 
                    value={voucherCode}
                    onChange={(e) => setVoucherCode(e.target.value.toUpperCase())}
                    placeholder="Nhập mã giảm giá" 
                    className="flex-grow border rounded-l-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <button 
                    onClick={applyVoucher}
                    className="bg-blue-600 text-white px-4 py-2 rounded-r-md hover:bg-blue-700 disabled:bg-gray-400"
                    disabled={!voucherCode}
                  >
                    Áp dụng
                  </button>
                </div>
                {voucherError && <p className="mt-2 text-red-500 text-sm">{voucherError}</p>}
                {appliedVoucher && (
                  <div className="mt-2 p-2 bg-green-50 text-green-700 text-sm rounded flex justify-between items-center">
                    <span>
                      Đã áp dụng: <strong>{appliedVoucher.code}</strong>
                      {appliedVoucher.shipping ? ' (Miễn phí vận chuyển)' : ` (Giảm ${appliedVoucher.discount * 100}%)`}
                    </span>
                    <button 
                      onClick={() => {
                        setAppliedVoucher(null);
                        setVoucherError('');
                      }}
                      className="text-gray-500 hover:text-red-500"
                    >
                      <X size={16} />
                    </button>
                  </div>
                )}
              </div>
              
              <div className="bg-white rounded-lg shadow-sm p-4 sticky top-20">
                <h2 className="font-semibold mb-4">Thông tin thanh toán</h2>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span>Tạm tính ({cartItems.reduce((total, item) => total + item.quantity, 0)} sản phẩm):</span>
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
                  <div className="border-t pt-3 mt-3 flex justify-between font-semibold text-base">
                    <span>Tổng thanh toán:</span>
                    <span className="text-blue-600">{formatPrice(total)}</span>
                  </div>
                  <p className="text-xs text-gray-500">(Đã bao gồm VAT nếu có)</p>
                </div>
                
                <button className="w-full bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700 mt-4 font-medium transition-colors">
                  Tiến hành thanh toán
                </button>
                
                <div className="mt-4 flex justify-center gap-4">
                  <img src="/api/placeholder/40/25" alt="VISA" className="h-6" />
                  <img src="/api/placeholder/40/25" alt="Mastercard" className="h-6" />
                  <img src="/api/placeholder/40/25" alt="JCB" className="h-6" />
                  <img src="/api/placeholder/40/25" alt="Momo" className="h-6" />
                  <img src="/api/placeholder/40/25" alt="ZaloPay" className="h-6" />
                </div>
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
              <div className="flex space-x-4">
                <a href="#" className="hover:text-blue-400 transition-colors">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd"></path>
                  </svg>
                </a>
                <a href="#" className="hover:text-blue-400 transition-colors">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"></path>
                  </svg>
                </a>
                <a href="#" className="hover:text-blue-400 transition-colors">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858-.182-.466-.398-.8-.748-1.15-.35-.35-.683-.566-1.15-.748-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 100 10.27 5.135 5.135 0 000-10.27zm0 1.802a3.333 3.333 0 110 6.666 3.333 3.333 0 010-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd"></path>
                  </svg>
                </a>
              </div>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Danh mục sản phẩm</h4>
              <ul className="space-y-2">
                {categories.map(category => (
                  <li key={category.id}>
                    <a href="#" className="hover:text-blue-400 transition-colors">{category.name}</a>
                  </li>
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
            <p>&copy; 2025 ElectroShop. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}