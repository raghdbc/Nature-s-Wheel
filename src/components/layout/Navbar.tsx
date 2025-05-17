import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Leaf, ShoppingCart, Menu, X, LogIn, LogOut, User } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useCart } from '../../context/CartContext';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { isAuthenticated, user, logout } = useAuth();
  const { cartItems } = useCart();
  const location = useLocation();
  const navigate = useNavigate();

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  // Safely get the user's first name
  const userFirstName = user?.name?.split(' ')[0] || 'User';

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${
      isScrolled ? 'bg-white shadow-md py-2' : 'bg-transparent py-4'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <Leaf className="w-8 h-8 text-green-700" />
            <span className="text-xl font-bold text-green-800">Nature's Wheel</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            <Link to="/" className="text-gray-700 hover:text-green-700 font-medium transition-colors">Home</Link>
            <Link to="/menu" className="text-gray-700 hover:text-green-700 font-medium transition-colors">Menu</Link>
            <Link to="/customize" className="text-gray-700 hover:text-green-700 font-medium transition-colors">Build Your Pizza</Link>
            
            {isAuthenticated ? (
              <div className="flex items-center space-x-4">
                <span className="text-gray-700 font-medium">
                  Hi, {userFirstName}
                </span>
                <button 
                  onClick={handleLogout}
                  className="flex items-center text-gray-700 hover:text-red-600 transition-colors"
                >
                  <LogOut className="w-5 h-5 mr-1" />
                  <span>Logout</span>
                </button>
                <Link 
                  to="/cart" 
                  className="relative p-2 bg-green-100 rounded-full text-green-800 hover:bg-green-200 transition-colors"
                >
                  <ShoppingCart className="w-5 h-5" />
                  {cartItems.length > 0 && (
                    <span className="absolute -top-1 -right-1 bg-green-700 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                      {cartItems.length}
                    </span>
                  )}
                </Link>
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <Link 
                  to="/login" 
                  className="flex items-center text-gray-700 hover:text-green-700 transition-colors"
                >
                  <LogIn className="w-5 h-5 mr-1" />
                  <span>Login</span>
                </Link>
                <Link 
                  to="/register" 
                  className="flex items-center px-4 py-2 rounded-full bg-green-700 text-white hover:bg-green-800 transition-colors"
                >
                  <User className="w-4 h-4 mr-1" />
                  <span>Sign Up</span>
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Navigation Toggle */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-700"
            >
              {isOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {isOpen && (
        <div className="md:hidden bg-white shadow-lg">
          <div className="px-4 pt-2 pb-4 space-y-3">
            <Link to="/" className="block py-2 text-gray-700 hover:text-green-700 font-medium">Home</Link>
            <Link to="/menu" className="block py-2 text-gray-700 hover:text-green-700 font-medium">Menu</Link>
            <Link to="/customize" className="block py-2 text-gray-700 hover:text-green-700 font-medium">Build Your Pizza</Link>
            
            {isAuthenticated ? (
              <>
                <div className="pt-2 border-t border-gray-200">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-700 font-medium">
                      Hi, {userFirstName}
                    </span>
                    <Link 
                      to="/cart" 
                      className="relative p-2 bg-green-100 rounded-full text-green-800"
                    >
                      <ShoppingCart className="w-5 h-5" />
                      {cartItems.length > 0 && (
                        <span className="absolute -top-1 -right-1 bg-green-700 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                          {cartItems.length}
                        </span>
                      )}
                    </Link>
                  </div>
                </div>
                <button 
                  onClick={handleLogout}
                  className="flex items-center py-2 text-gray-700 hover:text-red-600"
                >
                  <LogOut className="w-5 h-5 mr-2" />
                  <span>Logout</span>
                </button>
              </>
            ) : (
              <div className="pt-2 border-t border-gray-200 flex flex-col space-y-2">
                <Link 
                  to="/login" 
                  className="flex items-center py-2 text-gray-700"
                >
                  <LogIn className="w-5 h-5 mr-2" />
                  <span>Login</span>
                </Link>
                <Link 
                  to="/register" 
                  className="flex items-center justify-center py-2 rounded-full bg-green-700 text-white"
                >
                  <User className="w-4 h-4 mr-1" />
                  <span>Sign Up</span>
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar