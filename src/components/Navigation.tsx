import { useState } from 'react';
import { Menu, X, Search, ShoppingCart, User, LogOut } from 'lucide-react';
import { Link } from '@tanstack/react-router';

export function Navigation() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userEmail, setUserEmail] = useState('');

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserEmail('');
    setIsUserMenuOpen(false);
  };

  const navigationItems = [
    { label: 'Home', href: '/' },
    { label: 'Collections', href: '/collections' },
    { label: 'New Arrivals', href: '/collections/new-arrivals' },
    { label: 'Sale', href: '/collections/sale' },
    { label: 'About', href: '/about' },
    { label: 'Contact', href: '/contact' },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-white dark:bg-slate-900 border-b border-border dark:border-slate-700 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex-shrink-0">
            <div className="text-3xl font-bold bg-gradient-to-r from-ink to-azure bg-clip-text text-transparent hover:from-azure hover:to-ink transition-all duration-300 font-display tracking-tight">
              DanaShop
            </div>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            {navigationItems.map(item => (
              <Link
                key={item.href}
                to={item.href}
                className="text-ink dark:text-white font-medium hover:text-azure transition-colors duration-200 text-lg"
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-4">
            {/* Search */}
            <button className="p-2 hover:bg-gray-100 dark:hover:bg-slate-800 rounded-lg transition-colors">
              <Search size={24} className="text-ink dark:text-white" />
            </button>

            {/* Cart */}
            <button className="relative p-2 hover:bg-gray-100 dark:hover:bg-slate-800 rounded-lg transition-colors">
              <ShoppingCart size={24} className="text-ink dark:text-white" />
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">3</span>
            </button>

            {/* User Menu */}
            <div className="relative hidden sm:block">
              <button
                onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                className="p-2 hover:bg-gray-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
              >
                <User size={24} className="text-ink dark:text-white" />
              </button>

              {/* User Dropdown */}
              {isUserMenuOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-slate-800 border border-border dark:border-slate-700 rounded-lg shadow-lg">
                  {isLoggedIn ? (
                    <>
                      <div className="p-4 border-b border-border dark:border-slate-700">
                        <p className="text-sm font-semibold text-ink dark:text-white">{userEmail}</p>
                      </div>
                      <Link to="/account" className="block px-4 py-3 hover:bg-gray-100 dark:hover:bg-slate-700 text-ink dark:text-white transition-colors">
                        My Account
                      </Link>
                      <Link to="/orders" className="block px-4 py-3 hover:bg-gray-100 dark:hover:bg-slate-700 text-ink dark:text-white transition-colors">
                        Orders
                      </Link>
                      <button
                        onClick={handleLogout}
                        className="w-full text-left px-4 py-3 hover:bg-gray-100 dark:hover:bg-slate-700 text-ink dark:text-white flex items-center gap-2 transition-colors"
                      >
                        <LogOut size={16} /> Logout
                      </button>
                    </>
                  ) : (
                    <>
                      <Link to="/signin" className="block px-4 py-3 hover:bg-gray-100 dark:hover:bg-slate-700 text-ink dark:text-white border-b border-border dark:border-slate-700 transition-colors font-semibold">
                        Sign In
                      </Link>
                      <Link to="/signup" className="block px-4 py-3 hover:bg-gray-100 dark:hover:bg-slate-700 text-ink dark:text-white transition-colors font-semibold">
                        Sign Up
                      </Link>
                    </>
                  )}
                </div>
              )}
            </div>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 hover:bg-gray-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
            >
              {isMobileMenuOpen ? (
                <X size={24} className="text-ink dark:text-white" />
              ) : (
                <Menu size={24} className="text-ink dark:text-white" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-border dark:border-slate-700 py-4 space-y-2">
            {navigationItems.map(item => (
              <Link
                key={item.href}
                to={item.href}
                className="block px-4 py-3 text-ink dark:text-white hover:bg-gray-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
              >
                {item.label}
              </Link>
            ))}
            <Link to="/signin" className="block px-4 py-3 text-ink dark:text-white hover:bg-gray-100 dark:hover:bg-slate-800 rounded-lg transition-colors font-semibold">
              Sign In
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}
