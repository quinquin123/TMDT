import React, { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { ShoppingCart, X, ChevronRight, Trash2, Minus, Plus, ChevronLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

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
      <Header categories={categories} />
      <main className="container mx-auto px-4 py-8">
        {/* Breadcrumbs */}
        <div className="flex items-center text-sm mb-6">
          <Link to={`/`} className="text-gray-500 hover:text-blue-600">Trang chủ</Link>
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
            <Link to={`/`} className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700">
              Tiếp tục mua sắm
            </Link>
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
                  <Link to={`/`} className="text-blue-600 flex items-center hover:underline">
                    <ChevronLeft size={16} className="mr-1" />
                    Tiếp tục mua sắm
                  </Link>
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
                
                <Link to={`/checkout`}>
                  <button className="w-full bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700 mt-4 font-medium transition-colors">
                    Tiến hành thanh toán
                  </button>
                </Link>
                
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

      <Footer categories={categories} />
    </div>
  );
}