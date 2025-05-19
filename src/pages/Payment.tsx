import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CreditCard, Smartphone, Check } from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { useOrders } from '../context/OrderContext';
import { toast } from 'react-hot-toast';

const Payment: React.FC = () => {
  const navigate = useNavigate();
  const { cartItems, cartTotal, clearCart } = useCart();
  const { profile } = useAuth();
  const { addOrder } = useOrders();
  const [paymentMethod, setPaymentMethod] = useState<'upi' | 'card' | null>(null);
  const [cardDetails, setCardDetails] = useState({
    number: '',
    name: '',
    expiry: '',
    cvv: ''
  });
  const [isProcessing, setIsProcessing] = useState(false);

  const handleCardInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCardDetails(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const createOrder = () => {
    try {
      const orderData = {
        items: cartItems,
        totalAmount: cartTotal + 40 + (cartTotal * 0.05), // Adding delivery charge and tax
        status: 'pending' as const,
        customerName: profile?.name || 'Customer',
        customerEmail: profile?.email || 'customer@example.com',
        deliveryAddress: profile?.default_address || 'No address provided',
      };

      addOrder(orderData);
      toast.success('Order placed successfully!');
    } catch (error) {
      console.error('Error creating order:', error);
      toast.error('Failed to create order. Please try again.');
    }
  };

  const handleCardSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    try {
      // Simulate payment processing
      await new Promise(resolve => setTimeout(resolve, 2000));
      createOrder();
      clearCart();
      navigate('/order-confirmation');
    } catch (error) {
      console.error('Error processing payment:', error);
      toast.error('Payment failed. Please try again.');
      setIsProcessing(false);
    }
  };

  const handleUPISuccess = async () => {
    setIsProcessing(true);
    try {
      // Simulate payment processing
      await new Promise(resolve => setTimeout(resolve, 1500));
      createOrder();
      clearCart();
      navigate('/order-confirmation');
    } catch (error) {
      console.error('Error processing UPI payment:', error);
      toast.error('Payment failed. Please try again.');
      setIsProcessing(false);
    }
  };

  const upiPaymentString = `upi://pay?pa=merchant.upi@bank&pn=HealthyPizza&am=${cartTotal.toFixed(2)}&cu=INR`;

  if (isProcessing) {
    return (
      <div className="min-h-screen bg-green-50 pt-24 pb-16">
        <div className="container mx-auto px-4">
          <div className="max-w-md mx-auto bg-white rounded-lg shadow-md p-8 text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-700 mx-auto mb-4"></div>
            <h2 className="text-xl font-semibold text-gray-800 mb-2">Processing Payment</h2>
            <p className="text-gray-600">Please wait while we process your payment...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-green-50 pt-24 pb-16">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-3xl font-bold text-green-800 mb-8">Complete Payment</h1>
          <div className="bg-green-100 rounded-lg p-4 mb-8">
            <p className="text-green-800 font-medium">Amount to Pay: ₹{cartTotal.toFixed(2)}</p>
          </div>

          {!paymentMethod ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <button
                onClick={() => setPaymentMethod('upi')}
                className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow flex flex-col items-center"
              >
                <Smartphone className="w-12 h-12 text-green-700 mb-4" />
                <h2 className="text-xl font-semibold mb-2">UPI Payment</h2>
                <p className="text-gray-600 text-center">Pay using any UPI app</p>
              </button>

              <button
                onClick={() => setPaymentMethod('card')}
                className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow flex flex-col items-center"
              >
                <CreditCard className="w-12 h-12 text-green-700 mb-4" />
                <h2 className="text-xl font-semibold mb-2">Card Payment</h2>
                <p className="text-gray-600 text-center">Pay using credit/debit card</p>
              </button>
            </div>
          ) : paymentMethod === 'upi' ? (
            <div className="bg-white p-8 rounded-lg shadow-md">
              <h2 className="text-2xl font-semibold mb-6 text-center">Scan QR Code to Pay</h2>
              <div className="flex flex-col items-center">
                <div className="bg-white p-4 rounded-lg shadow-inner mb-6">
                  <QRCodeSVG 
                    value={upiPaymentString}
                    size={200}
                    level="H"
                  />
                </div>
                <p className="text-gray-600 mb-6 text-center">
                  Open any UPI app and scan this QR code to make the payment
                </p>
                <button
                  onClick={handleUPISuccess}
                  className="bg-green-700 text-white px-8 py-3 rounded-full hover:bg-green-800 transition-colors"
                >
                  I've Completed the Payment
                </button>
              </div>
            </div>
          ) : (
            <div className="bg-white p-8 rounded-lg shadow-md">
              <h2 className="text-2xl font-semibold mb-6">Enter Card Details</h2>
              <form onSubmit={handleCardSubmit} className="space-y-6">
                <div>
                  <label className="block text-gray-700 mb-2">Card Number</label>
                  <input
                    type="text"
                    name="number"
                    placeholder="1234 5678 9012 3456"
                    maxLength={19}
                    value={cardDetails.number}
                    onChange={handleCardInputChange}
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-600 focus:border-transparent"
                    required
                  />
                </div>
                <div>
                  <label className="block text-gray-700 mb-2">Cardholder Name</label>
                  <input
                    type="text"
                    name="name"
                    placeholder="John Doe"
                    value={cardDetails.name}
                    onChange={handleCardInputChange}
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-600 focus:border-transparent"
                    required
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-gray-700 mb-2">Expiry Date</label>
                    <input
                      type="text"
                      name="expiry"
                      placeholder="MM/YY"
                      maxLength={5}
                      value={cardDetails.expiry}
                      onChange={handleCardInputChange}
                      className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-600 focus:border-transparent"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 mb-2">CVV</label>
                    <input
                      type="text"
                      name="cvv"
                      placeholder="123"
                      maxLength={3}
                      value={cardDetails.cvv}
                      onChange={handleCardInputChange}
                      className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-600 focus:border-transparent"
                      required
                    />
                  </div>
                </div>
                <button
                  type="submit"
                  className="w-full bg-green-700 text-white px-6 py-3 rounded-full hover:bg-green-800 transition-colors flex items-center justify-center space-x-2"
                >
                  <span>Pay Securely</span>
                  <Check className="w-5 h-5" />
                </button>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Payment; 