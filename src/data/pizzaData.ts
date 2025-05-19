import { Pizza, Topping, Crust, Sauce, Size } from '../context/PizzaContext';

// Size options with adjusted pricing multipliers
export const sizes: Size[] = [
  {
    id: 'small',
    name: 'Small',
    multiplier: 0.9,
    caloriesMultiplier: 0.8
  },
  {
    id: 'medium',
    name: 'Medium',
    multiplier: 1.2,
    caloriesMultiplier: 1
  },
  {
    id: 'large',
    name: 'Large',
    multiplier: 1.5,
    caloriesMultiplier: 1.2
  }
];

// Crust options with adjusted pricing
export const crustsData: Crust[] = [
  {
    id: 'ragi',
    name: 'Ragi Thin Crust',
    calories: 120,
    price: 60,
    description: 'Made with nutritious ragi (finger millet) flour'
  },
  {
    id: 'wheat',
    name: 'Whole Wheat',
    calories: 150,
    price: 50,
    description: 'Wholesome crust made with 100% whole wheat flour'
  },
  {
    id: 'beetroot',
    name: 'Beetroot Crust',
    calories: 140,
    price: 70,
    description: 'Colorful and nutritious with real beetroot'
  },
  {
    id: 'multigrain',
    name: 'Multigrain',
    calories: 160,
    price: 65,
    description: 'Blend of seven healthy grains'
  },
  {
    id: 'oats',
    name: 'Oats Crust',
    calories: 130,
    price: 65,
    description: 'High-fiber oats crust for better nutrition'
  },
  {
    id: 'cauliflower',
    name: 'Cauliflower Crust',
    calories: 90,
    price: 75,
    description: 'Low-carb cauliflower-based crust'
  }
];

// Sauce options with adjusted pricing
export const saucesData: Sauce[] = [
  {
    id: 'tomato',
    name: 'Fresh Tomato',
    calories: 30,
    price: 25
  },
  {
    id: 'pesto',
    name: 'Basil Pesto',
    calories: 70,
    price: 45
  },
  {
    id: 'hummus',
    name: 'Hummus Base',
    calories: 90,
    price: 50
  },
  {
    id: 'yogurt',
    name: 'Mint Yogurt',
    calories: 50,
    price: 40
  },
  {
    id: 'olive-oil',
    name: 'Olive Oil & Herbs',
    calories: 80,
    price: 45
  }
];

// Enhanced toppings with more protein options
export const toppingsData: Topping[] = [
  {
    id: 'cheese',
    name: 'Low-Fat Mozzarella',
    calories: 90,
    pricePerGram: 1,
    vegan: false
  },
  {
    id: 'vegan-cheese',
    name: 'Vegan Cheese',
    calories: 80,
    pricePerGram: 1,
    vegan: true
  },
  {
    id: 'grilled-chicken',
    name: 'Grilled Chicken',
    calories: 100,
    pricePerGram: 1,
    vegan: false
  },
  {
    id: 'chicken-tikka',
    name: 'Chicken Tikka',
    calories: 110,
    pricePerGram: 1,  
    vegan: false
  },
  {
    id: 'egg',
    name: 'Boiled Egg',
    calories: 70,
    pricePerGram: 1,
    vegan: false
  },
  {
    id: 'paneer',
    name: 'Paneer Cubes',
    calories: 75,
    pricePerGram: 1.0,
    vegan: false
  },
  {
    id: 'tofu',
    name: 'Grilled Tofu',
    calories: 40,
    pricePerGram: 1,
    vegan: true
  },
  {
    id: 'chickpeas',
    name: 'Roasted Chickpeas',
    calories: 60,
    pricePerGram: 1,
    vegan: true
  },
  {
    id: 'mushrooms',
    name: 'Mushrooms',
    calories: 20,
    pricePerGram: 1,    
    vegan: true
  },
  {
    id: 'spinach',
    name: 'Fresh Spinach',
    calories: 10,
    pricePerGram: 1,
    vegan: true
  },
  {
    id: 'tomatoes',
    name: 'Cherry Tomatoes',
    calories: 15,
    pricePerGram: 1,
    vegan: true
  },
  {
    id: 'bell-peppers',
    name: 'Bell Peppers',
    calories: 12,
    pricePerGram: 1,
    vegan: true
  },
  {
    id: 'onions',
    name: 'Red Onions',
    calories: 18,
    pricePerGram: 1,
    vegan: true
  },
  {
    id: 'olives',
    name: 'Black Olives',
    calories: 30,
    pricePerGram: 1,
    vegan: true
  },
  {
    id: 'avocado',
    name: 'Avocado Slices',
    calories: 65,
    pricePerGram: 1,
    vegan: true
  },
  {
    id: 'broccoli',
    name: 'Broccoli Florets',
    calories: 15,
    pricePerGram: 1,
    vegan: true
  },
  {
    id: 'cauliflower',
    name: 'Roasted Cauliflower',
    calories: 25,
    pricePerGram: 1,
    vegan: true
  }
];

