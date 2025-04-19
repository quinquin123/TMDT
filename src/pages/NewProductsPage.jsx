import React, { useState, useEffect, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';
import { AuthContext } from '../context/AuthContext';

// Data mẫu
const categoryData = {
  id: 1,
  name: 'Sản phẩm mới',
  description: 'Các sản phẩm mới nhất và nổi bật nhất trong tháng này.',
  products: [
    { id: 1, name: 'iPhone 15 Pro Max', price: '32.990.000đ', oldPrice: '34.990.000đ', image: '/api/placeholder/200/200', rating: 5, brand: 'Apple', features: ['6.7 inch', '8GB RAM', '512GB', 'iOS 17'], inStock: true },
    { id: 2, name: 'Samsung Galaxy S24 Ultra', price: '28.990.000đ', oldPrice: '30.990.000đ', image: '/api/placeholder/200/200', rating: 4.5, brand: 'Samsung', features: ['6.8 inch', '12GB RAM', '256GB', 'Android 14'], inStock: true },
    { id: 3, name: 'Xiaomi 14 Ultra', price: '24.990.000đ', oldPrice: '27.990.000đ', image: '/api/placeholder/200/200', rating: 4.5, brand: 'Xiaomi', features: ['6.7 inch', '12GB RAM', '256GB', 'Android 14'], inStock: true },
    { id: 4, name: 'OPPO Find X7 Ultra', price: '21.990.000đ', oldPrice: '23.990.000đ', image: '/api/placeholder/200/200', rating: 4, brand: 'OPPO', features: ['6.8 inch', '12GB RAM', '256GB', 'Android 14'], inStock: false },
    { id: 5, name: 'iPhone 15', price: '21.990.000đ', oldPrice: '22.990.000đ', image: '/api/placeholder/200/200', rating: 4.5, brand: 'Apple', features: ['6.1 inch', '6GB RAM', '128GB', 'iOS 17'], inStock: true },
    { id: 6, name: 'Samsung Galaxy S24', price: '19.990.000đ', oldPrice: '20.990.000đ', image: '/api/placeholder/200/200', rating: 4, brand: 'Samsung', features: ['6.2 inch', '8GB RAM', '256GB', 'Android 14'], inStock: true },
    { id: 7, name: 'Xiaomi 14', price: '16.990.000đ', oldPrice: '18.990.000đ', image: '/api/placeholder/200/200', rating: 4, brand: 'Xiaomi', features: ['6.36 inch', '8GB RAM', '256GB', 'Android 14'], inStock: true },
    { id: 8, name: 'OPPO Reno 12 Pro', price: '14.990.000đ', oldPrice: '15.990.000đ', image: '/api/placeholder/200/200', rating: 3.5, brand: 'OPPO', features: ['6.7 inch', '8GB RAM', '256GB', 'Android 14'], inStock: true },
    { id: 9, name: 'Vivo X100 Pro', price: '22.990.000đ', oldPrice: '24.990.000đ', image: '/api/placeholder/200/200', rating: 4, brand: 'Vivo', features: ['6.78 inch', '12GB RAM', '256GB', 'Android 14'], inStock: true },
    { id: 10, name: 'iPhone 14 Pro Max', price: '26.990.000đ', oldPrice: '29.990.000đ', image: '/api/placeholder/200/200', rating: 4.5, brand: 'Apple', features: ['6.7 inch', '6GB RAM', '256GB', 'iOS 16'], inStock: false },
    { id: 11, name: 'Realme GT 6', price: '15.990.000đ', oldPrice: '16.990.000đ', image: '/api/placeholder/200/200', rating: 4, brand: 'Realme', features: ['6.78 inch', '8GB RAM', '256GB', 'Android 14'], inStock: true },
    { id: 12, name: 'Nokia X50', price: '9.990.000đ', oldPrice: '10.990.000đ', image: '/api/placeholder/200/200', rating: 3.5, brand: 'Nokia', features: ['6.5 inch', '6GB RAM', '128GB', 'Android 14'], inStock: true },
  ]
};

const categories = [
  { id: 1, name: 'Điện thoại' },
  { id: 2, name: 'Laptop' },
  { id: 3, name: 'Máy tính bảng' },
  { id: 4, name: 'Tai nghe' },
  { id: 5, name: 'Đồng hồ thông minh' },
];

export default function CategoryPage() {
  // State
  const { isLoggedIn } = useContext(AuthContext);
  const navigate = useNavigate();
  const [sortOption, setSortOption] = useState('featured');
  const [viewMode, setViewMode] = useState('grid');
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(8);
  const [sortedProducts, setSortedProducts] = useState(categoryData.products);

  // Xử lý thêm vào giỏ hàng
  const handleAddToCart = (product) => {
    if (!isLoggedIn) {
      navigate('/login');
      return;
    }
    alert(`Đã thêm ${product.name} vào giỏ hàng!`);
    // TODO: Thêm logic lưu sản phẩm vào giỏ hàng (ví dụ: cập nhật CartContext hoặc gọi API)
  };

  // Sắp xếp sản phẩm
  useEffect(() => {
    let result = [...categoryData.products];

    switch (sortOption) {
      case 'price-asc':
        result.sort((a, b) => parseInt(a.price.replace(/\./g, '').replace('đ', '')) - parseInt(b.price.replace(/\./g, '').replace('đ', '')));
        break;
      case 'price-desc':
        result.sort((a, b) => parseInt(b.price.replace(/\./g, '').replace('đ', '')) - parseInt(a.price.replace(/\./g, '').replace('đ', '')));
        break;
      case 'name-asc':
        result.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'name-desc':
        result.sort((a, b) => b.name.localeCompare(a.name));
        break;
      case 'rating':
        result.sort((a, b) => b.rating - a.rating);
        break;
      default:
        break;
    }

    setSortedProducts(result);
    setCurrentPage(1);
  }, [sortOption]);

  // Phân trang
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = sortedProducts.slice(indexOfFirstProduct, indexOfLastProduct);
  const totalPages = Math.ceil(sortedProducts.length / productsPerPage);
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Component RatingStars
  const RatingStars = ({ rating }) => (
    <div className="flex">
      {[...Array(5)].map((_, i) => (
        <span key={i} className={`text-sm ${i < rating ? 'text-yellow-500' : 'text-gray-300'}`}>★</span>
      ))}
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <Header categories={categories} />

      {/* Breadcrumbs */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-6 py-3">
          <div className="flex items-center text-sm">
            <Link to="/" className="text-gray-500 hover:text-blue-600">Trang chủ</Link>
            <span className="mx-2 text-gray-400">/</span>
            <span className="text-gray-700 font-medium">{categoryData.name}</span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-6 py-8">
        <div className="mb-8">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800">{categoryData.name}</h1>
          <p className="text-gray-600 mt-2">{categoryData.description}</p>
        </div>

        {/* Controls */}
        <div className="bg-white p-4 rounded-lg shadow-sm mb-6 flex flex-col sm:flex-row justify-between items-center">
          <div className="flex items-center space-x-4 mb-4 sm:mb-0">
            <span className="text-gray-600">Hiển thị:</span>
            <button onClick={() => setViewMode('grid')} className={`p-2 ${viewMode === 'grid' ? 'text-blue-600' : 'text-gray-600'}`}>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
            <button onClick={() => setViewMode('list')} className={`p-2 ${viewMode === 'list' ? 'text-blue-600' : 'text-gray-600'}`}>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 4h18M3 8h18M3 12h18M3 16h18M3 20h18" />
              </svg>
            </button>
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-gray-600">Sắp xếp:</span>
            <select
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value)}
              className="border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="featured">Nổi bật</option>
              <option value="price-asc">Giá: Thấp đến Cao</option>
              <option value="price-desc">Giá: Cao đến Thấp</option>
              <option value="name-asc">Tên: A-Z</option>
              <option value="name-desc">Tên: Z-A</option>
              <option value="rating">Đánh giá cao nhất</option>
            </select>
          </div>
        </div>

        {/* Product Listing */}
        {sortedProducts.length === 0 ? (
          <div className="text-center py-10">
            <p className="text-gray-600">Không có sản phẩm nào để hiển thị.</p>
          </div>
        ) : (
          <div className={viewMode === 'grid' ? 'grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8' : 'space-y-6'}>
            {currentProducts.map((product) => (
              <div
                key={product.id}
                className={`bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow ${viewMode === 'list' ? 'flex' : ''}`}
              >
                <div className={viewMode === 'list' ? 'w-1/4 pr-4' : ''}>
                  <img src={product.image} alt={product.name} className="w-full h-48 object-cover rounded-md" />
                </div>
                <div className={viewMode === 'list' ? 'w-3/4' : ''}>
                  <h3 className="font-medium text-gray-800 hover:text-blue-600 cursor-pointer">{product.name}</h3>
                  <RatingStars rating={product.rating} />
                  <div className="mt-2">
                    <span className="text-red-600 font-bold text-lg">{product.price}</span>
                    {product.oldPrice && <span className="text-gray-500 line-through ml-2">{product.oldPrice}</span>}
                  </div>
                  {viewMode === 'list' && (
                    <ul className="mt-2 text-sm text-gray-600">
                      {product.features.map((feature, idx) => (
                        <li key={idx}>{feature}</li>
                      ))}
                    </ul>
                  )}
                  <div className="mt-3">
                    <span className={`text-sm ${product.inStock ? 'text-green-600' : 'text-red-600'}`}>
                      {product.inStock ? 'Còn hàng' : 'Hết hàng'}
                    </span>
                  </div>
                  <button
                    onClick={() => handleAddToCart(product)}
                    className="mt-3 w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700"
                  >
                    Thêm vào giỏ
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center mt-8 space-x-2">
            <button
              onClick={() => paginate(currentPage - 1)}
              disabled={currentPage === 1}
              className="px-4 py-2 bg-white border rounded-md shadow-sm hover:bg-gray-100 disabled:opacity-50"
            >
              Trước
            </button>
            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i + 1}
                onClick={() => paginate(i + 1)}
                className={`px-4 py-2 border rounded-md shadow-sm ${currentPage === i + 1 ? 'bg-blue-600 text-white' : 'bg-white hover:bg-gray-100'}`}
              >
                {i + 1}
              </button>
            ))}
            <button
              onClick={() => paginate(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="px-4 py-2 bg-white border rounded-md shadow-sm hover:bg-gray-100 disabled:opacity-50"
            >
              Sau
            </button>
          </div>
        )}
      </div>

      <Footer categories={categories} />
    </div>
  );
}