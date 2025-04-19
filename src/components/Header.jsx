import React, { useState, useContext } from 'react';
import { Search, ShoppingCart, Menu, X, Heart, User, ChevronDown, LogOut } from 'lucide-react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const Header = ({ categories }) => {
  const { isLoggedIn, logout } = useContext(AuthContext);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [hoveredCategory, setHoveredCategory] = useState(null);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    setMobileMenuOpen(false);
    navigate('/');
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
                isActive ? 'text-blue-300' : 'hover:text-blue-300 transition-colors'
              }
            >
              Tra cứu đơn hàng
            </NavLink>
            <NavLink
              to="/stores"
              className={({ isActive }) => 
                isActive ? 'text-blue-300' : 'hover:text-blue-300 transition-colors'
              }
            >
              Hệ thống cửa hàng
            </NavLink>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <header className="bg-white shadow-md sticky top-0 z-30">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between py-4">
            {/* Logo and Mobile Menu Button */}
            <div className="flex items-center">
              <button 
                className="mr-2 md:hidden"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                aria-label="Toggle menu"
              >
                {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
              <Link to="/" className="text-2xl font-bold text-red-600 hover:text-red-700 transition-colors">
                TechSphere
              </Link>
            </div>

            {/* Desktop Search */}
            <div className="hidden md:flex flex-grow mx-8 relative max-w-2xl">
              <input 
                type="text" 
                placeholder="Tìm kiếm sản phẩm..." 
                className="w-full py-2 px-4 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <button 
                className="bg-blue-600 text-white p-2 rounded-r-md hover:bg-blue-700 transition-colors"
                aria-label="Search"
              >
                <Search size={20} />
              </button>
            </div>

            {/* Action Icons */}
            <div className="flex items-center space-x-4 md:space-x-6">
              {isLoggedIn ? (
                <>
                  <NavLink 
                    to="/account" 
                    className={({ isActive }) => 
                      `hidden md:flex items-center hover:text-blue-600 transition-colors ${isActive ? 'text-blue-600' : 'text-gray-700'}`
                    }
                  >
                    <User size={20} className="mr-1" />
                    <span className="hidden lg:inline">Tài khoản</span>
                  </NavLink>
                  <NavLink 
                    to="/wishlist" 
                    className={({ isActive }) => 
                      `hidden md:flex items-center hover:text-blue-600 transition-colors ${isActive ? 'text-blue-600' : 'text-gray-700'}`
                    }
                  >
                    <Heart size={20} className="mr-1" />
                    <span className="hidden lg:inline">Yêu thích</span>
                  </NavLink>
                  <NavLink 
                    to="/cart" 
                    className={({ isActive }) => 
                      `flex items-center hover:text-blue-600 transition-colors relative ${isActive ? 'text-blue-600' : 'text-gray-700'}`
                    }
                  >
                    <ShoppingCart size={20} className="mr-1" />
                    <span className="hidden md:inline">Giỏ hàng</span>
                    <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                      3
                    </span>
                  </NavLink>
                  <button
                    onClick={handleLogout}
                    className="hidden md:flex items-center hover:text-red-600 transition-colors text-gray-700"
                  >
                    <LogOut size={20} className="mr-1" />
                    <span className="hidden lg:inline">Đăng xuất</span>
                  </button>
                </>
              ) : (
                <>
                  <NavLink
                    to="/login"
                    className={({ isActive }) => 
                      `flex items-center hover:text-blue-600 transition-colors ${isActive ? 'text-blue-600' : 'text-gray-700'}`
                    }
                  >
                    <span className="text-sm md:text-base">Đăng nhập</span>
                  </NavLink>
                  <NavLink
                    to="/register"
                    className={({ isActive }) => 
                      `flex items-center hover:text-blue-600 transition-colors ${isActive ? 'text-blue-600' : 'text-gray-700'}`
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
                  placeholder="Tìm kiếm sản phẩm..." 
                  className="w-full py-2 px-4 border border-gray-300 rounded-l-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
                <button 
                  className="bg-blue-600 text-white p-2 rounded-r-md hover:bg-blue-700 transition-colors"
                  aria-label="Search"
                >
                  <Search size={20} />
                </button>
              </div>
            </div>
          )}
        </div>
      </header>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-black bg-opacity-50" onClick={() => setMobileMenuOpen(false)}>
          <div className="fixed inset-y-0 left-0 max-w-xs w-full bg-white shadow-xl p-4 z-50 overflow-y-auto" onClick={e => e.stopPropagation()}>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Menu</h2>
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
                      `block py-2 px-3 hover:bg-gray-100 rounded-md ${isActive ? 'text-blue-600 bg-blue-50' : 'text-gray-700'}`
                    }
                  >
                    Tài khoản
                  </NavLink>
                  <NavLink 
                    to="/wishlist" 
                    onClick={() => setMobileMenuOpen(false)}
                    className={({ isActive }) => 
                      `block py-2 px-3 hover:bg-gray-100 rounded-md ${isActive ? 'text-blue-600 bg-blue-50' : 'text-gray-700'}`
                    }
                  >
                    Yêu thích
                  </NavLink>
                  <NavLink 
                    to="/cart" 
                    onClick={() => setMobileMenuOpen(false)}
                    className={({ isActive }) => 
                      `block py-2 px-3 hover:bg-gray-100 rounded-md ${isActive ? 'text-blue-600 bg-blue-50' : 'text-gray-700'}`
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
                      `block py-2 px-3 hover:bg-gray-100 rounded-md ${isActive ? 'text-blue-600 bg-blue-50' : 'text-gray-700'}`
                    }
                  >
                    Login
                  </NavLink>
                  <NavLink 
                    to="/register" 
                    onClick={() => setMobileMenuOpen(false)}
                    className={({ isActive }) => 
                      `block py-2 px-3 hover:bg-gray-100 rounded-md ${isActive ? 'text-blue-600 bg-blue-50' : 'text-gray-700'}`
                    }
                  >
                    Đăng ký
                  </NavLink>
                </>
              )}
              
              <div className="border-t my-2"></div>
              
              {categories.map(category => (
                <div key={category.id} className="mb-1">
                  <button className="w-full text-left py-2 px-3 text-gray-700 hover:bg-gray-100 rounded-md flex justify-between items-center">
                    {category.name}
                    <ChevronDown size={16} />
                  </button>
                  <div className="ml-4 mt-1 space-y-1">
                    {category.subcategories.map((sub, idx) => (
                      <Link
                        key={idx}
                        to={`/products?category=${category.name}&subcategory=${sub}`}
                        onClick={() => setMobileMenuOpen(false)}
                        className="block py-2 px-3 text-gray-600 hover:bg-gray-50 rounded-md text-sm"
                      >
                        {sub}
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
              
              <div className="border-t my-2"></div>
              
              <NavLink 
                to="/promotions" 
                onClick={() => setMobileMenuOpen(false)}
                className={({ isActive }) => 
                  `block py-2 px-3 hover:bg-gray-100 rounded-md ${isActive ? 'text-blue-600 bg-blue-50' : 'text-gray-700'}`
                }
              >
                Khuyến mãi
              </NavLink>
              <NavLink 
                to="/news" 
                onClick={() => setMobileMenuOpen(false)}
                className={({ isActive }) => 


                  `block py-2 px-3 hover:bg-gray-100 rounded-md ${isActive ? 'text-blue-600 bg-blue-50' : 'text-gray-700'}`
                }
              >
                Tin tức
              </NavLink>
              <NavLink 
                to="/contact" 
                onClick={() => setMobileMenuOpen(false)}
                className={({ isActive }) => 
                  `block py-2 px-3 hover:bg-gray-100 rounded-md ${isActive ? 'text-blue-600 bg-blue-50' : 'text-gray-700'}`
                }
              >
                Liên hệ
              </NavLink>
            </nav>
          </div>
        </div>
      )}

      {/* Desktop Navigation */}
      <nav className="bg-white shadow-sm hidden md:block">
        <div className="container mx-auto px-4">
          <div className="flex items-center space-x-8 py-3">
            {categories.map((category) => (
              <div 
                key={category.id} 
                className="relative group"
                onMouseEnter={() => setHoveredCategory(category.id)}
                onMouseLeave={() => setHoveredCategory(null)}
              >
                <button className="text-gray-700 hover:text-blue-600 flex items-center py-1">
                  {category.name}
                  <ChevronDown size={16} className="ml-1" />
                </button>
                
                {hoveredCategory === category.id && (
                  <div className="absolute left-0 mt-0 bg-white border shadow-lg rounded-md py-2 z-20 w-48">
                    {category.subcategories.map((sub, idx) => (
                      <Link
                        key={idx}
                        to={`/products?category=${category.name}&subcategory=${sub}`}
                        className="block px-4 py-2 text-gray-700 hover:bg-gray-50 hover:text-blue-600 transition-colors"
                      >
                        {sub}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
            
            <NavLink 
              to="/promotions" 
              className={({ isActive }) => 
                `text-gray-700 hover:text-blue-600 py-1 ${isActive ? 'text-blue-600 font-medium' : ''}`
              }
            >
              Khuyến mãi
            </NavLink>
            
            <NavLink 
              to="/news" 
              className={({ isActive }) => 
                `text-gray-700 hover:text-blue-600 py-1 ${isActive ? 'text-blue-600 font-medium' : ''}`
              }
            >
              Tin tức
            </NavLink>
            
            <NavLink 
              to="/contact" 
              className={({ isActive }) => 
                `text-gray-700 hover:text-blue-600 py-1 ${isActive ? 'text-blue-600 font-medium' : ''}`
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