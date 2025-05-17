import React, { useState, useEffect } from 'react';
import { LeafIcon, ShoppingCart, Plus, Minus } from 'lucide-react';
import { usePizza, Pizza } from '../../context/PizzaContext';
import { useCart } from '../../context/CartContext';

interface PizzaCustomizerProps {
  initialPizza?: Pizza;
}

const PizzaCustomizer: React.FC<PizzaCustomizerProps> = ({ initialPizza }) => {
  const { toppings, crusts, sauces, sizes } = usePizza();
  const { calculatePizzaPrice, calculatePizzaCalories, addToCart } = useCart();
  
  const defaultPizza: Pizza = {
    id: 'custom-' + Date.now(),
    name: 'Custom Pizza',
    description: 'Your personalized healthy pizza creation',
    image: 'https://images.pexels.com/photos/4193872/pexels-photo-4193872.jpeg',
    basePrice: 250,
    baseCalories: 250,
    toppings: [],
    crust: crusts[0]?.id || '',
    sauce: sauces[0]?.id || '',
    size: sizes[0]?.id || '',
    vegan: false,
    featured: false
  };
  
  const [customPizza, setCustomPizza] = useState<Pizza>(initialPizza || defaultPizza);
  const [quantity, setQuantity] = useState(1);
  const [selectedToppings, setSelectedToppings] = useState<{ [key: string]: boolean }>({});
  const [toppingQuantities, setToppingQuantities] = useState<{ [key: string]: number }>({});
  
  useEffect(() => {
    if (initialPizza) {
      const toppingSelections: { [key: string]: boolean } = {};
      const quantities: { [key: string]: number } = {};
      
      initialPizza.toppings.forEach(topping => {
        toppingSelections[topping.id] = true;
        quantities[topping.id] = topping.quantity;
      });
      
      setSelectedToppings(toppingSelections);
      setToppingQuantities(quantities);
    }
  }, [initialPizza]);

  const handleSizeChange = (sizeId: string) => {
    setCustomPizza(prev => ({
      ...prev,
      size: sizeId
    }));
  };

  const handleCrustChange = (crustId: string) => {
    setCustomPizza(prev => ({
      ...prev,
      crust: crustId
    }));
  };

  const handleSauceChange = (sauceId: string) => {
    setCustomPizza(prev => ({
      ...prev,
      sauce: sauceId
    }));
  };

  const handleToppingToggle = (toppingId: string) => {
    const newSelected = { ...selectedToppings };
    newSelected[toppingId] = !newSelected[toppingId];
    
    setSelectedToppings(newSelected);
    
    if (newSelected[toppingId] && !toppingQuantities[toppingId]) {
      setToppingQuantities(prev => ({
        ...prev,
        [toppingId]: 20
      }));
    }
    
    updatePizzaToppings(newSelected, toppingQuantities);
  };

  const handleToppingQuantityChange = (toppingId: string, quantity: number) => {
    const newQuantity = Math.max(10, Math.min(70, quantity));
    
    setToppingQuantities(prev => ({
      ...prev,
      [toppingId]: newQuantity
    }));
    
    updatePizzaToppings(selectedToppings, {
      ...toppingQuantities,
      [toppingId]: newQuantity
    });
  };

  const updatePizzaToppings = (selected: { [key: string]: boolean }, quantities: { [key: string]: number }) => {
    const newToppings = Object.keys(selected)
      .filter(id => selected[id])
      .map(id => ({
        id,
        quantity: quantities[id] || 20
      }));
    
    setCustomPizza(prev => ({
      ...prev,
      toppings: newToppings,
      vegan: checkIfVegan(newToppings)
    }));
  };

  const checkIfVegan = (pizzaToppings: { id: string; quantity: number }[]) => {
    const nonVeganTopping = pizzaToppings.find(item => {
      const toppingData = toppings.find(t => t.id === item.id);
      return toppingData && !toppingData.vegan;
    });
    
    return !nonVeganTopping;
  };

  const handleAddToCart = () => {
    addToCart(customPizza, quantity);
    setQuantity(1);
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold text-green-800 mb-6">Build Your Healthy Pizza</h2>
      
      {/* Pizza Size */}
      <div className="mb-6">
        <h3 className="text-lg font-medium text-gray-800 mb-3">Size</h3>
        <div className="grid grid-cols-3 gap-3">
          {sizes.map(size => (
            <button
              key={size.id}
              onClick={() => handleSizeChange(size.id)}
              className={`px-4 py-2 rounded-full border ${
                customPizza.size === size.id
                  ? 'bg-green-100 border-green-700 text-green-800'
                  : 'border-gray-300 text-gray-700 hover:bg-gray-50'
              } transition-colors`}
            >
              <div className="font-medium">{size.name}</div>
              <div className="text-xs text-gray-500">
                ₹{Math.round(customPizza.basePrice * size.multiplier)}
              </div>
            </button>
          ))}
        </div>
      </div>
      
      {/* Pizza Crust */}
      <div className="mb-6">
        <h3 className="text-lg font-medium text-gray-800 mb-3">Crust</h3>
        <div className="grid grid-cols-2 gap-3">
          {crusts.map(crust => (
            <button
              key={crust.id}
              onClick={() => handleCrustChange(crust.id)}
              className={`px-4 py-2 rounded-lg border ${
                customPizza.crust === crust.id
                  ? 'bg-green-100 border-green-700 text-green-800'
                  : 'border-gray-300 text-gray-700 hover:bg-gray-50'
              } transition-colors`}
            >
              <div className="font-medium">{crust.name}</div>
              <div className="text-xs text-gray-500">
                ₹{crust.price} • {crust.calories} Kcal
              </div>
            </button>
          ))}
        </div>
      </div>
      
      {/* Pizza Sauce */}
      <div className="mb-6">
        <h3 className="text-lg font-medium text-gray-800 mb-3">Sauce</h3>
        <div className="grid grid-cols-2 gap-3">
          {sauces.map(sauce => (
            <button
              key={sauce.id}
              onClick={() => handleSauceChange(sauce.id)}
              className={`px-4 py-2 rounded-lg border ${
                customPizza.sauce === sauce.id
                  ? 'bg-green-100 border-green-700 text-green-800'
                  : 'border-gray-300 text-gray-700 hover:bg-gray-50'
              } transition-colors`}
            >
              <div className="font-medium">{sauce.name}</div>
              <div className="text-xs text-gray-500">
                ₹{sauce.price} • {sauce.calories} Kcal
              </div>
            </button>
          ))}
        </div>
      </div>
      
      {/* Toppings */}
      <div className="mb-6">
        <h3 className="text-lg font-medium text-gray-800 mb-3">Toppings</h3>
        <div className="space-y-3">
          {toppings.map(topping => (
            <div key={topping.id} className="flex items-center justify-between border rounded-lg p-3">
              <div className="flex items-start">
                <input
                  type="checkbox"
                  id={`topping-${topping.id}`}
                  checked={selectedToppings[topping.id] || false}
                  onChange={() => handleToppingToggle(topping.id)}
                  className="mt-1 h-4 w-4 text-green-700 rounded focus:ring-green-700 border-gray-300"
                />
                <label 
                  htmlFor={`topping-${topping.id}`}
                  className="ml-2 block"
                >
                  <span className="flex items-center text-gray-800 font-medium">
                    {topping.name}
                    {topping.vegan && (
                      <LeafIcon className="w-3 h-3 ml-1 text-green-600" />
                    )}
                  </span>
                  <div className="text-xs text-gray-500">
                    ₹{(topping.pricePerGram * 10).toFixed(1)}/10g • {topping.calories / 10} Kcal/10g
                  </div>
                </label>
              </div>
              
              {selectedToppings[topping.id] && (
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => handleToppingQuantityChange(
                      topping.id, 
                      (toppingQuantities[topping.id] || 20) - 10
                    )}
                    disabled={(toppingQuantities[topping.id] || 20) <= 10}
                    className={`p-1 rounded-full ${
                      (toppingQuantities[topping.id] || 20) <= 10
                        ? 'bg-gray-100 text-gray-400'
                        : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                    }`}
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="text-sm font-medium min-w-[2.5rem] text-center">
                    {toppingQuantities[topping.id] || 20}g
                  </span>
                  <button
                    onClick={() => handleToppingQuantityChange(
                      topping.id, 
                      (toppingQuantities[topping.id] || 20) + 10
                    )}
                    disabled={(toppingQuantities[topping.id] || 20) >= 70}
                    className={`p-1 rounded-full ${
                      (toppingQuantities[topping.id] || 20) >= 70
                        ? 'bg-gray-100 text-gray-400'
                        : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                    }`}
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
      
      {/* Summary */}
      <div className="mt-8 border-t pt-4">
        <div className="flex justify-between mb-2">
          <span className="text-gray-700">Price:</span>
          <span className="font-medium text-gray-900">₹{calculatePizzaPrice(customPizza)}</span>
        </div>
        <div className="flex justify-between mb-4">
          <span className="text-gray-700">Calories:</span>
          <span className="font-medium text-gray-900">{calculatePizzaCalories(customPizza)} Kcal</span>
        </div>
        
        {customPizza.vegan && (
          <div className="mb-4 text-green-700 text-sm flex items-center">
            <LeafIcon className="w-4 h-4 mr-1" />
            This pizza is vegan-friendly!
          </div>
        )}
        
        <div className="flex items-center justify-between mt-4">
          <div className="flex items-center space-x-2">
            <button 
              onClick={() => setQuantity(prev => Math.max(1, prev - 1))}
              className="p-1 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
            >
              <Minus className="w-5 h-5 text-gray-700" />
            </button>
            <span className="font-medium text-lg">{quantity}</span>
            <button 
              onClick={() => setQuantity(prev => prev + 1)}
              className="p-1 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
            >
              <Plus className="w-5 h-5 text-gray-700" />
            </button>
          </div>
          
          <button
            onClick={handleAddToCart}
            className="py-3 px-6 bg-green-700 hover:bg-green-800 text-white rounded-full flex items-center space-x-2 transition-colors"
          >
            <ShoppingCart className="w-5 h-5" />
            <span>Add to Cart • ₹{(calculatePizzaPrice(customPizza) * quantity).toFixed(2)}</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default PizzaCustomizer;