import React from 'react';
import { ChevronRight } from 'lucide-react';
import Footer from '../components/Footer';
import Header from '../components/Header';
import { Link } from 'react-router-dom';

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
      <Header categories={categories} />

      <main className="container mx-auto px-4 py-8">
        {/* Breadcrumbs */}
        <div className="flex items-center text-sm mb-6">
          <Link to={`/`} className="text-gray-500 hover:text-blue-600">Trang chủ</Link>
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

      <Footer categories={categories} />
    </div>
  );
}