import React, { useState } from 'react';
import { Search, ShoppingCart, Menu, X, Heart, User, ChevronDown, ChevronRight } from 'lucide-react';

// Data mẫu
const categories = [
  { id: 1, name: 'Điện thoại', subcategories: ['iPhone', 'Samsung', 'Xiaomi', 'OPPO'] },
  { id: 2, name: 'Laptop', subcategories: ['Macbook', 'Dell', 'HP', 'Lenovo', 'Asus'] },
  { id: 3, name: 'Máy tính bảng', subcategories: ['iPad', 'Samsung Galaxy Tab', 'Xiaomi Pad'] },
  { id: 4, name: 'Tai nghe', subcategories: ['AirPods', 'Sony', 'JBL', 'Beats'] },
  { id: 5, name: 'Đồng hồ thông minh', subcategories: ['Apple Watch', 'Samsung Galaxy Watch', 'Xiaomi Watch'] },
];

const featuredProducts = [
  { id: 1, name: 'iPhone 15 Pro Max', price: '32.990.000đ', discount: '34.990.000đ', image: '/api/placeholder/200/200', rating: 5 },
  { id: 2, name: 'Samsung Galaxy S24 Ultra', price: '28.990.000đ', discount: '30.990.000đ', image: '/api/placeholder/200/200', rating: 4.5 },
  { id: 3, name: 'MacBook Pro M3', price: '36.990.000đ', discount: '38.990.000đ', image: '/api/placeholder/200/200', rating: 5 },
  { id: 4, name: 'iPad Pro 2024', price: '22.990.000đ', discount: '24.990.000đ', image: '/api/placeholder/200/200', rating: 4.5 },
  { id: 5, name: 'Sony WH-1000XM5', price: '6.990.000đ', discount: '8.990.000đ', image: '/api/placeholder/200/200', rating: 5 },
  { id: 6, name: 'Apple Watch Series 9', price: '10.990.000đ', discount: '12.990.000đ', image: '/api/placeholder/200/200', rating: 4.5 },
  { id: 7, name: 'Samsung Galaxy Tab S9 Ultra', price: '23.990.000đ', discount: '25.990.000đ', image: '/api/placeholder/200/200', rating: 4 },
  { id: 8, name: 'Dell XPS 15', price: '35.990.000đ', discount: '38.990.000đ', image: '/api/placeholder/200/200', rating: 4.5 },
];

const banners = [
  { id: 1, title: 'iPhone 15 Pro Max', description: 'Giảm đến 5.000.000đ', image: '/api/placeholder/1200/400' },
  { id: 2, title: 'MacBook Pro M3', description: 'Trả góp 0%', image: '/api/placeholder/1200/400' },
  { id: 3, title: 'Samsung Galaxy S24 Ultra', description: 'Tặng tai nghe Galaxy Buds', image: '/api/placeholder/1200/400' },
];

const newArrivals = [
  { id: 1, name: 'Samsung Galaxy Z Fold 6', price: '42.990.000đ', image: '/api/placeholder/150/150' },
  { id: 2, name: 'Google Pixel 9 Pro', price: '26.990.000đ', image: '/api/placeholder/150/150' },
  { id: 3, name: 'Asus ROG Phone 8', price: '23.990.000đ', image: '/api/placeholder/150/150' },
  { id: 4, name: 'AirPods Max 2', price: '12.990.000đ', image: '/api/placeholder/150/150' },
];

