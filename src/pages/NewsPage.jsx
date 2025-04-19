import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Filter, ChevronDown, ChevronUp } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';

const categories = [
  { id: 1, name: 'Điện thoại' },
  { id: 2, name: 'Laptop' },
  { id: 3, name: 'Máy tính bảng' },
  { id: 4, name: 'Tai nghe' },
  { id: 5, name: 'Đồng hồ thông minh' },
];

// Dữ liệu tin tức giả lập
const newsData = [
  {
    id: 1,
    title: 'iPhone 16 Pro: Camera đột phá với AI',
    description: 'Apple ra mắt iPhone 16 Pro với công nghệ camera tích hợp AI, cải thiện khả năng chụp ảnh trong điều kiện thiếu sáng.',
    image: '/api/placeholder/400/300',
    date: '2025-04-15',
    author: 'Nguyễn Văn A',
    category: 'Điện thoại',
  },
  {
    id: 2,
    title: 'Laptop gaming ASUS ROG 2025: Hiệu năng vượt trội',
    description: 'ASUS giới thiệu dòng laptop gaming ROG 2025 với GPU RTX 5090 và màn hình 240Hz.',
    image: '/api/placeholder/400/300',
    date: '2025-04-10',
    author: 'Trần Thị B',
    category: 'Laptop',
  },
  {
    id: 3,
    title: 'iPad Pro M4: Sức mạnh của máy tính bảng',
    description: 'iPad Pro M4 mang đến hiệu năng ngang PC với chip M4 và hỗ trợ Apple Pencil Pro.',
    image: '/api/placeholder/400/300',
    date: '2025-04-05',
    author: 'Lê Văn C',
    category: 'Máy tính bảng',
  },
  {
    id: 4,
    title: 'Tai nghe Sony WH-1000XM6: Chống ồn đỉnh cao',
    description: 'Sony ra mắt tai nghe WH-1000XM6 với công nghệ chống ồn cải tiến và âm thanh Hi-Res.',
    image: '/api/placeholder/400/300',
    date: '2025-03-30',
    author: 'Phạm Thị D',
    category: 'Tai nghe',
  },
  {
    id: 5,
    title: 'Xu hướng công nghệ 2025: AI và Metaverse',
    description: 'AI và Metaverse sẽ định hình tương lai công nghệ trong năm 2025, theo các chuyên gia.',
    image: '/api/placeholder/400/300',
    date: '2025-03-25',
    author: 'Hoàng Văn E',
    category: 'Xu hướng',
  },
  {
    id: 6,
    title: 'Samsung Galaxy S25: Thiết kế mới, hiệu năng cũ?',
    description: 'Samsung công bố Galaxy S25 với thiết kế đột phá nhưng hiệu năng gây tranh cãi.',
    image: '/api/placeholder/400/300',
    date: '2025-03-20',
    author: 'Nguyễn Văn A',
    category: 'Điện thoại',
  },
  {
    id: 7,
    title: 'MacBook Air M3: Mỏng nhẹ, mạnh mẽ',
    description: 'MacBook Air M3 mang đến hiệu năng vượt trội trong thiết kế siêu mỏng nhẹ.',
    image: '/api/placeholder/400/300',
    date: '2025-03-15',
    author: 'Trần Thị B',
    category: 'Laptop',
  },
  {
    id: 8,
    title: 'AirPods Pro 3: Âm thanh không gian',
    description: 'AirPods Pro 3 cải tiến chất lượng âm thanh với tính năng không gian 360 độ.',
    image: '/api/placeholder/400/300',
    date: '2025-03-10',
    author: 'Lê Văn C',
    category: 'Tai nghe',
  },
  {
    id: 9,
    title: 'Đồng hồ thông minh Xiaomi Watch 2',
    description: 'Xiaomi ra mắt Watch 2 với pin 7 ngày và hỗ trợ theo dõi sức khỏe nâng cao.',
    image: '/api/placeholder/400/300',
    date: '2025-03-05',
    author: 'Phạm Thị D',
    category: 'Đồng hồ thông minh',
  },
  {
    id: 10,
    title: 'Công nghệ 6G: Tương lai của kết nối',
    description: '6G hứa hẹn tốc độ vượt trội và ứng dụng đột phá trong thập kỷ tới.',
    image: '/api/placeholder/400/300',
    date: '2025-03-01',
    author: 'Hoàng Văn E',
    category: 'Xu hướng',
  },
];