// Enhanced pre-made pizzas
export const pizzaData: Pizza[] = [
  {
    id: 'beetroot-balance',
    name: 'Beetroot Balance',
    description: 'A vibrant and nutritious pizza featuring our signature beetroot crust topped with fresh vegetables and low-fat mozzarella.',
    image: 'https://media.istockphoto.com/id/984065308/photo/beetroot-pizza-crust-with-fresh-mangold-leaves.jpg?s=170667a&w=0&k=20&c=RhOjhIPrAQFKjvNV-7cr_b6eTAwBx5vPiKEPthn3hTY=',
    basePrice: 280,
    baseCalories: 200,
    toppings: [
      { id: 'cheese', quantity: 25 },
      { id: 'spinach', quantity: 20 },
      { id: 'bell-peppers', quantity: 20 },
      { id: 'tomatoes', quantity: 20 }
    ],
    crust: 'beetroot',
    sauce: 'tomato',
    size: 'medium',
    vegan: false,
    featured: true
  },
  {
    id: 'Cashew-Cream-Crunch',
    name: 'Cashew-Cream-Crunch',
    description: 'A vibrant and nutritious pizza featuring our signature beetroot crust topped with fresh vegetables and low-fat mozzarella.',
    image: 'https://www.makingthymeforhealth.com/wp-content/uploads/2017/03/White-Garlic-Cashew-Cream-Pizza-with-Dijon-Brussels-and-Shiitake-Bacon-04.jpg',
    basePrice: 280,
    baseCalories: 200,
    toppings: [
      { id: 'cheese', quantity: 25 },
      { id: 'spinach', quantity: 20 },
      { id: 'bell-peppers', quantity: 20 },
      { id: 'tomatoes', quantity: 20 }
    ],
    crust: 'beetroot',
    sauce: 'tomato',
    size: 'medium',
    vegan: true,
    featured: true
  },
  {
    id: 'BBQ-Jackfruit Blaze',
    name: 'BBQ-Jackfruit Blaze',
    description: 'A vibrant and nutritious pizza featuring our signature beetroot crust topped with fresh vegetables and low-fat mozzarella.',
    image: 'https://cdn.prod.website-files.com/625aff85c051395e6f8d5f8b/628cb7f19ae443bebf4f1f8d_VEGAN-BBQ-JACKFRUIT-PIZZA.jpg',
    basePrice: 290,
    baseCalories: 300,
    toppings: [
      { id: 'cheese', quantity: 25 },
      { id: 'spinach', quantity: 20 },
      { id: 'bell-peppers', quantity: 20 },
      { id: 'tomatoes', quantity: 20 }
    ],
    crust: 'beetroot',
    sauce: 'tomato',
    size: 'medium',
    vegan: true,
    featured: true
  },
  {
    id: 'ragi-special',
    name: 'Ragi Special',
    description: 'Our signature ragi crust topped with mushrooms, corn, and bell peppers. A calcium-rich, healthy option.',
    image: 'https://mytastycurry.com/wp-content/uploads/2020/02/Ragi-crust-pizza.jpg',
    basePrice: 290,
    baseCalories: 220,
    toppings: [
      { id: 'cheese', quantity: 25 },
      { id: 'mushrooms', quantity: 25 },
      { id: 'bell-peppers', quantity: 20 },
      { id: 'onions', quantity: 15 }
    ],
    crust: 'ragi',
    sauce: 'tomato',
    size: 'medium',
    vegan: false,
    featured: true
  },
  {
    id: 'oats-delight',
    name: 'Oats Delight',
    description: 'A fiber-rich pizza with oats crust, topped with fresh vegetables and a light yogurt sauce.',
    image: 'https://thethrobbingeggplant.com/wp-content/uploads/2022/03/vegan-oat-flour-pizza-crust-no-oil-recipe-1.jpg ',
    basePrice: 270,
    baseCalories: 180,
    toppings: [
      { id: 'cheese', quantity: 20 },
      { id: 'spinach', quantity: 20 },
      { id: 'tomatoes', quantity: 20 },
      { id: 'bell-peppers', quantity: 20 }
    ],
    crust: 'oats',
    sauce: 'yogurt',
    size: 'medium',
    vegan: false,
    featured: false
  },
  {
    id: 'paneer-powerhouse',
    name: 'Paneer Powerhouse',
    description: 'Protein-packed pizza with generous portions of paneer, topped with bell peppers and onions.',
    image: 'https://img.freepik.com/premium-photo/paneer-pizza-top-view-white-background_957803-1943.jpg',
    basePrice: 310,
    baseCalories: 250,
    toppings: [
      { id: 'cheese', quantity: 25 },
      { id: 'paneer', quantity: 40 },
      { id: 'bell-peppers', quantity: 20 },
      { id: 'onions', quantity: 15 }
    ],
    crust: 'multigrain',
    sauce: 'tomato',
    size: 'medium',
    vegan: false,
    featured: true
  },
  {
    id: 'grilled-chicken-delight',
    name: 'Grilled Chicken Delight',
    description: 'High-protein pizza featuring succulent grilled chicken with a mix of fresh vegetables.',
    image: 'https://images.pexels.com/photos/905847/pexels-photo-905847.jpeg',
    basePrice: 330,
    baseCalories: 280,
    toppings: [
      { id: 'cheese', quantity: 25 },
      { id: 'grilled-chicken', quantity: 40 },
      { id: 'bell-peppers', quantity: 20 },
      { id: 'onions', quantity: 15 }
    ],
    crust: 'wheat',
    sauce: 'tomato',
    size: 'medium',
    vegan: false,
    featured: false
  },
  {
    id: 'egg-veggie-boost',
    name: 'Egg & Veggie Boost',
    description: 'A protein-rich combination of boiled eggs and fresh vegetables on our whole wheat crust.',
    image: 'https://c.ndtvimg.com/2022-04/5ao35ub_egg-pizza_625x300_19_April_22.jpg?im=FaceCrop,algorithm=dnn,width=620,height=350',
    basePrice: 290,
    baseCalories: 240,
    toppings: [
      { id: 'cheese', quantity: 25 },
      { id: 'egg', quantity: 30 },
      { id: 'spinach', quantity: 20 },
      { id: 'tomatoes', quantity: 20 }
    ],
    crust: 'wheat',
    sauce: 'olive-oil',
    size: 'medium',
    vegan: false,
    featured: false
  },
  {
    id: 'avocado-protein-boost',
    name: 'Avocado Protein Boost',
    description: 'Nutrient-rich pizza topped with avocado, chickpeas, and a variety of vegetables.',
    image: 'https://www.mindfood.com/wp-content/uploads/2021/07/avo-pizza-632.jpg',
    basePrice: 320,
    baseCalories: 260,
    toppings: [
      { id: 'vegan-cheese', quantity: 25 },
      { id: 'avocado', quantity: 30 },
      { id: 'chickpeas', quantity: 25 },
      { id: 'spinach', quantity: 20 }
    ],
    crust: 'multigrain',
    sauce: 'hummus',
    size: 'medium',
    vegan: true,
    featured: true
  },
  {
    id: 'mediterranean-mist',
    name: 'Mediterranean Mist',
    description: 'A Mediterranean-inspired pizza with olives, cherry tomatoes, and herbs on our olive oil base.',
    image: 'https://images.pexels.com/photos/1146760/pexels-photo-1146760.jpeg',
    basePrice: 300,
    baseCalories: 230,
    toppings: [
      { id: 'cheese', quantity: 25 },
      { id: 'olives', quantity: 20 },
      { id: 'tomatoes', quantity: 25 },
      { id: 'onions', quantity: 15 }
    ],
    crust: 'wheat',
    sauce: 'olive-oil',
    size: 'medium',
    vegan: false,
    featured: false
  },
  {
    id: 'cauliflower-classic',
    name: 'Cauliflower Classic',
    description: 'Low-carb cauliflower crust pizza topped with roasted vegetables and premium cheese.',
    image: 'https://images.pexels.com/photos/5792329/pexels-photo-5792329.jpeg',
    basePrice: 310,
    baseCalories: 200,
    toppings: [
      { id: 'cheese', quantity: 25 },
      { id: 'cauliflower', quantity: 30 },
      { id: 'tomatoes', quantity: 20 },
      { id: 'bell-peppers', quantity: 20 }
    ],
    crust: 'cauliflower',
    sauce: 'pesto',
    size: 'medium',
    vegan: false,
    featured: false
  },
  {
    id: 'broccoli-boost',
    name: 'Broccoli Boost',
    description: 'Nutrient-packed pizza featuring fresh broccoli, mushrooms, and our special pesto sauce.',
    image: 'https://img.taste.com.au/d4mJY5LX/w1200-h630-cfill/taste/2016/11/broccoli-and-bacon-pizza-105800-1.jpeg',
    basePrice: 290,
    baseCalories: 210,
    toppings: [
      { id: 'cheese', quantity: 25 },
      { id: 'broccoli', quantity: 30 },
      { id: 'mushrooms', quantity: 20 },
      { id: 'bell-peppers', quantity: 20 }
    ],
    crust: 'multigrain',
    sauce: 'pesto',
    size: 'medium',
    vegan: false,
    featured: false
  }
];