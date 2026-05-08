import { Facebook, Instagram, Twitter, Mail } from 'lucide-react';
import { Link } from '@tanstack/react-router';

export function Footer() {
  return (
    <footer className="bg-ink dark:bg-slate-900 text-white mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Company Info */}
          <div>
            <h3 className="text-2xl font-bold font-display mb-4">DanaShop</h3>
            <p className="text-gray-300 text-lg mb-4 leading-relaxed">
              Your premier destination for luxury fashion and exclusive collections.
            </p>
            <div className="flex gap-4">
              <a href="#" className="p-2 bg-white/10 rounded-full hover:bg-azure transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="p-2 bg-white/10 rounded-full hover:bg-azure transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" className="p-2 bg-white/10 rounded-full hover:bg-azure transition-colors">
                <Twitter size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xl font-bold mb-4">Shop</h4>
            <ul className="space-y-3 text-gray-300">
              <li>
                <Link to="/collections" className="hover:text-azure transition-colors text-lg">
                  All Products
                </Link>
              </li>
              <li>
                <Link to="/collections/new-arrivals" className="hover:text-azure transition-colors text-lg">
                  New Arrivals
                </Link>
              </li>
              <li>
                <Link to="/collections/sale" className="hover:text-azure transition-colors text-lg">
                  Sale
                </Link>
              </li>
              <li>
                <Link to="/collections/featured" className="hover:text-azure transition-colors text-lg">
                  Featured
                </Link>
              </li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h4 className="text-xl font-bold mb-4">Customer Service</h4>
            <ul className="space-y-3 text-gray-300">
              <li>
                <Link to="/contact" className="hover:text-azure transition-colors text-lg">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link to="/faq" className="hover:text-azure transition-colors text-lg">
                  FAQ
                </Link>
              </li>
              <li>
                <Link to="/shipping" className="hover:text-azure transition-colors text-lg">
                  Shipping Info
                </Link>
              </li>
              <li>
                <Link to="/returns" className="hover:text-azure transition-colors text-lg">
                  Returns
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="text-xl font-bold mb-4">Newsletter</h4>
            <p className="text-gray-300 mb-4 text-lg">Subscribe to get special offers and updates</p>
            <div className="flex">
              <input
                type="email"
                placeholder="Your email"
                className="flex-1 px-4 py-3 rounded-l-lg text-ink focus:outline-none focus:ring-2 focus:ring-azure text-base"
              />
              <button className="px-6 bg-azure hover:bg-deep transition-colors rounded-r-lg font-bold">
                <Mail size={20} />
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Links */}
        <div className="border-t border-white/10 pt-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <Link to="/privacy" className="text-gray-300 hover:text-white transition-colors text-lg">
              Privacy Policy
            </Link>
            <Link to="/terms" className="text-gray-300 hover:text-white transition-colors text-lg">
              Terms & Conditions
            </Link>
            <Link to="/sitemap" className="text-gray-300 hover:text-white transition-colors text-lg">
              Sitemap
            </Link>
          </div>

          {/* Copyright */}
          <div className="text-center text-gray-400 pt-4 border-t border-white/10">
            <p className="text-lg">&copy; 2026 DanaShop. All rights reserved. | Designed with precision.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
