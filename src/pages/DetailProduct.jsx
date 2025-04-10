import React, { useState } from 'react';
import { Search, ShoppingCart, Menu, X, Heart, User, ChevronDown, ChevronRight, Star } from 'lucide-react';

// Dữ liệu mẫu (dựa trên categoryData từ trang danh mục)
const productData = {
  id: 1,
  name: 'iPhone 15 Pro Max',
  price: '32.990.000đ',
  oldPrice: '34.990.000đ',
  images: [
    '/api/placeholder/400/400',
    '/api/placeholder/400/400',
    '/api/placeholder/400/400',
  ],
  rating: 5,
  brand: 'Apple',
  inStock: true,
  description: 'iPhone 15 Pro Max mang đến trải nghiệm đỉnh cao với thiết kế titan sang trọng, chip A17 Pro mạnh mẽ và hệ thống camera tiên tiến.',
  specifications: {
    'Màn hình': '6.7 inch, Super Retina XDR',
    'Chip': 'A17 Pro',
    'RAM': '8GB',
    'Bộ nhớ trong': '512GB',
    'Hệ điều hành': 'iOS 17',
    'Camera sau': '48MP + 12MP + 12MP',
    'Camera trước': '12MP',
    'Pin': '4422 mAh, sạc nhanh 20W',
  },
  reviews: [
    { id: 1, user: 'Nguyễn Văn A', rating: 5, comment: 'Sản phẩm tuyệt vời, camera chụp ảnh đẹp, hiệu năng mạnh mẽ!', date: '2025-04-01' },
    { id: 2, user: 'Trần Thị B', rating: 4, comment: 'Thiết kế đẹp, pin dùng được cả ngày, nhưng giá hơi cao.', date: '2025-03-28' },
  ],
  relatedProducts: [
    { id: 5, name: 'iPhone 15', price: '21.990.000đ', image: '/api/placeholder/200/200', rating: 4.5 },
    { id: 10, name: 'iPhone 14 Pro Max', price: '26.990.000đ', image: '/api/placeholder/200/200', rating: 4.5 },
  ],
};

const categories = [
  { id: 1, name: 'Điện thoại' },
  { id: 2, name: 'Laptop' },
  { id: 3, name: 'Máy tính bảng' },
  { id: 4, name: 'Tai nghe' },
  { id: 5, name: 'Đồng hồ thông minh' },
];