// Danh mục tin tức
const newsCategories = [
  'Điện thoại',
  'Laptop',
  'Máy tính bảng',
  'Tai nghe',
  'Đồng hồ thông minh',
  'Xu hướng',
];

const NewsPage = () => {
  // State
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [filteredNews, setFilteredNews] = useState(newsData);
  const [currentPage, setCurrentPage] = useState(1);
  const [newsPerPage] = useState(6);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [openFilterSection, setOpenFilterSection] = useState({ category: true });

  // Lọc tin tức theo danh mục
  useEffect(() => {
    let result = [...newsData];
    if (selectedCategories.length > 0) {
      result = result.filter(news => selectedCategories.includes(news.category));
    }
    setFilteredNews(result);
    setCurrentPage(1);
  }, [selectedCategories]);

  // Phân trang
  const indexOfLastNews = currentPage * newsPerPage;
  const indexOfFirstNews = indexOfLastNews - newsPerPage;
  const currentNews = filteredNews.slice(indexOfFirstNews, indexOfLastNews);
  const totalPages = Math.ceil(filteredNews.length / newsPerPage);
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Xử lý bộ lọc
  const handleCategoryChange = (category) => {
    setSelectedCategories(prev =>
      prev.includes(category)
        ? prev.filter(c => c !== category)
        : [...prev, category]
    );
  };

  const clearAllFilters = () => {
    setSelectedCategories([]);
  };

  const toggleFilterSection = () => {
    setOpenFilterSection(prev => ({
      ...prev,
      category: !prev.category,
    }));
  };

  const activeFilterCount = selectedCategories.length;

  return (
    <div className="min-h-screen bg-gray-50">
      <Header categories={categories} />

      {/* Hero Section */}
      <section className="relative bg-cover bg-center h-64 md:h-96" style={{ backgroundImage: 'url(/api/placeholder/1920/600)' }}>
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-3xl md:text-5xl font-bold text-white">Tin tức công nghệ</h1>
            <p className="mt-2 text-lg md:text-xl text-gray-200">Cập nhật xu hướng và sản phẩm công nghệ mới nhất</p>
          </div>
        </div>
      </section>

      {/* Breadcrumbs */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-2">
          <div className="flex items-center text-sm">
            <Link to="/" className="text-gray-500 hover:text-blue-600">Trang chủ</Link>
            <span className="mx-2 text-gray-400">/</span>
            <span className="text-gray-700 font-medium">Tin tức</span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row">
          {/* Sidebar Desktop */}
          <div className="hidden md:block w-64 flex-shrink-0 pr-6">
            <div className="bg-white rounded-lg shadow-sm p-4 mb-4">
              <h2 className="font-bold text-lg mb-4">Bộ lọc tin tức</h2>
              <div className="mb-4">
                <button onClick={clearAllFilters} className="text-blue-600 text-sm font-medium hover:underline">
                  Xóa tất cả bộ lọc
                </button>
              </div>
              <div className="border-t pt-4">
                <div className="flex justify-between items-center cursor-pointer mb-2" onClick={toggleFilterSection}>
                  <h3 className="font-medium">Danh mục tin tức</h3>
                  {openFilterSection.category ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                </div>
                {openFilterSection.category && (
                  <div className="space-y-2 mt-2 ml-1">
                    {newsCategories.map(category => (
                      <div key={category} className="flex items-center">
                        <input
                          type="checkbox"
                          id={`category-${category}`}
                          checked={selectedCategories.includes(category)}
                          onChange={() => handleCategoryChange(category)}
                          className="h-4 w-4 text-blue-600 rounded"
                        />
                        <label htmlFor={`category-${category}`} className="ml-2 text-gray-700">{category}</label>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* News Listing */}
          <div className="flex-1">
            <div className="flex justify-between items-center mb-6 bg-white p-4 rounded-lg shadow-sm">
              <button
                className="md:hidden flex items-center text-gray-700 hover:text-blue-600"
                onClick={() => setMobileFiltersOpen(true)}
              >
                <Filter size={20} className="mr-2" />
                Bộ lọc {activeFilterCount > 0 && `(${activeFilterCount})`}
              </button>
              <div className="text-gray-600">
                {filteredNews.length} tin tức
              </div>
            </div>
            {filteredNews.length === 0 ? (
              <div className="text-center py-10">
                <p className="text-gray-600">Không tìm thấy tin tức nào phù hợp.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {currentNews.map(news => (
                  <div
                    key={news.id}
                    className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow"
                  >
                    <img
                      src={news.image}
                      alt={news.title}
                      className="w-full h-48 object-cover rounded-md mb-4"
                    />
                    <div className="text-sm text-gray-500 mb-2">
                      {news.date} | {news.author}
                    </div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">{news.title}</h3>
                    <p className="text-gray-600 text-sm line-clamp-3">{news.description}</p>
                    <button
                      onClick={() => alert('Chi tiết bài viết chưa khả dụng')}
                      className="mt-4 text-blue-600 hover:text-blue-800 font-medium"
                    >
                      Đọc thêm
                    </button>
                  </div>
                ))}
              </div>
            )}
            {totalPages > 1 && (
              <div className="flex justify-center mt-6 space-x-2">
                <button
                  onClick={() => paginate(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="px-3 py-1 border rounded-md disabled:opacity-50"
                >
                  Trước
                </button>
                {Array.from({ length: totalPages }, (_, i) => (
                  <button
                    key={i + 1}
                    onClick={() => paginate(i + 1)}
                    className={`px-3 py-1 border rounded-md ${
                      currentPage === i + 1 ? 'bg-blue-600 text-white' : 'bg-white'
                    }`}
                  >
                    {i + 1}
                  </button>
                ))}
                <button
                  onClick={() => paginate(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="px-3 py-1 border rounded-md disabled:opacity-50"
                >
                  Sau
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Filters */}
      {mobileFiltersOpen && (
        <div
          className="fixed inset-0 z-40 bg-black bg-opacity-50 md:hidden"
          onClick={() => setMobileFiltersOpen(false)}
        >
          <div
            className="fixed inset-y-0 left-0 w-3/4 max-w-sm bg-white p-4 overflow-y-auto"
            onClick={e => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-4">
              <h2 className="font-bold text-lg">Bộ lọc tin tức</h2>
              <button onClick={() => setMobileFiltersOpen(false)} className="text-gray-600">
                Đóng
              </button>
            </div>
            <div className="mb-4">
              <button
                onClick={clearAllFilters}
                className="text-blue-600 text-sm font-medium hover:underline"
              >
                Xóa tất cả bộ lọc
              </button>
            </div>
            <div className="border-t pt-4">
              <div className="flex justify-between items-center cursor-pointer mb-2" onClick={toggleFilterSection}>
                <h3 className="font-medium">Danh mục tin tức</h3>
                {openFilterSection.category ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
              </div>
              {openFilterSection.category && (
                <div className="space-y-2 mt-2 ml-1">
                  {newsCategories.map(category => (
                    <div key={category} className="flex items-center">
                      <input
                        type="checkbox"
                        id={`category-mobile-${category}`}
                        checked={selectedCategories.includes(category)}
                        onChange={() => handleCategoryChange(category)}
                        className="h-4 w-4 text-blue-600 rounded"
                      />
                      <label htmlFor={`category-mobile-${category}`} className="ml-2 text-gray-700">
                        {category}
                      </label>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      <Footer categories={categories} />
    </div>
  );
};

export default NewsPage;