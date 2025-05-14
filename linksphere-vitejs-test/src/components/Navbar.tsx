import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Sun, Moon, Link as LinkIcon } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();
  
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  useEffect(() => {
    // Close mobile menu when route changes
    setIsOpen(false);
  }, [location.pathname]);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Personal', path: '/p' },
    { name: 'Corporate', path: '/c' },
    { name: 'Login', path: '/login' },
    { name: 'Register', path: '/register' },
  ];

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-30 transition-all duration-300 ${
        isScrolled 
          ? 'bg-white/80 dark:bg-gray-900/80 backdrop-blur-md shadow-sm' 
          : 'bg-transparent'
      }`}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link 
              to="/" 
              className="flex items-center gap-2 text-xl font-bold text-indigo-600 dark:text-indigo-400"
            >
              <LinkIcon className="h-6 w-6" />
              <span>LinkSphere</span>
            </Link>
          </div>
          
          {/* Desktop Menu */}
          <div className="hidden md:flex md:items-center md:space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`text-sm font-medium transition-colors hover:text-indigo-600 dark:hover:text-indigo-400 ${
                  location.pathname === link.path 
                    ? 'text-indigo-600 dark:text-indigo-400' 
                    : 'text-gray-600 dark:text-gray-300'
                }`}
              >
                {link.name}
              </Link>
            ))}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
              aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
            >
              {theme === 'light' ? (
                <Moon className="h-5 w-5 text-gray-600" />
              ) : (
                <Sun className="h-5 w-5 text-yellow-300" />
              )}
            </button>
          </div>
          
          {/* Mobile menu button */}
          <div className="flex md:hidden">
            <button
              onClick={toggleTheme}
              className="p-2 mr-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
              aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
            >
              {theme === 'light' ? (
                <Moon className="h-5 w-5 text-gray-600" />
              ) : (
                <Sun className="h-5 w-5 text-yellow-300" />
              )}
            </button>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-md text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              {isOpen ? (
                <X className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="block h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile Menu */}
      <div className={`md:hidden ${isOpen ? 'block' : 'hidden'}`}>
        <div className="px-2 pt-2 pb-4 bg-white dark:bg-gray-800 shadow-lg rounded-b-lg">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`block px-3 py-2 rounded-md text-base font-medium ${
                location.pathname === link.path
                  ? 'bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400'
                  : 'text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
              }`}
            >
              {link.name}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;