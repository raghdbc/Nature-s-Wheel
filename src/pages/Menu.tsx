import React, { useState } from 'react';
import { Check, ChevronDown, LeafIcon, Filter } from 'lucide-react';
import { usePizza, Pizza } from '../context/PizzaContext';
import PizzaCard from '../components/pizza/PizzaCard';

const Menu: React.FC = () => {
  const { pizzas, filterPizzas } = usePizza();
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [filters, setFilters] = useState({
    dietType: 'all', // all, vegan, non-vegan
    maxCalories: 1000,
  });

  const handleFilterChange = (key: string, value: string | number) => {
    setFilters(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const applyFilters = (): Pizza[] => {
    let filtered = [...pizzas];
    
    // Apply diet type filter
    if (filters.dietType === 'vegan') {
      filtered = filterPizzas({ vegan: true });
    } else if (filters.dietType === 'non-vegan') {
      filtered = filterPizzas({ vegan: false });
    }
    
    // Apply max calories filter
    filtered = filterPizzas({ 
      vegan: filters.dietType === 'vegan' ? true : (filters.dietType === 'non-vegan' ? false : undefined),
      maxCalories: filters.maxCalories 
    });
    
    return filtered;
  };

  const filteredPizzas = applyFilters();

  return (
    <div className="min-h-screen bg-green-50 pt-24 pb-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-green-800 mb-2">Our Menu</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Browse our selection of health-conscious pizzas, each made with wholesome ingredients 
            and balanced nutrition in mind.
          </p>
        </div>

        {/* Filters */}
        <div className="mb-10">
          <button
            onClick={() => setIsFilterOpen(!isFilterOpen)}
            className="md:hidden w-full flex items-center justify-between p-3 bg-white rounded-lg shadow-sm mb-4"
          >
            <div className="flex items-center">
              <Filter className="w-5 h-5 mr-2 text-green-700" />
              <span>Filters</span>
            </div>
            <ChevronDown className={`w-5 h-5 transition-transform ${isFilterOpen ? 'rotate-180' : ''}`} />
          </button>

          <div className={`${isFilterOpen ? 'block' : 'hidden'} md:block`}>
            <div className="bg-white p-5 rounded-lg shadow-sm">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Diet Type Filter */}
                <div>
                  <h3 className="text-lg font-medium text-gray-800 mb-3">Diet Type</h3>
                  <div className="flex flex-wrap gap-2">
                    {['all', 'vegan', 'non-vegan'].map(type => (
                      <button
                        key={type}
                        onClick={() => handleFilterChange('dietType', type)}
                        className={`px-4 py-2 rounded-full border ${
                          filters.dietType === type
                            ? 'bg-green-100 border-green-700 text-green-800'
                            : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                        } transition-colors flex items-center`}
                      >
                        {filters.dietType === type && (
                          <Check className="w-4 h-4 mr-1" />
                        )}
                        {type === 'all' ? 'All' : type === 'vegan' ? 'Vegan' : 'Non-Vegan'}
                        {type === 'vegan' && <LeafIcon className="w-4 h-4 ml-1 text-green-600" />}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Max Calories Filter */}
                <div>
                  <h3 className="text-lg font-medium text-gray-800 mb-3">
                    Max Calories: {filters.maxCalories} Kcal
                  </h3>
                  <input
                    type="range"
                    min="300"
                    max="1500"
                    step="50"
                    value={filters.maxCalories}
                    onChange={(e) => handleFilterChange('maxCalories', parseInt(e.target.value))}
                    className="w-full h-2 bg-gray-200 rounded-full appearance-none cursor-pointer accent-green-700"
                  />
                  <div className="flex justify-between text-xs text-gray-500 mt-1">
                    <span>300</span>
                    <span>900</span>
                    <span>1500</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Results */}
        <div className="mb-8">
          <p className="text-gray-600 mb-4">
            Showing {filteredPizzas.length} results
          </p>

          {filteredPizzas.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredPizzas.map(pizza => (
                <PizzaCard key={pizza.id} pizza={pizza} />
              ))}
            </div>
          ) : (
            <div className="text-center py-10">
              <div className="text-green-700 mb-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-16 h-16 mx-auto" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10"/>
                  <path d="M8 15l8-8M16 15l-8-8"/>
                </svg>
              </div>
              <h3 className="text-xl font-medium text-gray-800 mb-2">No pizzas found</h3>
              <p className="text-gray-600">
                Try adjusting your filters to find something delicious.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Menu;