export default function HomePage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [currentBanner, setCurrentBanner] = useState(0);
  const [hoveredCategory, setHoveredCategory] = useState(null);

  // Star component for ratings
  const RatingStars = ({ rating }) => {
    return (
      <div className="flex">
        {[...Array(5)].map((_, i) => (
          <span key={i} className={`text-sm ${i < rating ? 'text-yellow-500' : 'text-gray-300'}`}>★</span>
        ))}
      </div>
    );
  };

  // Next banner after 5 seconds
  React.useEffect(() => {
    const timer = setTimeout(() => {
      setCurrentBanner((prev) => (prev + 1) % banners.length);
    }, 5000);
    return () => clearTimeout(timer);
  }, [currentBanner]);

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
              <a href="#" className="flex items-center text-gray-700 hover:text-blue-600 relative">
                <ShoppingCart size={20} className="mr-1" />
                <span className="hidden md:inline">Giỏ hàng</span>
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">3</span>
              </a>
            </div>
          </div>

          {/* Mobile search - only shows on mobile */}
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

      <main>
        {/* Hero Banner */}
        <div className="relative">
          <div className="container mx-auto px-4 py-6">
            <div className="relative overflow-hidden rounded-lg h-64 md:h-96">
              {banners.map((banner, idx) => (
                <div key={banner.id} className={`absolute inset-0 transition-opacity duration-1000 ${idx === currentBanner ? 'opacity-100' : 'opacity-0'}`}>
                  <img src={banner.image} alt={banner.title} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent flex items-center">
                    <div className="text-white ml-8 md:ml-16">
                      <h2 className="text-2xl md:text-4xl font-bold mb-2">{banner.title}</h2>
                      <p className="text-lg md:text-xl mb-4">{banner.description}</p>
                      <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">
                        Mua ngay
                      </button>
                    </div>
                  </div>
                </div>
              ))}
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                {banners.map((_, idx) => (
                  <button 
                    key={idx} 
                    className={`h-2 w-2 rounded-full ${idx === currentBanner ? 'bg-white' : 'bg-white/50'}`}
                    onClick={() => setCurrentBanner(idx)}
                  ></button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Category thumbnails */}
        <div className="bg-white">
          <div className="container mx-auto px-4 py-8">
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              {categories.map(category => (
                <a 
                  href="#" 
                  key={category.id} 
                  className="flex flex-col items-center p-4 border rounded-lg hover:shadow-md transition-shadow"
                >
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-2">
                    <img src={`/api/placeholder/32/32`} alt={category.name} className="w-8 h-8" />
                  </div>
                  <span className="text-center font-medium">{category.name}</span>
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* New Arrivals */}
        <div className="bg-gray-50">
          <div className="container mx-auto px-4 py-8">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">Sản Phẩm Mới</h2>
              <a href="#" className="text-blue-600 hover:underline flex items-center">
                Xem tất cả <ChevronRight size={16} />
              </a>
            </div>
            <div className="flex overflow-x-auto pb-4 space-x-4">
              {newArrivals.map(product => (
                <div key={product.id} className="flex-shrink-0 w-40 md:w-56">
                  <div className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow">
                    <div className="p-4">
                      <img src={product.image} alt={product.name} className="w-full h-32 object-contain mb-4" />
                      <h3 className="font-medium text-sm mb-1 line-clamp-2">{product.name}</h3>
                      <p className="text-blue-600 font-semibold">{product.price}</p>
                      <div className="mt-2">
                        <span className="bg-red-100 text-red-600 text-xs px-2 py-1 rounded">Mới</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Featured Products */}
        <div className="bg-white">
          <div className="container mx-auto px-4 py-8">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">Sản Phẩm Nổi Bật</h2>
              <a href="#" className="text-blue-600 hover:underline flex items-center">
                Xem tất cả <ChevronRight size={16} />
              </a>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
              {featuredProducts.map(product => (
                <div key={product.id} className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow border">
                  <div className="p-4">
                    <div className="relative">
                      <img src={product.image} alt={product.name} className="w-full h-40 md:h-48 object-contain mb-4" />
                      <button className="absolute top-0 right-0 p-1 text-gray-400 hover:text-red-500">
                        <Heart size={20} />
                      </button>
                    </div>
                    <h3 className="font-medium text-sm md:text-base mb-1 line-clamp-2 h-10">{product.name}</h3>
                    <div className="flex items-baseline mb-1">
                      <span className="text-blue-600 font-semibold">{product.price}</span>
                      <span className="text-gray-400 text-sm line-through ml-2">{product.discount}</span>
                    </div>
                    <RatingStars rating={product.rating} />
                    <button className="mt-3 w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition-colors">
                      Thêm vào giỏ
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Banners Grid */}
        <div className="bg-gray-50">
          <div className="container mx-auto px-4 py-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="relative rounded-lg overflow-hidden h-48">
                <img src="/api/placeholder/600/200" alt="Khuyến mãi laptop" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center p-6">
                  <div className="text-white">
                    <h3 className="text-xl font-bold mb-2">Laptop giảm đến 20%</h3>
                    <p className="mb-4">Ưu đãi đặc biệt cho sinh viên</p>
                    <button className="bg-white text-blue-600 px-4 py-2 rounded-md hover:bg-gray-100">
                      Xem ngay
                    </button>
                  </div>
                </div>
              </div>
              <div className="relative rounded-lg overflow-hidden h-48">
                <img src="/api/placeholder/600/200" alt="Khuyến mãi điện thoại" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center p-6">
                  <div className="text-white">
                    <h3 className="text-xl font-bold mb-2">Điện thoại trả góp 0%</h3>
                    <p className="mb-4">Trả trước chỉ từ 20%</p>
                    <button className="bg-white text-blue-600 px-4 py-2 rounded-md hover:bg-gray-100">
                      Xem ngay
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Featured Brands */}
        <div className="bg-white">
          <div className="container mx-auto px-4 py-8">
            <h2 className="text-2xl font-bold mb-6">Thương Hiệu Nổi Bật</h2>
            <div className="grid grid-cols-3 md:grid-cols-6 gap-4">
              {[...Array(6)].map((_, idx) => (
                <div key={idx} className="border rounded-lg p-4 flex items-center justify-center h-20">
                  <img src={`/api/placeholder/80/40`} alt={`Brand ${idx+1}`} className="max-h-full" />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Blog Posts */}
        <div className="bg-gray-50">
          <div className="container mx-auto px-4 py-8">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">Tin Tức Công Nghệ</h2>
              <a href="#" className="text-blue-600 hover:underline flex items-center">
                Xem tất cả <ChevronRight size={16} />
              </a>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[...Array(3)].map((_, idx) => (
                <div key={idx} className="bg-white rounded-lg shadow-sm overflow-hidden">
                  <img src={`/api/placeholder/400/200`} alt={`Blog ${idx+1}`} className="w-full h-48 object-cover" />
                  <div className="p-4">
                    <h3 className="font-semibold text-lg mb-2">Top 10 điện thoại đáng mua năm 2025</h3>
                    <p className="text-gray-600 mb-3 line-clamp-3">
                      Khám phá những mẫu điện thoại mới nhất với công nghệ đột phá và hiệu năng vượt trội...
                    </p>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-500">24/03/2025</span>
                      <a href="#" className="text-blue-600 hover:underline">Đọc tiếp</a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white">
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">ElectroShop</h3>
              <p className="mb-4">Chuyên cung cấp các sản phẩm điện tử chính hãng với giá tốt nhất thị trường.</p>
              <div className="flex space-x-4">
                <a href="#" className="hover:text-blue-400">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd"></path>
                  </svg>
                </a>
                <a href="#" className="hover:text-blue-400">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"></path>
                  </svg>
                </a>
                <a href="#" className="hover:text-blue-400">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd"></path>
                  </svg>
                </a>
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Danh Mục Sản Phẩm</h3>
              <ul className="space-y-2">
                {categories.map(category => (
                  <li key={category.id}>
                    <a href="#" className="hover:text-blue-400">
                      {category.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">Hỗ Trợ Khách Hàng</h3>
              <ul className="space-y-2">
                <li><a href="#" className="hover:text-blue-400">Hướng dẫn mua hàng</a></li>
                <li><a href="#" className="hover:text-blue-400">Chính sách bảo hành</a></li>
                <li><a href="#" className="hover:text-blue-400">Chính sách đổi trả</a></li>
                <li><a href="#" className="hover:text-blue-400">Câu hỏi thường gặp</a></li>
                <li><a href="#" className="hover:text-blue-400">Liên hệ hỗ trợ</a></li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">Thông Tin Liên Hệ</h3>
              <ul className="space-y-2">
                <li>Địa chỉ: 123 Đường Công Nghệ, TP.HCM</li>
                <li>Hotline: 1800 1234</li>
                <li>Email: support@electroshop.com</li>
                <li>Thời gian làm việc: 8:00 - 22:00</li>
              </ul>
            </div>
          </div>

          {/* Footer bottom */}
          <div className="border-t border-gray-800 mt-8 pt-6 text-center">
            <p className="text-sm">
              © 2025 ElectroShop. All rights reserved. Designed by xAI Team.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}