export default function ProductDetailPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [hoveredCategory, setHoveredCategory] = useState(null);
  const [selectedImage, setSelectedImage] = useState(productData.images[0]);
  const [quantity, setQuantity] = useState(1);

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
            <div className="flex items-center">
              <button className="mr-2 md:hidden" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
                {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
              <a href="/">
                <h1 className="text-2xl font-bold text-blue-600">ElectroShop</h1>
              </a>
            </div>
            <div className="hidden md:flex flex-grow mx-8 relative">
              <input type="text" placeholder="Tìm kiếm sản phẩm..." className="w-full py-2 px-4 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
              <button className="bg-blue-600 text-white p-2 rounded-r-md hover:bg-blue-700">
                <Search size={20} />
              </button>
            </div>
            <div className="flex items-center space-x-4">
              <a href="#" className="hidden md:flex items-center text-gray-700 hover:text-blue-600">
                <User size={20} className="mr-1" /> Tài khoản
              </a>
              <a href="#" className="hidden md:flex items-center text-gray-700 hover:text-blue-600">
                <Heart size={20} className="mr-1" /> Yêu thích
              </a>
              <a href="#" className="flex items-center text-gray-700 hover:text-blue-600 relative">
                <ShoppingCart size={20} className="mr-1" />
                <span className="hidden md:inline">Giỏ hàng</span>
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">3</span>
              </a>
            </div>
          </div>
          <div className="md:hidden pb-4">
            <div className="flex relative">
              <input type="text" placeholder="Tìm kiếm sản phẩm..." className="w-full py-2 px-4 border border-gray-300 rounded-l-md focus:outline-none" />
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
                <a key={category.id} href="#" className="block py-2 px-3 text-gray-700 hover:bg-gray-100 rounded-md">{category.name}</a>
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
            {categories.map(category => (
              <div key={category.id} className="relative group" onMouseEnter={() => setHoveredCategory(category.id)} onMouseLeave={() => setHoveredCategory(null)}>
                <a href="#" className={`flex items-center ${category.id === 1 ? 'text-blue-600 font-medium' : 'text-gray-700 hover:text-blue-600'}`}>
                  {category.name}
                  <ChevronDown size={16} className="ml-1" />
                </a>
              </div>
            ))}
            <a href="#" className="text-gray-700 hover:text-blue-600 flex items-center">Khuyến mãi HOT</a>
          </div>
        </div>
      </nav>

      {/* Breadcrumbs */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-2">
          <div className="flex items-center text-sm">
            <a href="/" className="text-gray-500 hover:text-blue-600">Trang chủ</a>
            <span className="mx-2 text-gray-400">/</span>
            <a href="#" className="text-gray-500 hover:text-blue-600">Điện thoại</a>
            <span className="mx-2 text-gray-400">/</span>
            <span className="text-gray-700 font-medium">{productData.name}</span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Product Images */}
          <div className="lg:w-1/2">
            <div className="bg-white rounded-lg shadow-md p-4">
              <img src={selectedImage} alt={productData.name} className="w-full h-96 object-cover rounded-md" />
              <div className="flex gap-2 mt-4 justify-center">
                {productData.images.map((img, idx) => (
                  <img
                    key={idx}
                    src={img}
                    alt={`${productData.name} ${idx + 1}`}
                    className={`w-20 h-20 object-cover rounded-md cursor-pointer border-2 ${selectedImage === img ? 'border-blue-600' : 'border-gray-200'}`}
                    onClick={() => setSelectedImage(img)}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Product Details */}
          <div className="lg:w-1/2">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">{productData.name}</h1>
              <div className="flex items-center mb-4">
                <RatingStars rating={productData.rating} />
                <span className="ml-2 text-gray-600">({productData.reviews.length} đánh giá)</span>
              </div>
              <div className="mb-4">
                <span className="text-red-600 font-bold text-2xl">{productData.price}</span>
                {productData.oldPrice && <span className="text-gray-500 line-through ml-2">{productData.oldPrice}</span>}
              </div>
              <p className="text-gray-600 mb-4">{productData.description}</p>
              <div className="mb-4">
                <span className={`text-sm ${productData.inStock ? 'text-green-600' : 'text-red-600'}`}>
                  {productData.inStock ? 'Còn hàng' : 'Hết hàng'}
                </span>
              </div>
              <div className="flex items-center mb-4">
                <span className="text-gray-700 mr-4">Số lượng:</span>
                <div className="flex items-center border rounded-md">
                  <button
                    onClick={() => setQuantity(prev => Math.max(1, prev - 1))}
                    className="px-3 py-1 text-gray-700 hover:bg-gray-100"
                  >
                    -
                  </button>
                  <input
                    type="number"
                    value={quantity}
                    onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                    className="w-12 text-center border-none focus:outline-none"
                  />
                  <button
                    onClick={() => setQuantity(prev => prev + 1)}
                    className="px-3 py-1 text-gray-700 hover:bg-gray-100"
                  >
                    +
                  </button>
                </div>
              </div>
              <div className="flex gap-4">
                <button className="flex-1 bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700">
                  Thêm vào giỏ hàng
                </button>
                <button className="flex-1 bg-orange-600 text-white py-3 rounded-md hover:bg-orange-700">
                  Mua ngay
                </button>
              </div>
            </div>

            {/* Specifications */}
            <div className="bg-white rounded-lg shadow-md p-6 mt-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4">Thông số kỹ thuật</h2>
              <table className="w-full text-gray-700">
                <tbody>
                  {Object.entries(productData.specifications).map(([key, value]) => (
                    <tr key={key} className="border-b">
                      <td className="py-2 font-medium">{key}</td>
                      <td className="py-2">{value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Reviews */}
        <div className="bg-white rounded-lg shadow-md p-6 mt-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Đánh giá sản phẩm</h2>
          {productData.reviews.length === 0 ? (
            <p className="text-gray-600">Chưa có đánh giá nào cho sản phẩm này.</p>
          ) : (
            <div className="space-y-4">
              {productData.reviews.map(review => (
                <div key={review.id} className="border-b pb-4">
                  <div className="flex items-center mb-2">
                    <span className="font-medium mr-2">{review.user}</span>
                    <RatingStars rating={review.rating} />
                    <span className="text-gray-500 text-sm ml-2">{review.date}</span>
                  </div>
                  <p className="text-gray-600">{review.comment}</p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Related Products */}
        <div className="mt-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Sản phẩm liên quan</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {productData.relatedProducts.map(product => (
              <div key={product.id} className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow">
                <img src={product.image} alt={product.name} className="w-full h-48 object-cover rounded-md" />
                <h3 className="font-medium text-gray-800 hover:text-blue-600 cursor-pointer mt-2">{product.name}</h3>
                <RatingStars rating={product.rating} />
                <div className="mt-2">
                  <span className="text-red-600 font-bold text-lg">{product.price}</span>
                </div>
                <button className="mt-3 w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700">Thêm vào giỏ</button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8 mt-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="font-bold mb-4">ElectroShop</h3>
              <p className="text-sm">Cung cấp thiết bị điện tử chất lượng cao với giá tốt nhất.</p>
            </div>
            <div>
              <h3 className="font-bold mb-4">Danh mục</h3>
              {categories.map(cat => (
                <a key={cat.id} href="#" className="block text-sm hover:text-blue-400 mb-2">{cat.name}</a>
              ))}
            </div>
            <div>
              <h3 className="font-bold mb-4">Hỗ trợ</h3>
              <a href="#" className="block text-sm hover:text-blue-400 mb-2">Liên hệ</a>
              <a href="#" className="block text-sm hover:text-blue-400 mb-2">Chính sách bảo hành</a>
              <a href="#" className="block text-sm hover:text-blue-400 mb-2">Hướng dẫn mua hàng</a>
            </div>
            <div>
              <h3 className="font-bold mb-4">Liên hệ</h3>
              <p className="text-sm">Hotline: 1800 1234</p>
              <p className="text-sm">Email: support@electroshop.com</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}