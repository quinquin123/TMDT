import React, { useState } from 'react';
import { Search, ChevronRight, ChevronLeft } from 'lucide-react';
import Footer from '../components/Footer';
import Header from '../components/Header';
import { Link } from 'react-router-dom';

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
      <Header categories={categories} />

      <main className="container mx-auto px-4 py-8">
        {/* Breadcrumbs */}
        <div className="flex items-center text-sm mb-6">
          <Link to={`/`} className="text-gray-500 hover:text-blue-600">Trang chủ</Link>
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
              <Link to={`/`} className="text-blue-600 flex items-center hover:underline">
                <ChevronLeft size={16} className="mr-1" /> Quay lại mua sắm
              </Link>
            </div>
          </div>
        )}
      </main>

      <Footer categories={categories} />
    </div>
  );
}