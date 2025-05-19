import React, { createContext, useState, useContext, useEffect } from 'react';
import { useAuth } from './AuthContext';
import { CartItem } from './CartContext';
import { toast } from 'react-hot-toast';

export interface Order {
  id: string;
  items: CartItem[];
  totalAmount: number;
  status: 'pending' | 'completed' | 'cancelled';
  customerName: string;
  customerEmail: string;
  orderDate: string;
  deliveryAddress?: string;
}

interface OrderContextType {
  orders: Order[];
  addOrder: (order: Omit<Order, 'id' | 'orderDate'>) => void;
  updateOrderStatus: (orderId: string, status: Order['status']) => void;
  getOrdersByStatus: (status: Order['status']) => Order[];
}

const OrderContext = createContext<OrderContextType | undefined>(undefined);

export const useOrders = () => {
  const context = useContext(OrderContext);
  if (!context) {
    throw new Error('useOrders must be used within an OrderProvider');
  }
  return context;
};

export const OrderProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [orders, setOrders] = useState<Order[]>([]);
  const { user } = useAuth();

  // Load orders from localStorage on mount
  useEffect(() => {
    const savedOrders = localStorage.getItem('orders');
    if (savedOrders) {
      try {
        const parsedOrders = JSON.parse(savedOrders);
        setOrders(parsedOrders);
      } catch (error) {
        console.error('Error loading orders:', error);
        setOrders([]);
      }
    }
  }, []);

  // Save orders to localStorage whenever they change
  useEffect(() => {
    try {
      localStorage.setItem('orders', JSON.stringify(orders));
    } catch (error) {
      console.error('Error saving orders:', error);
    }
  }, [orders]);

  // Listen for storage events to sync orders across tabs
  useEffect(() => {
    const handleStorage = (event: StorageEvent) => {
      if (event.key === 'orders') {
        try {
          const updatedOrders = event.newValue ? JSON.parse(event.newValue) : [];
          setOrders(updatedOrders);
        } catch (error) {
          console.error('Error syncing orders from storage event:', error);
        }
      }
    };
    window.addEventListener('storage', handleStorage);
    return () => window.removeEventListener('storage', handleStorage);
  }, []);

  // Poll localStorage for order changes every 2 seconds
  useEffect(() => {
    let lastOrders = localStorage.getItem('orders');
    const interval = setInterval(() => {
      const currentOrders = localStorage.getItem('orders');
      if (currentOrders !== lastOrders) {
        try {
          const parsedOrders = currentOrders ? JSON.parse(currentOrders) : [];
          setOrders(parsedOrders);
          lastOrders = currentOrders;
        } catch (error) {
          console.error('Error polling orders from localStorage:', error);
        }
      }
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const addOrder = (orderData: Omit<Order, 'id' | 'orderDate'>) => {
    try {
      const newOrder: Order = {
        ...orderData,
        id: `order-${Date.now()}`,
        orderDate: new Date().toISOString(),
      };

      setOrders(prevOrders => {
        const updatedOrders = [...prevOrders, newOrder];
        // Save to localStorage immediately
        localStorage.setItem('orders', JSON.stringify(updatedOrders));
        return updatedOrders;
      });

      // Show success message
      toast.success('Order created successfully!');
    } catch (error) {
      console.error('Error creating order:', error);
      toast.error('Failed to create order');
    }
  };

  const updateOrderStatus = (orderId: string, status: Order['status']) => {
    try {
      setOrders(prevOrders => {
        const updatedOrders = prevOrders.map(order =>
          order.id === orderId ? { ...order, status } : order
        );
        // Save to localStorage immediately
        localStorage.setItem('orders', JSON.stringify(updatedOrders));
        return updatedOrders;
      });

      // Show success message
      toast.success(`Order status updated to ${status}`);
    } catch (error) {
      console.error('Error updating order status:', error);
      toast.error('Failed to update order status');
    }
  };

  const getOrdersByStatus = (status: Order['status']) => {
    return orders.filter(order => order.status === status);
  };

  return (
    <OrderContext.Provider
      value={{
        orders,
        addOrder,
        updateOrderStatus,
        getOrdersByStatus,
      }}
    >
      {children}
    </OrderContext.Provider>
  );
}; 