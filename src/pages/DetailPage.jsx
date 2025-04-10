import React, { useState, useEffect } from 'react';
import { Search, ShoppingCart, Menu, X, Heart, User, ChevronDown, ChevronRight, ChevronUp, Filter, SlidersHorizontal, Check } from 'lucide-react';

// Data mẫu
const categoryData = {
  id: 1,
  name: 'Điện thoại',
  description: 'Khám phá các mẫu điện thoại mới nhất với công nghệ hiện đại',
  subcategories: ['iPhone', 'Samsung', 'Xiaomi', 'OPPO', 'Vivo', 'Realme', 'Nokia'],
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
  ],
  priceRanges: [
    { id: 1, name: 'Dưới 5 triệu', min: 0, max: 5000000 },
    { id: 2, name: '5 - 10 triệu', min: 5000000, max: 10000000 },
    { id: 3, name: '10 - 15 triệu', min: 10000000, max: 15000000 },
    { id: 4, name: '15 - 20 triệu', min: 15000000, max: 20000000 },
    { id: 5, name: 'Trên 20 triệu', min: 20000000, max: Infinity },
  ],
  brands: ['Apple', 'Samsung', 'Xiaomi', 'OPPO', 'Vivo', 'Realme', 'Nokia'],
  features: [
    { id: 1, name: 'RAM', options: ['4GB', '6GB', '8GB', '12GB'] },
    { id: 2, name: 'Bộ nhớ trong', options: ['64GB', '128GB', '256GB', '512GB', '1TB'] },
    { id: 3, name: 'Kích thước màn hình', options: ['Dưới 6 inch', '6.1 - 6.5 inch', 'Trên 6.5 inch'] },
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
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [hoveredCategory, setHoveredCategory] = useState(null);
  const [sortOption, setSortOption] = useState('featured');
  const [viewMode, setViewMode] = useState('grid');
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(8);
  const [selectedPriceRanges, setSelectedPriceRanges] = useState([]);
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [selectedFeatures, setSelectedFeatures] = useState({});
  const [inStockOnly, setInStockOnly] = useState(false);
  const [filteredProducts, setFilteredProducts] = useState(categoryData.products);
  const [openFilterSection, setOpenFilterSection] = useState({
    price: true,
    brand: true,
    features: {}
  });

  // Khởi tạo state cho features filter
  useEffect(() => {
    const initialFeatures = {};
    categoryData.features.forEach(feature => {
      initialFeatures[feature.id] = false;
    });
    setOpenFilterSection(prev => ({
      ...prev,
      features: initialFeatures
    }));
  }, []);

  // Lọc và sắp xếp sản phẩm
  useEffect(() => {
    let result = [...categoryData.products];

    if (inStockOnly) {
      result = result.filter(product => product.inStock);
    }

    if (selectedPriceRanges.length > 0) {
      result = result.filter(product => {
        const productPrice = parseInt(product.price.replace(/\./g, '').replace('đ', ''));
        return selectedPriceRanges.some(rangeId => {
          const range = categoryData.priceRanges.find(r => r.id === rangeId);
          return productPrice >= range.min && productPrice <= range.max;
        });
      });
    }

    if (selectedBrands.length > 0) {
      result = result.filter(product => selectedBrands.includes(product.brand));
    }

    Object.entries(selectedFeatures).forEach(([featureId, selectedOptions]) => {
      if (selectedOptions.length > 0) {
        result = result.filter(product => {
          return product.features.some(feat => selectedOptions.includes(feat));
        });
      }
    });

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

    setFilteredProducts(result);
    setCurrentPage(1);
  }, [selectedPriceRanges, selectedBrands, selectedFeatures, inStockOnly, sortOption]);

  // Phân trang
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Xử lý bộ lọc
  const toggleFilterSection = (section) => {
    setOpenFilterSection(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const toggleFeatureSection = (featureId) => {
    setOpenFilterSection(prev => ({
      ...prev,
      features: {
        ...prev.features,
        [featureId]: !prev.features[featureId]
      }
    }));
  };

  const handlePriceChange = (priceRangeId) => {
    setSelectedPriceRanges(prev => 
      prev.includes(priceRangeId) 
        ? prev.filter(id => id !== priceRangeId)
        : [...prev, priceRangeId]
    );
  };

  const handleBrandChange = (brand) => {
    setSelectedBrands(prev => 
      prev.includes(brand) 
        ? prev.filter(b => b !== brand)
        : [...prev, brand]
    );
  };

  const handleFeatureChange = (featureId, option) => {
    setSelectedFeatures(prev => {
      const currentOptions = prev[featureId] || [];
      return {
        ...prev,
        [featureId]: currentOptions.includes(option)
          ? currentOptions.filter(opt => opt !== option)
          : [...currentOptions, option]
      };
    });
  };

  const handleInStockChange = () => setInStockOnly(prev => !prev);

  const clearAllFilters = () => {
    setSelectedPriceRanges([]);
    setSelectedBrands([]);
    setSelectedFeatures({});
    setInStockOnly(false);
  };

  const activeFilterCount = selectedPriceRanges.length + selectedBrands.length + 
    Object.values(selectedFeatures).reduce((acc, curr) => acc + curr.length, 0) + 
    (inStockOnly ? 1 : 0);

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

      {/* Mobile filters */}
      {mobileFiltersOpen && (
        <div className="fixed inset-0 z-40 bg-black bg-opacity-50" onClick={() => setMobileFiltersOpen(false)}>
          <div className="fixed inset-y-0 left-0 max-w-xs w-full bg-white shadow-xl p-4 z-50 overflow-y-auto" onClick={e => e.stopPropagation()}>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Bộ lọc</h2>
              <button onClick={() => setMobileFiltersOpen(false)}>
                <X size={24} />
              </button>
            </div>
            <div className="space-y-4">
              <div className="pb-2">
                <button onClick={clearAllFilters} className="text-blue-600 text-sm font-medium hover:underline">
                  Xóa tất cả bộ lọc
                </button>
              </div>
              <div className="border-t pt-4">
                <div className="flex items-center mb-2">
                  <input type="checkbox" id="mobile-inStock" checked={inStockOnly} onChange={handleInStockChange} className="h-4 w-4 text-blue-600 rounded" />
                  <label htmlFor="mobile-inStock" className="ml-2 text-gray-700">Còn hàng</label>
                </div>
              </div>
              <div className="border-t pt-4">
                <div className="flex justify-between items-center cursor-pointer mb-2" onClick={() => toggleFilterSection('price')}>
                  <h3 className="font-medium">Giá</h3>
                  {openFilterSection.price ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                </div>
                {openFilterSection.price && (
                  <div className="space-y-2 mt-2 ml-1">
                    {categoryData.priceRanges.map(range => (
                      <div key={range.id} className="flex items-center">
                        <input type="checkbox" id={`mobile-price-${range.id}`} checked={selectedPriceRanges.includes(range.id)} onChange={() => handlePriceChange(range.id)} className="h-4 w-4 text-blue-600 rounded" />
                        <label htmlFor={`mobile-price-${range.id}`} className="ml-2 text-gray-700">{range.name}</label>
                      </div>
                    ))}
                  </div>
                )}
              </div>
              <div className="border-t pt-4">
                <div className="flex justify-between items-center cursor-pointer mb-2" onClick={() => toggleFilterSection('brand')}>
                  <h3 className="font-medium">Thương hiệu</h3>
                  {openFilterSection.brand ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                </div>
                {openFilterSection.brand && (
                  <div className="space-y-2 mt-2 ml-1">
                    {categoryData.brands.map(brand => (
                      <div key={brand} className="flex items-center">
                        <input type="checkbox" id={`mobile-brand-${brand}`} checked={selectedBrands.includes(brand)} onChange={() => handleBrandChange(brand)} className="h-4 w-4 text-blue-600 rounded" />
                        <label htmlFor={`mobile-brand-${brand}`} className="ml-2 text-gray-700">{brand}</label>
                      </div>
                    ))}
                  </div>
                )}
              </div>
              {categoryData.features.map(feature => (
                <div key={feature.id} className="border-t pt-4">
                  <div className="flex justify-between items-center cursor-pointer mb-2" onClick={() => toggleFeatureSection(feature.id)}>
                    <h3 className="font-medium">{feature.name}</h3>
                    {openFilterSection.features[feature.id] ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                  </div>
                  {openFilterSection.features[feature.id] && (
                    <div className="space-y-2 mt-2 ml-1">
                      {feature.options.map((option, idx) => (
                        <div key={idx} className="flex items-center">
                          <input
                            type="checkbox"
                            id={`mobile-feature-${feature.id}-${idx}`}
                            checked={selectedFeatures[feature.id]?.includes(option) || false}
                            onChange={() => handleFeatureChange(feature.id, option)}
                            className="h-4 w-4 text-blue-600 rounded"
                          />
                          <label htmlFor={`mobile-feature-${feature.id}-${idx}`} className="ml-2 text-gray-700">{option}</label>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
              <div className="border-t pt-4 pb-4">
                <button onClick={() => setMobileFiltersOpen(false)} className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700">
                  Áp dụng
                </button>
              </div>
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
                <a href="#" className={`flex items-center ${category.id === categoryData.id ? 'text-blue-600 font-medium' : 'text-gray-700 hover:text-blue-600'}`}>
                  {category.name}
                  <ChevronDown size={16} className="ml-1" />
                </a>
                {hoveredCategory === category.id && (
                  <div className="absolute left-0 mt-2 bg-white border shadow-md rounded-md py-2 z-20 w-48">
                    {categoryData.subcategories.map((sub, idx) => (
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

      {/* Breadcrumbs */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-2">
          <div className="flex items-center text-sm">
            <a href="/" className="text-gray-500 hover:text-blue-600">Trang chủ</a>
            <span className="mx-2 text-gray-400">/</span>
            <span className="text-gray-700 font-medium">{categoryData.name}</span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row">
          {/* Sidebar Desktop */}
          <div className="hidden md:block w-64 flex-shrink-0 pr-6">
            <div className="bg-white rounded-lg shadow-sm p-4 mb-4">
              <h2 className="font-bold text-lg mb-4">Bộ lọc sản phẩm</h2>
              <div className="mb-4">
                <button onClick={clearAllFilters} className="text-blue-600 text-sm font-medium hover:underline">Xóa tất cả bộ lọc</button>
              </div>
              <div className="border-t pt-4">
                <div className="flex items-center mb-2">
                  <input type="checkbox" id="inStock" checked={inStockOnly} onChange={handleInStockChange} className="h-4 w-4 text-blue-600 rounded" />
                  <label htmlFor="inStock" className="ml-2 text-gray-700">Còn hàng</label>
                </div>
              </div>
              <div className="border-t pt-4">
                <div className="flex justify-between items-center cursor-pointer mb-2" onClick={() => toggleFilterSection('price')}>
                  <h3 className="font-medium">Giá</h3>
                  {openFilterSection.price ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                </div>
                {openFilterSection.price && (
                  <div className="space-y-2 mt-2 ml-1">
                    {categoryData.priceRanges.map(range => (
                      <div key={range.id} className="flex items-center">
                        <input type="checkbox" id={`price-${range.id}`} checked={selectedPriceRanges.includes(range.id)} onChange={() => handlePriceChange(range.id)} className="h-4 w-4 text-blue-600 rounded" />
                        <label htmlFor={`price-${range.id}`} className="ml-2 text-gray-700">{range.name}</label>
                      </div>
                    ))}
                  </div>
                )}
              </div>
              <div className="border-t pt-4">
                <div className="flex justify-between items-center cursor-pointer mb-2" onClick={() => toggleFilterSection('brand')}>
                  <h3 className="font-medium">Thương hiệu</h3>
                  {openFilterSection.brand ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                </div>
                {openFilterSection.brand && (
                  <div className="space-y-2 mt-2 ml-1">
                    {categoryData.brands.map(brand => (
                      <div key={brand} className="flex items-center">
                        <input type="checkbox" id={`brand-${brand}`} checked={selectedBrands.includes(brand)} onChange={() => handleBrandChange(brand)} className="h-4 w-4 text-blue-600 rounded" />
                        <label htmlFor={`brand-${brand}`} className="ml-2 text-gray-700">{brand}</label>
                      </div>
                    ))}
                  </div>
                )}
              </div>
              {categoryData.features.map(feature => (
                <div key={feature.id} className="border-t pt-4">
                  <div className="flex justify-between items-center cursor-pointer mb-2" onClick={() => toggleFeatureSection(feature.id)}>
                    <h3 className="font-medium">{feature.name}</h3>
                    {openFilterSection.features[feature.id] ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                  </div>
                  {openFilterSection.features[feature.id] && (
                    <div className="space-y-2 mt-2 ml-1">
                      {feature.options.map((option, idx) => (
                        <div key={idx} className="flex items-center">
                          <input
                            type="checkbox"
                            id={`feature-${feature.id}-${idx}`}
                            checked={selectedFeatures[feature.id]?.includes(option) || false}
                            onChange={() => handleFeatureChange(feature.id, option)}
                            className="h-4 w-4 text-blue-600 rounded"
                          />
                          <label htmlFor={`feature-${feature.id}-${idx}`} className="ml-2 text-gray-700">{option}</label>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Product Listing */}
          <div className="flex-1">
            <div className="mb-6">
              <h1 className="text-2xl md:text-3xl font-bold text-gray-800">{categoryData.name}</h1>
              <p className="text-gray-600 mt-2">{categoryData.description}</p>
            </div>
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 bg-white p-4 rounded-lg shadow-sm">
              <div className="flex items-center space-x-4 mb-4 md:mb-0">
                <button className="md:hidden flex items-center text-gray-700 hover:text-blue-600" onClick={() => setMobileFiltersOpen(true)}>
                  <Filter size={20} className="mr-2" /> Bộ lọc {activeFilterCount > 0 && `(${activeFilterCount})`}
                </button>
                <div className="flex items-center">
                  <span className="text-gray-600 mr-2">Hiển thị:</span>
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
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-gray-600">Sắp xếp:</span>
                <select value={sortOption} onChange={e => setSortOption(e.target.value)} className="border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <option value="featured">Nổi bật</option>
                  <option value="price-asc">Giá: Thấp đến Cao</option>
                  <option value="price-desc">Giá: Cao đến Thấp</option>
                  <option value="name-asc">Tên: A-Z</option>
                  <option value="name-desc">Tên: Z-A</option>
                  <option value="rating">Đánh giá cao nhất</option>
                </select>
              </div>
            </div>
            {filteredProducts.length === 0 ? (
              <div className="text-center py-10">
                <p className="text-gray-600">Không tìm thấy sản phẩm nào phù hợp với bộ lọc.</p>
              </div>
            ) : (
              <div className={viewMode === 'grid' ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6" : "space-y-4"}>
                {currentProducts.map(product => (
                  <div key={product.id} className={`bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow ${viewMode === 'list' ? 'flex' : ''}`}>
                    <div className={viewMode === 'list' ? 'w-1/3 pr-4' : ''}>
                      <img src={product.image} alt={product.name} className="w-full h-48 object-cover rounded-md" />
                    </div>
                    <div className={viewMode === 'list' ? 'w-2/3' : ''}>
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
                      <button className="mt-3 w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700">Thêm vào giỏ</button>
                    </div>
                  </div>
                ))}
              </div>
            )}
            {totalPages > 1 && (
              <div className="flex justify-center mt-6 space-x-2">
                <button onClick={() => paginate(currentPage - 1)} disabled={currentPage === 1} className="px-3 py-1 border rounded-md disabled:opacity-50">Trước</button>
                {Array.from({ length: totalPages }, (_, i) => (
                  <button key={i + 1} onClick={() => paginate(i + 1)} className={`px-3 py-1 border rounded-md ${currentPage === i + 1 ? 'bg-blue-600 text-white' : 'bg-white'}`}>
                    {i + 1}
                  </button>
                ))}
                <button onClick={() => paginate(currentPage + 1)} disabled={currentPage === totalPages} className="px-3 py-1 border rounded-md disabled:opacity-50">Sau</button>
              </div>
            )}
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