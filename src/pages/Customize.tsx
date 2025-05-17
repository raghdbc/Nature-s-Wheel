import React, { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { usePizza, Pizza } from '../context/PizzaContext';
import PizzaCustomizer from '../components/pizza/PizzaCustomizer';

const Customize: React.FC = () => {
  const { pizzas } = usePizza();
  const [searchParams] = useSearchParams();
  const [basePizza, setBasePizza] = useState<Pizza | undefined>(undefined);
  const navigate = useNavigate();

  useEffect(() => {
    const pizzaId = searchParams.get('id');
    if (pizzaId) {
      const foundPizza = pizzas.find(p => p.id === pizzaId);
      if (foundPizza) {
        setBasePizza({
          ...foundPizza,
          id: 'custom-' + Date.now() // Generate new ID for custom pizza
        });
      }
    }
  }, [searchParams, pizzas]);

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

        <div className="mb-10">
          <h1 className="text-3xl font-bold text-green-800 mb-2">Customize Your Pizza</h1>
          <p className="text-gray-600">
            Build your perfect pizza with our nutritious ingredients and watch the calories and price update in real-time.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Image and Info */}
          <div className="hidden lg:block">
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <img 
                src="https://cdn.loveandlemons.com/wp-content/uploads/2019/06/homemade-pizza-2.jpg"
                alt="Custom Pizza" 
                className="w-full h-96 object-cover"
              />
              <div className="p-6">
                <h2 className="text-xl font-bold text-green-800 mb-2">
                  {basePizza ? 'Customize ' + basePizza.name : 'Build Your Own Pizza'}
                </h2>
                <p className="text-gray-600 mb-4">
                  Select your preferred crust, sauce, and toppings to create your perfect healthy pizza.
                </p>
                <div className="space-y-3">
                  <div className="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-green-700 mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M22 12h-4l-3 9L9 3l-3 9H2"/>
                    </svg>
                    <span className="text-gray-700">Calories updated in real-time</span>
                  </div>
                  <div className="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-green-700 mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="12" y1="1" x2="12" y2="23"/>
                      <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
                    </svg>
                    <span className="text-gray-700">Price calculated by ingredient</span>
                  </div>
                  <div className="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-green-700 mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M2.27 21.7s9.87-3.5 12.73-6.36a4.5 4.5 0 0 0-6.36-6.37C5.77 11.84 2.27 21.7 2.27 21.7zM15.42 15.42l6.36 6.36M19.08 4.92l-6.36 6.36"/>
                    </svg>
                    <span className="text-gray-700">Control topping quantities precisely</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Customizer */}
          <div className="lg:col-span-2">
            <PizzaCustomizer initialPizza={basePizza} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Customize