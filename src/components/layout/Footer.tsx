import React from 'react';
import { Leaf, Instagram, Facebook, Twitter } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  return (
    <footer className="bg-green-800 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and Description */}
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center space-x-2 mb-4">
              <Leaf className="w-6 h-6 text-green-300" />
              <span className="text-xl font-bold">Nature's Wheel</span>
            </div>
            <p className="text-green-200 text-sm leading-relaxed">
              Nature's Wheel brings you healthy, delicious pizzas made with wholesome ingredients. 
              Your health-conscious pizza destination.
            </p>
            <div className="flex space-x-4 mt-6">
              <a href="#" className="text-green-200 hover:text-white transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="text-green-200 hover:text-white transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="text-green-200 hover:text-white transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="col-span-1">
            <h3 className="text-lg font-medium mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-green-200 hover:text-white transition-colors">Home</Link>
              </li>
              <li>
                <Link to="/menu" className="text-green-200 hover:text-white transition-colors">Menu</Link>
              </li>
              <li>
                <Link to="/customize" className="text-green-200 hover:text-white transition-colors">Build Your Pizza</Link>
              </li>
              <li>
                <Link to="/cart" className="text-green-200 hover:text-white transition-colors">Cart</Link>
              </li>
            </ul>
          </div>

          {/* About Us */}
          <div className="col-span-1">
            <h3 className="text-lg font-medium mb-4">About Us</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-green-200 hover:text-white transition-colors">Our Story</a>
              </li>
              <li>
                <a href="#" className="text-green-200 hover:text-white transition-colors">Health Benefits</a>
              </li>
              <li>
                <a href="#" className="text-green-200 hover:text-white transition-colors">Ingredients</a>
              </li>
              <li>
                <a href="#" className="text-green-200 hover:text-white transition-colors">Careers</a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div className="col-span-1">
            <h3 className="text-lg font-medium mb-4">Contact Us</h3>
            <ul className="space-y-2">
              <li className="text-green-200">
                123 Green Street, Healthy City
              </li>
              <li className="text-green-200">
                contact@natureswheel.com
              </li>
              <li className="text-green-200">
                +1 (555) 123-4567
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-green-700 mt-10 pt-6 text-sm text-green-300 flex flex-col md:flex-row justify-between items-center">
          <p>&copy; {new Date().getFullYear()} Nature's Wheel Pizza. All rights reserved.</p>
          <div className="flex space-x-4 mt-2 md:mt-0">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;