import React, { createContext, useState, useContext, useEffect } from 'react';
import { pizzaData, toppingsData, crustsData, saucesData, sizes } from '../data/pizzaData';

export interface Topping {
  id: string;
  name: string;
  calories: number;
  pricePerGram: number;
  vegan: boolean;
  image?: string;
}

export interface Crust {
  id: string;
  name: string;
  calories: number;
  price: number;
  description: string;
}

export interface Sauce {
  id: string;
  name: string;
  calories: number;
  price: number;
}

export interface Size {
  id: string;
  name: string;
  multiplier: number;
  caloriesMultiplier: number;
}

export interface Pizza {
  id: string;
  name: string;
  description: string;
  image: string;
  basePrice: number;
  baseCalories: number;
  toppings: {
    id: string;
    quantity: number;
  }[];
  crust: string;
  sauce: string;
  size: string;
  vegan: boolean;
  featured: boolean;
}

interface PizzaContextType {
  pizzas: Pizza[];
  toppings: Topping[];
  crusts: Crust[];
  sauces: Sauce[];
  sizes: Size[];
  filterPizzas: (criteria: { vegan?: boolean; maxCalories?: number }) => Pizza[];
}

const PizzaContext = createContext<PizzaContextType | undefined>(undefined);

export const usePizza = () => {
  const context = useContext(PizzaContext);
  if (!context) {
    throw new Error('usePizza must be used within a PizzaProvider');
  }
  return context;
};

export const PizzaProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [pizzas, setPizzas] = useState<Pizza[]>([]);
  const [toppings, setToppings] = useState<Topping[]>([]);
  const [crusts, setCrusts] = useState<Crust[]>([]);
  const [sauces, setSauces] = useState<Sauce[]>([]);

  useEffect(() => {
    // Initialize with our static data for demo purposes
    setPizzas(pizzaData);
    setToppings(toppingsData);
    setCrusts(crustsData);
    setSauces(saucesData);
  }, []);

  const filterPizzas = (criteria: { vegan?: boolean; maxCalories?: number }) => {
    return pizzas.filter(pizza => {
      if (criteria.vegan !== undefined && pizza.vegan !== criteria.vegan) {
        return false;
      }
      
      if (criteria.maxCalories !== undefined) {
        // Calculate total calories
        const pizzaSize = sizes.find(s => s.id === pizza.size);
        const pizzaCrust = crusts.find(c => c.id === pizza.crust);
        const pizzaSauce = sauces.find(s => s.id === pizza.sauce);
        
        let totalCalories = pizza.baseCalories;
        
        if (pizzaSize) totalCalories *= pizzaSize.caloriesMultiplier;
        if (pizzaCrust) totalCalories += pizzaCrust.calories;
        if (pizzaSauce) totalCalories += pizzaSauce.calories;
        
        // Add topping calories
        pizza.toppings.forEach(topping => {
          const toppingData = toppings.find(t => t.id === topping.id);
          if (toppingData) {
            totalCalories += toppingData.calories * topping.quantity / 10; // assuming quantity is in grams
          }
        });
        
        if (totalCalories > criteria.maxCalories) {
          return false;
        }
      }
      
      return true;
    });
  };

  return (
    <PizzaContext.Provider
      value={{
        pizzas,
        toppings,
        crusts,
        sauces,
        sizes,
        filterPizzas
      }}
    >
      {children}
    </PizzaContext.Provider>
  );
};