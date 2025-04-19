import React, { useState, useContext } from 'react';
import { Search, ShoppingCart, Menu, X, Heart, User, LogOut } from 'lucide-react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const Header = ({ categories }) => {
  const { isLoggedIn, logout } = useContext(AuthContext);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    setMobileMenuOpen(false);
    navigate('/');
  };

  const handleSearch = () => {
    if (searchQuery.trim()) {
      navigate(`/detail?search=${encodeURIComponent(searchQuery)}`);
      setSearchQuery('');
      setMobileMenuOpen(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <>
      {/* Top bar */}
      <div className="bg-gray-900 text-white py-2 text-sm">
        <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
          <div className="mb-2 md:mb-0">
            <span className="mr-4">Hotline: 1800 1234</span>
            <span>Email: support@techsphere.com</span>
          </div>
          <div className="flex space-x-4">
            <NavLink 
              to="/orders"
              className={({ isActive }) => 
                isActive ? 'text-green-300' : 'hover:text-green-300 transition-colors'
              }
            >
              Tra cứu đơn hàng
            </NavLink>
            <NavLink
              to="/stores"
              className={({ isActive }) => 
                isActive ? 'text-green-300' : 'hover:text-green-300 transition-colors'
              }
            >
              Hệ thống cửa hàng
            </NavLink>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <header className="bg-emerald-200 shadow-md sticky top-0 z-30">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between py-5">
            {/* Logo and Mobile Menu Button */}
            <div className="flex items-center">
              <button 
                className="mr-2 md:hidden"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                aria-label="Toggle menu"
              >
                {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
              <Link to="/" className="text-2xl font-extrabold text-red-600 hover:text-red-700 transition-colors tracking-tight">
                TechSphere
              </Link>
            </div>

            {/* Desktop Search */}
            <div className="hidden md:flex flex-grow mx-8 relative max-w-2xl">
              <input 
                type="text" 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Tìm kiếm sản phẩm..." 
                className="w-full py-2 px-4 border border-green-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
              <button 
                onClick={handleSearch}
                className="bg-green-600 text-white p-2 rounded-r-md hover:bg-green-700 transition-colors"
                aria-label="Search"
              >
                <Search size={22} />
              </button>
            </div>

            {/* Action Icons */}
            <div className="flex items-center space-x-4 md:space-x-6">
              {isLoggedIn ? (
                <>
                  <NavLink 
                    to="/account" 
                    className={({ isActive }) => 
                      `hidden md:flex items-center hover:text-green-600 transition-colors ${isActive ? 'text-green-600' : 'text-gray-800'}`
                    }
                  >
                    <User size={22} className="mr-1" />
                    <span className="hidden lg:inline">Tài khoản</span>
                  </NavLink>
                  <NavLink 
                    to="/wishlist" 
                    className={({ isActive }) => 
                      `hidden md:flex items-center hover:text-green-600 transition-colors ${isActive ? 'text-green-600' : 'text-gray-800'}`
                    }
                  >
                    <Heart size={22} className="mr-1" />
                    <span className="hidden lg:inline">Yêu thích</span>
                  </NavLink>
                  <NavLink 
                    to="/cart" 
                    className={({ isActive }) => 
                      `flex items-center hover:text-green-600 transition-colors relative ${isActive ? 'text-green-600' : 'text-gray-800'}`
                    }
                  >
                    <ShoppingCart size={22} className="mr-1" />
                    <span className="hidden md:inline">Giỏ hàng</span>
                    <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                      3
                    </span>
                  </NavLink>
                  <button
                    onClick={handleLogout}
                    className="hidden md:flex items-center hover:text-red-600 transition-colors text-gray-800"
                  >
                    <LogOut size={22} className="mr-1" />
                    <span className="hidden lg:inline">Đăng xuất</span>
                  </button>
                </>
              ) : (
                <>
                  <NavLink
                    to="/login"
                    className={({ isActive }) => 
                      `flex items-center hover:text-green-600 transition-colors ${isActive ? 'text-green-600' : 'text-gray-800'}`
                    }
                  >
                    <span className="text-sm md:text-base">Đăng nhập</span>
                  </NavLink>
                  <NavLink
                    to="/register"
                    className={({ isActive }) => 
                      `flex items-center hover:text-green-600 transition-colors ${isActive ? 'text-green-600' : 'text-gray-800'}`
                    }
                  >
                    <span className="text-sm md:text-base">Đăng ký</span>
                  </NavLink>
                </>
              )}
            </div>
          </div>

          {/* Mobile Search - Only shows when not in mobile menu */}
          {!mobileMenuOpen && (
            <div className="md:hidden pb-4">
              <div className="flex relative">
                <input 
                  type="text" 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Tìm kiếm sản phẩm..." 
                  className="w-full py-2 px-4 border border-green-300 rounded-l-md focus:outline-none focus:ring-1 focus:ring-green-500"
                />
                <button 
                  onClick={handleSearch}
                  className="bg-green-600 text-white p-2 rounded-r-md hover:bg-green-700 transition-colors"
                  aria-label="Search"
                >
                  <Search size={22} />
                </button>
              </div>
            </div>
          )}
        </div>
      </header>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-black bg-opacity-50" onClick={() => setMobileMenuOpen(false)}>
          <div className="fixed inset-y-0 left-0 max-w-xs w-full bg-green-50 shadow-xl p-4 z-50 overflow-y-auto" onClick={e => e.stopPropagation()}>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-gray-800">Menu</h2>
              <button 
                onClick={() => setMobileMenuOpen(false)}
                aria-label="Close menu"
              >
                <X size={24} />
              </button>
            </div>
            <nav className="space-y-1">
              {isLoggedIn ? (
                <>
                  <NavLink 
                    to="/account" 
                    onClick={() => setMobileMenuOpen(false)}
                    className={({ isActive }) => 
                      `block py-2 px-3 hover:bg-emerald-200 rounded-md ${isActive ? 'text-green-700 bg-emerald-200' : 'text-gray-800'}`
                    }
                  >
                    Tài khoản
                  </NavLink>
                  <NavLink 
                    to="/wishlist" 
                    onClick={() => setMobileMenuOpen(false)}
                    className={({ isActive }) => 
                      `block py-2 px-3 hover:bg-emerald-200 rounded-md ${isActive ? 'text-green-700 bg-emerald-200' : 'text-gray-800'}`
                    }
                  >
                    Yêu thích
                  </NavLink>
                  <NavLink 
                    to="/cart" 
                    onClick={() => setMobileMenuOpen(false)}
                    className={({ isActive }) => 
                      `block py-2 px-3 hover:bg-emerald-200 rounded-md ${isActive ? 'text-green-700 bg-emerald-200' : 'text-gray-800'}`
                    }
                  >
                    Giỏ hàng
                  </NavLink>
                  <button
                    onClick={handleLogout}
                    className="block py-2 px-3 hover:bg-red-100 rounded-md text-red-600 w-full text-left"
                  >
                    Đăng xuất
                  </button>
                </>
              ) : (
                <>
                  <NavLink 
                    to="/login" 
                    onClick={() => setMobileMenuOpen(false)}
                    className={({ isActive }) => 
                      `block py-2 px-3 hover:bg-emerald-200 rounded-md ${isActive ? 'text-green-700 bg-emerald-200' : 'text-gray-800'}`
                    }
                  >
                    Login
                  </NavLink>
                  <NavLink 
                    to="/register" 
                    onClick={() => setMobileMenuOpen(false)}
                    className={({ isActive }) => 
                      `block py-2 px-3 hover:bg-emerald-200 rounded-md ${isActive ? 'text-green-700 bg-emerald-200' : 'text-gray-800'}`
                    }
                  >
                    Đăng ký
                  </NavLink>
                </>
              )}
              
              <div className="border-t my-2"></div>
              
              {categories && categories.length > 0 ? (
                categories.map(category => (
                  <NavLink
                    key={category.id}
                    to={`/detail?category=${category.name}`}
                    onClick={() => setMobileMenuOpen(false)}
                    className={({ isActive }) => 
                      `block py-2 px-3 hover:bg-emerald-200 rounded-md ${isActive ? 'text-green-700 bg-emerald-200' : 'text-gray-800'}`
                    }
                  >
                    {category.name}
                  </NavLink>
                ))
              ) : (
                <span className="block py-2 px-3 text-gray-500">Đang tải danh mục...</span>
              )}
              
              <div className="border-t my-2"></div>
              
              <NavLink 
                to="/promotions" 
                onClick={() => setMobileMenuOpen(false)}
                className={({ isActive }) => 
                  `block py-2 px-3 hover:bg-emerald-200 rounded-md ${isActive ? 'text-green-700 bg-emerald-200' : 'text-gray-800'}`
                }
              >
                Khuyến mãi
              </NavLink>
              <NavLink 
                to="/news" 
                onClick={() => setMobileMenuOpen(false)}
                className={({ isActive }) => 
                  `block py-2 px-3 hover:bg-emerald-200 rounded-md ${isActive ? 'text-green-700 bg-emerald-200' : 'text-gray-800'}`
                }
              >
                Tin tức
              </NavLink>
              <NavLink 
                to="/contact" 
                onClick={() => setMobileMenuOpen(false)}
                className={({ isActive }) => 
                  `block py-2 px-3 hover:bg-emerald-200 rounded-md ${isActive ? 'text-green-700 bg-emerald-200' : 'text-gray-800'}`
                }
              >
                Liên hệ
              </NavLink>
            </nav>
          </div>
        </div>
      )}

      {/* Desktop Navigation */}
      <nav className="bg-emerald-200 border-b border-green-200 hidden md:block">
        <div className="container mx-auto px-4">
          <div className="flex items-center space-x-6 py-3">
            {categories && categories.length > 0 ? (
              categories.map((category) => (
                <NavLink
                  key={category.id}
                  to={`/detail?category=${category.name}`}
                  className={({ isActive }) => 
                    `text-gray-800 hover:bg-blue-600 hover:text-white hover:scale-105 px-3 py-1 rounded-md transition-all duration-200 ${
                      isActive ? 'text-green-700 font-semibold' : ''
                    }`
                  }
                >
                  {category.name}
                </NavLink>
              ))
            ) : (
              <span className="text-gray-500">Đang tải danh mục...</span>
            )}
            
            <NavLink 
              to="/detail" 
              className={({ isActive }) => 
                `text-gray-800 hover:bg-blue-600 hover:text-white hover:scale-105 px-3 py-1 rounded-md transition-all duration-200 ${
                  isActive ? 'text-green-700 font-semibold' : ''
                }`
              }
            >
              Tìm kiếm nâng cao
            </NavLink>
            
            <NavLink 
              to="/promotions" 
              className={({ isActive }) => 
                `text-gray-800 hover:bg-blue-600 hover:text-white hover:scale-105 px-3 py-1 rounded-md transition-all duration-200 ${
                  isActive ? 'text-green-700 font-semibold' : ''
                }`
              }
            >
              Khuyến mãi
            </NavLink>
            
            <NavLink 
              to="/news" 
              className={({ isActive }) => 
                `text-gray-800 hover:bg-blue-600 hover:text-white hover:scale-105 px-3 py-1 rounded-md transition-all duration-200 ${
                  isActive ? 'text-green-700 font-semibold' : ''
                }`
              }
            >
              Tin tức
            </NavLink>
            
            <NavLink 
              to="/contact" 
              className={({ isActive }) => 
                `text-gray-800 hover:bg-blue-600 hover:text-white hover:scale-105 px-3 py-1 rounded-md transition-all duration-200 ${
                  isActive ? 'text-green-700 font-semibold' : ''
                }`
              }
            >
              Liên hệ
            </NavLink>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Header;