import React, { createContext, useState, useContext, useEffect } from 'react';
import { toast } from 'react-hot-toast';
import { Pizza, usePizza, Crust, Sauce, Size, Topping } from './PizzaContext';

interface CartItem {
  id: string;
  pizza: Pizza;
  quantity: number;
  totalPrice: number;
  totalCalories: number;
}

interface CartContextType {
  cartItems: CartItem[];
  addToCart: (pizza: Pizza, quantity: number) => void;
  removeFromCart: (itemId: string) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
  clearCart: () => void;
  cartTotal: number;
  cartCalories: number;
  calculatePizzaPrice: (pizza: Pizza) => number;
  calculatePizzaCalories: (pizza: Pizza) => number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [cartTotal, setCartTotal] = useState(0);
  const [cartCalories, setCartCalories] = useState(0);
  const { toppings, crusts, sauces, sizes } = usePizza();

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      setCartItems(JSON.parse(savedCart));
    }
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cartItems));
    
    // Calculate totals
    const total = cartItems.reduce((sum, item) => sum + item.totalPrice, 0);
    const calories = cartItems.reduce((sum, item) => sum + item.totalCalories, 0);
    
    setCartTotal(total);
    setCartCalories(calories);
  }, [cartItems]);

  const calculatePizzaPrice = (pizza: Pizza) => {
    // Get size, crust, and sauce objects
    const pizzaSize = sizes.find(s => s.id === pizza.size) as Size;
    const pizzaCrust = crusts.find(c => c.id === pizza.crust) as Crust;
    const pizzaSauce = sauces.find(s => s.id === pizza.sauce) as Sauce;
    
    // Calculate base price with size multiplier
    let totalPrice = pizza.basePrice * pizzaSize.multiplier;
    
    // Add crust and sauce prices
    totalPrice += pizzaCrust.price;
    totalPrice += pizzaSauce.price;
    
    // Add topping prices
    pizza.toppings.forEach(topping => {
      const toppingData = toppings.find(t => t.id === topping.id) as Topping;
      totalPrice += toppingData.pricePerGram * topping.quantity;
    });
    
    // Apply 20% markup for customized pizzas
    if (pizza.id.startsWith('custom-')) {
      totalPrice *= 1.2;
    }
    
    return parseFloat(totalPrice.toFixed(2));
  };

  const calculatePizzaCalories = (pizza: Pizza) => {
    // Get size, crust, and sauce objects
    const pizzaSize = sizes.find(s => s.id === pizza.size) as Size;
    const pizzaCrust = crusts.find(c => c.id === pizza.crust) as Crust;
    const pizzaSauce = sauces.find(s => s.id === pizza.sauce) as Sauce;
    
    // Calculate base calories with size multiplier
    let totalCalories = pizza.baseCalories * pizzaSize.caloriesMultiplier;
    
    // Add crust and sauce calories
    totalCalories += pizzaCrust.calories;
    totalCalories += pizzaSauce.calories;
    
    // Add topping calories
    pizza.toppings.forEach(topping => {
      const toppingData = toppings.find(t => t.id === topping.id) as Topping;
      totalCalories += toppingData.calories * topping.quantity / 10;
    });
    
    return Math.round(totalCalories);
  };

  const addToCart = (pizza: Pizza, quantity: number) => {
    const totalPrice = calculatePizzaPrice(pizza) * quantity;
    const totalCalories = calculatePizzaCalories(pizza) * quantity;
    
    // Check if this exact pizza is already in cart
    const existingItemIndex = cartItems.findIndex(item => 
      item.pizza.id === pizza.id &&
      item.pizza.crust === pizza.crust &&
      item.pizza.sauce === pizza.sauce &&
      item.pizza.size === pizza.size &&
      JSON.stringify(item.pizza.toppings) === JSON.stringify(pizza.toppings)
    );
    
    if (existingItemIndex !== -1) {
      // Update existing item
      const updatedItems = [...cartItems];
      const existingItem = updatedItems[existingItemIndex];
      
      updatedItems[existingItemIndex] = {
        ...existingItem,
        quantity: existingItem.quantity + quantity,
        totalPrice: existingItem.totalPrice + totalPrice,
        totalCalories: existingItem.totalCalories + totalCalories
      };
      
      setCartItems(updatedItems);
      toast.success(`Updated ${pizza.name} quantity in cart`);
    } else {
      // Add new item
      const newItem: CartItem = {
        id: `${pizza.id}-${Date.now()}`,
        pizza,
        quantity,
        totalPrice,
        totalCalories
      };
      
      setCartItems([...cartItems, newItem]);
      toast.success(`Added ${pizza.name} to cart`);
    }
  };

  const removeFromCart = (itemId: string) => {
    const itemToRemove = cartItems.find(item => item.id === itemId);
    if (itemToRemove) {
      setCartItems(cartItems.filter(item => item.id !== itemId));
      toast.success(`Removed ${itemToRemove.pizza.name} from cart`);
    }
  };

  const updateQuantity = (itemId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(itemId);
      return;
    }
    
    const updatedItems = cartItems.map(item => {
      if (item.id === itemId) {
        const pizzaPrice = calculatePizzaPrice(item.pizza);
        const pizzaCalories = calculatePizzaCalories(item.pizza);
        
        return {
          ...item,
          quantity,
          totalPrice: pizzaPrice * quantity,
          totalCalories: pizzaCalories * quantity
        };
      }
      return item;
    });
    
    setCartItems(updatedItems);
    toast.success('Cart updated');
  };

  const clearCart = () => {
    setCartItems([]);
    toast.success('Cart cleared');
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        cartTotal,
        cartCalories,
        calculatePizzaPrice,
        calculatePizzaCalories
      }}
    >
      {children}
    </CartContext.Provider>
  );
};