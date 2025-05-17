import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, LeafIcon } from 'lucide-react';
import { usePizza } from '../context/PizzaContext';
import PizzaCard from '../components/pizza/PizzaCard';

const Home: React.FC = () => {
  const { pizzas } = usePizza();
  const featuredPizzas = pizzas.filter(pizza => pizza.featured).slice(0, 3);

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative h-screen bg-cover bg-center flex items-center" style={{ 
        backgroundImage: 'url(https://images.pexels.com/photos/1566837/pexels-photo-1566837.jpeg)',
        backgroundPosition: 'center',
      }}>
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-lg">
            <h1 className="text-5xl font-bold text-white mb-4">
              Healthy Pizza, <span className="text-green-400">Naturally</span>
            </h1>
            <p className="text-xl text-gray-200 mb-8">
              Nutritious, delicious, and crafted with nature's finest ingredients.
              Your health-conscious pizza destination.
            </p>
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
              <Link 
                to="/menu" 
                className="px-8 py-3 bg-green-700 hover:bg-green-800 text-white rounded-full text-lg font-medium transition-colors"
              >
                View Menu
              </Link>
              <Link 
                to="/customize" 
                className="px-8 py-3 bg-white hover:bg-gray-100 text-green-800 rounded-full text-lg font-medium transition-colors"
              >
                Build Your Pizza
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center text-green-800 mb-12">
            Wholesome Ingredients, Mindful Choices
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 flex items-center justify-center bg-green-100 rounded-full mb-4">
                <LeafIcon className="w-8 h-8 text-green-700" />
              </div>
              <h3 className="text-xl font-semibold text-green-800 mb-2">Healthier Crusts</h3>
              <p className="text-gray-600">
                Our bases use ragi, beetroot, and whole grain flour for added nutrition and taste.
              </p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 flex items-center justify-center bg-green-100 rounded-full mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 text-green-700" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M2.27 21.7s9.87-3.5 12.73-6.36a4.5 4.5 0 0 0-6.36-6.37C5.77 11.84 2.27 21.7 2.27 21.7zM15.42 15.42l6.36 6.36M19.08 4.92l-6.36 6.36"/>
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-green-800 mb-2">Calorie Tracking</h3>
              <p className="text-gray-600">
                Make informed choices with our real-time calorie tracker for each ingredient.
              </p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 flex items-center justify-center bg-green-100 rounded-full mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 text-green-700" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10"/>
                  <path d="M8 14s1.5 2 4 2 4-2 4-2"/>
                  <line x1="9" y1="9" x2="9.01" y2="9"/>
                  <line x1="15" y1="9" x2="15.01" y2="9"/>
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-green-800 mb-2">Personalized Nutrition</h3>
              <p className="text-gray-600">
                Choose your ingredients by gram weight to perfectly balance your meal.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Pizzas */}
      <section className="py-16 bg-green-50">
        <div className="container mx-auto px-6">
          <div className="flex justify-between items-center mb-10">
            <h2 className="text-3xl font-bold text-green-800">Featured Pizzas</h2>
            <Link 
              to="/menu" 
              className="flex items-center text-green-700 hover:text-green-800 transition-colors"
            >
              <span className="mr-1">View all</span>
              <ChevronRight className="w-5 h-5" />
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredPizzas.map(pizza => (
              <PizzaCard key={pizza.id} pizza={pizza} />
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-green-800 text-white">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to build your perfect pizza?</h2>
          <p className="text-green-100 max-w-xl mx-auto mb-8">
            Customize your own healthy pizza with our interactive builder.
            Track calories and cost with each ingredient you add.
          </p>
          <Link 
            to="/customize" 
            className="px-8 py-3 bg-white hover:bg-gray-100 text-green-800 rounded-full text-lg font-medium inline-block transition-colors"
          >
            Start Creating
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;