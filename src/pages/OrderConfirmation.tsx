import React from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircle, MapPin, Clock, Calendar } from 'lucide-react';

const OrderConfirmation: React.FC = () => {
  const navigate = useNavigate();
  const orderNumber = `#NW${Math.floor(100000 + Math.random() * 900000)}`;

  return (
    <div className="min-h-screen bg-green-50 pt-24 pb-16">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-md p-8">
          <div className="text-center mb-8">
            <div className="w-20 h-20 mx-auto bg-green-100 rounded-full flex items-center justify-center mb-6">
              <CheckCircle className="w-12 h-12 text-green-700" />
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Order Placed Successfully!</h2>
            <p className="text-gray-600 mb-6">
              Thank you for your order. Your healthy pizzas will be delivered soon.
            </p>
          </div>

          <div className="bg-green-50 rounded-lg p-6 mb-8">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Order Number:</span>
                <span className="font-medium">{orderNumber}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Estimated Delivery:</span>
                <span className="font-medium">30-45 minutes</span>
              </div>
            </div>
          </div>

          <div className="space-y-4 mb-8">
            <div className="flex items-start">
              <MapPin className="w-5 h-5 text-green-700 mr-3 mt-1" />
              <div>
                <h3 className="font-medium mb-1">Real-time Tracking</h3>
                <p className="text-sm text-gray-600">Track your order in real-time with our delivery updates</p>
              </div>
            </div>
            <div className="flex items-start">
              <Clock className="w-5 h-5 text-green-700 mr-3 mt-1" />
              <div>
                <h3 className="font-medium mb-1">Estimated Arrival</h3>
                <p className="text-sm text-gray-600">Your order will arrive in 30-45 minutes</p>
              </div>
            </div>
            <div className="flex items-start">
              <Calendar className="w-5 h-5 text-green-700 mr-3 mt-1" />
              <div>
                <h3 className="font-medium mb-1">Order Updates</h3>
                <p className="text-sm text-gray-600">You'll receive updates about your order via SMS</p>
              </div>
            </div>
          </div>

          <div className="flex justify-center">
            <button 
              onClick={() => navigate('/')}
              className="px-8 py-3 bg-green-700 hover:bg-green-800 text-white rounded-full font-medium transition-colors"
            >
              Return to Home
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderConfirmation; 