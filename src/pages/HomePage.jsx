import React, { useState } from 'react';
import { ChevronRight, Heart } from 'lucide-react';
import { Link } from 'react-router-dom'; // Thêm import Link từ react-router-dom
import Header from '../components/Header';
import Footer from '../components/Footer';

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
  const [currentBanner, setCurrentBanner] = useState(0);

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
      <Header categories={categories} />
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
                      <Link 
                        to="/products/1" // Thay bằng link đến sản phẩm phù hợp
                        className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 inline-block"
                      >
                        Mua ngay
                      </Link>
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
                <Link 
                  to={`/products?category=${category.id}`} // Thay bằng link phù hợp
                  key={category.id} 
                  className="flex flex-col items-center p-4 border rounded-lg hover:shadow-md transition-shadow"
                >
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-2">
                    <img src={`/api/placeholder/32/32`} alt={category.name} className="w-8 h-8" />
                  </div>
                  <span className="text-center font-medium">{category.name}</span>
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* New Arrivals */}
        <div className="bg-gray-50">
          <div className="container mx-auto px-4 py-8">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">Sản Phẩm Mới</h2>
              <Link to="/newProducts" className="text-blue-600 hover:underline flex items-center">
                Xem tất cả <ChevronRight size={16} />
              </Link>
            </div>
            <div className="flex overflow-x-auto pb-4 space-x-4">
              {newArrivals.map(product => (
                <div key={product.id} className="flex-shrink-0 w-40 md:w-56">
                  <Link 
                    to={`/products/${product.id}`}
                    className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow block"
                  >
                    <div className="p-4">
                      <img src={product.image} alt={product.name} className="w-full h-32 object-contain mb-4" />
                      <h3 className="font-medium text-sm mb-1 line-clamp-2">{product.name}</h3>
                      <p className="text-blue-600 font-semibold">{product.price}</p>
                      <div className="mt-2">
                        <span className="bg-red-100 text-red-600 text-xs px-2 py-1 rounded">Mới</span>
                      </div>
                    </div>
                  </Link>
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
              <Link to="/products/featured" className="text-blue-600 hover:underline flex items-center">
                Xem tất cả <ChevronRight size={16} />
              </Link>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
              {featuredProducts.map(product => (
                <div key={product.id} className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow border">
                  <div className="p-4">
                    <div className="relative">
                      <Link to={`/products/${product.id}`}>
                        <img src={product.image} alt={product.name} className="w-full h-40 md:h-48 object-contain mb-4" />
                      </Link>
                      <button className="absolute top-0 right-0 p-1 text-gray-400 hover:text-red-500">
                        <Heart size={20} />
                      </button>
                    </div>
                    <Link to={`/products/${product.id}`}>
                      <h3 className="font-medium text-sm md:text-base mb-1 line-clamp-2 h-10">{product.name}</h3>
                    </Link>
                    <div className="flex items-baseline mb-1">
                      <span className="text-blue-600 font-semibold">{product.price}</span>
                      <span className="text-gray-400 text-sm line-through ml-2">{product.discount}</span>
                    </div>
                    <RatingStars rating={product.rating} />
                    <Link 
                      to={`/products/${product.id}`}
                      className="mt-3 w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition-colors block text-center"
                    >
                      Thêm vào giỏ
                    </Link>
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
                    <Link 
                      to="/promotions/laptops" 
                      className="bg-white text-blue-600 px-4 py-2 rounded-md hover:bg-gray-100 inline-block"
                    >
                      Xem ngay
                    </Link>
                  </div>
                </div>
              </div>
              <div className="relative rounded-lg overflow-hidden h-48">
                <img src="/api/placeholder/600/200" alt="Khuyến mãi điện thoại" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center p-6">
                  <div className="text-white">
                    <h3 className="text-xl font-bold mb-2">Điện thoại trả góp 0%</h3>
                    <p className="mb-4">Trả trước chỉ từ 20%</p>
                    <Link 
                      to="/promotions/phones" 
                      className="bg-white text-blue-600 px-4 py-2 rounded-md hover:bg-gray-100 inline-block"
                    >
                      Xem ngay
                    </Link>
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
                <Link 
                  to={`/brands/${idx+1}`} 
                  key={idx} 
                  className="border rounded-lg p-4 flex items-center justify-center h-20 hover:shadow-md transition-shadow"
                >
                  <img src={`/api/placeholder/80/40`} alt={`Brand ${idx+1}`} className="max-h-full" />
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Blog Posts */}
        <div className="bg-gray-50">
          <div className="container mx-auto px-4 py-8">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">Tin Tức Công Nghệ</h2>
              <Link to="/blog" className="text-blue-600 hover:underline flex items-center">
                Xem tất cả <ChevronRight size={16} />
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[...Array(3)].map((_, idx) => (
                <Link 
                  to={`/blog/${idx+1}`} 
                  key={idx} 
                  className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow"
                >
                  <img src={`/api/placeholder/400/200`} alt={`Blog ${idx+1}`} className="w-full h-48 object-cover" />
                  <div className="p-4">
                    <h3 className="font-semibold text-lg mb-2">Top 10 điện thoại đáng mua năm 2025</h3>
                    <p className="text-gray-600 mb-3 line-clamp-3">
                      Khám phá những mẫu điện thoại mới nhất với công nghệ đột phá và hiệu năng vượt trội...
                    </p>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-500">24/03/2025</span>
                      <span className="text-blue-600 hover:underline">Đọc tiếp</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </main>
      <Footer categories={categories} />
    </div>
  );
}