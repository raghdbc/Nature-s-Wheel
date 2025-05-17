import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Trash2, Plus, Minus, ShoppingBag, ArrowLeft } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

const Cart: React.FC = () => {
  const { cartItems, removeFromCart, updateQuantity, cartTotal, cartCalories, clearCart } = useCart();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleCheckout = () => {
    if (!isAuthenticated) {
      navigate('/login');
    } else {
      navigate('/checkout');
    }
  };

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-green-50 pt-24 pb-16">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-md p-8 text-center">
            <div className="w-20 h-20 mx-auto bg-green-100 rounded-full flex items-center justify-center mb-6">
              <ShoppingBag className="w-10 h-10 text-green-700" />
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Your cart is empty</h2>
            <p className="text-gray-600 mb-8">
              Looks like you haven't added any pizzas to your cart yet.
            </p>
            <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
              <Link 
                to="/menu" 
                className="px-6 py-3 bg-green-700 hover:bg-green-800 text-white rounded-full font-medium transition-colors"
              >
                Browse Menu
              </Link>
              <Link 
                to="/customize" 
                className="px-6 py-3 bg-white border border-green-700 text-green-700 hover:bg-green-50 rounded-full font-medium transition-colors"
              >
                Customize a Pizza
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-green-50 pt-24 pb-16">
      <div className="container mx-auto px-4">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center text-green-700 hover:text-green-800 mb-6 transition-colors"
        >
          <ArrowLeft className="w-5 h-5 mr-1" />
          <span>Back</span>
        </button>

        <div className="mb-8">
          <h1 className="text-3xl font-bold text-green-800 mb-2">Your Cart</h1>
          <p className="text-gray-600">
            Review your order before proceeding to checkout.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="p-6 border-b">
                <div className="flex justify-between items-center">
                  <h2 className="text-xl font-semibold text-gray-800">
                    {cartItems.length} {cartItems.length === 1 ? 'Item' : 'Items'}
                  </h2>
                  <button 
                    onClick={clearCart}
                    className="text-red-500 hover:text-red-700 text-sm flex items-center"
                  >
                    <Trash2 className="w-4 h-4 mr-1" />
                    Clear Cart
                  </button>
                </div>
              </div>

              <div className="divide-y">
                {cartItems.map(item => (
                  <div key={item.id} className="p-6">
                    <div className="flex flex-col md:flex-row md:items-center">
                      {/* Pizza Info */}
                      <div className="flex-grow">
                        <h3 className="text-lg font-medium text-gray-800">{item.pizza.name}</h3>
                        <div className="mt-1 text-sm text-gray-600">
                          <p>
                            <span className="font-medium">Size:</span> {
                              item.pizza.size === 'small' ? 'Small' : 
                              item.pizza.size === 'medium' ? 'Medium' : 'Large'
                            }
                          </p>
                          <p>
                            <span className="font-medium">Crust:</span> {
                              item.pizza.crust === 'ragi' ? 'Ragi' :
                              item.pizza.crust === 'wheat' ? 'Whole Wheat' :
                              item.pizza.crust === 'beetroot' ? 'Beetroot' : 'Regular'
                            }
                          </p>
                          <p>
                            <span className="font-medium">Toppings:</span> {
                              item.pizza.toppings.length > 0 
                                ? item.pizza.toppings.map(t => t.id).join(', ')
                                : 'None'
                            }
                          </p>
                        </div>
                        <div className="flex items-center mt-2 text-sm">
                          <span className="text-gray-600 mr-4">₹{item.totalPrice.toFixed(2)}</span>
                          <span className="text-gray-600">{item.totalCalories} Kcal</span>
                        </div>
                      </div>

                      {/* Quantity Control */}
                      <div className="flex items-center mt-4 md:mt-0">
                        <button 
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="p-1 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
                        >
                          <Minus className="w-5 h-5 text-gray-700" />
                        </button>
                        <span className="mx-3 font-medium">{item.quantity}</span>
                        <button 
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="p-1 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
                        >
                          <Plus className="w-5 h-5 text-gray-700" />
                        </button>
                        <button 
                          onClick={() => removeFromCart(item.id)}
                          className="ml-4 text-red-500 hover:text-red-700"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-24">
              <h2 className="text-xl font-semibold text-gray-800 mb-6">Order Summary</h2>
              
              <div className="space-y-4 mb-6">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-medium">₹{cartTotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Delivery</span>
                  <span className="font-medium">₹40.00</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Tax (5%)</span>
                  <span className="font-medium">₹{(cartTotal * 0.05).toFixed(2)}</span>
                </div>
                <div className="flex justify-between pt-4 border-t">
                  <span className="text-lg font-medium">Total</span>
                  <div className="text-right">
                    <div className="text-lg font-bold text-green-800">
                      ₹{(cartTotal + 40 + cartTotal * 0.05).toFixed(2)}
                    </div>
                    <div className="text-sm text-gray-500">
                      ({cartCalories} Kcal)
                    </div>
                  </div>
                </div>
              </div>
              
              <button 
                onClick={handleCheckout}
                className="w-full py-3 bg-green-700 hover:bg-green-800 text-white rounded-full flex items-center justify-center space-x-2 transition-colors"
              >
                <ShoppingBag className="w-5 h-5" />
                <span>Proceed to Checkout</span>
              </button>
              
              <div className="mt-4">
                <Link 
                  to="/menu" 
                  className="w-full py-3 border border-green-700 text-green-700 hover:bg-green-50 rounded-full flex items-center justify-center transition-colors"
                >
                  Continue Shopping
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;