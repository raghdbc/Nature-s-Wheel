import React from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { usePizza } from '../context/PizzaContext';
import { useOrders, Order } from '../context/OrderContext';
import { toast } from 'react-hot-toast';

const Admin: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const { pizzas, toppings, crusts, sauces } = usePizza();
  const { orders, updateOrderStatus } = useOrders();

  // Check if user is admin (Reethu)
  const isAdmin = user?.email === 'reethujayamma29@gmail.com';

  React.useEffect(() => {
    if (!isAdmin) {
      navigate('/');
    }
  }, [isAdmin, navigate]);

  if (!isAdmin) {
    return null;
  }

  // Calculate statistics
  const totalOrders = orders.length;
  const pendingOrders = orders.filter(order => order.status === 'pending').length;
  const completedOrders = orders.filter(order => order.status === 'completed').length;
  const totalRevenue = orders.reduce((sum, order) => sum + order.totalAmount, 0);

  const totalMenuItems = pizzas.length;
  const activeItems = pizzas.filter(pizza => !pizza.id.startsWith('custom-')).length;
  const outOfStockItems = 0; // This would come from your backend

  const totalUsers = 2; // Demo and Reethu
  const activeUsers = user ? 1 : 0;
  const newUsersToday = 0; // This would come from your backend

  const handleStatusUpdate = (orderId: string, newStatus: Order['status']) => {
    updateOrderStatus(orderId, newStatus);
    toast.success(`Order status updated to ${newStatus}`);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h1 className="text-3xl font-bold text-green-800 mb-6">Admin Dashboard</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Orders Overview Card */}
          <div className="bg-green-50 p-6 rounded-lg">
            <h2 className="text-xl font-semibold text-green-700 mb-4">Orders Overview</h2>
            <p className="text-gray-600">Total Orders: {totalOrders}</p>
            <p className="text-gray-600">Pending Orders: {pendingOrders}</p>
            <p className="text-gray-600">Completed Orders: {completedOrders}</p>
            <p className="text-gray-600 mt-2">Total Revenue: ${totalRevenue.toFixed(2)}</p>
          </div>

          {/* Menu Management Card */}
          <div className="bg-green-50 p-6 rounded-lg">
            <h2 className="text-xl font-semibold text-green-700 mb-4">Menu Management</h2>
            <p className="text-gray-600">Total Items: {totalMenuItems}</p>
            <p className="text-gray-600">Active Items: {activeItems}</p>
            <p className="text-gray-600">Out of Stock: {outOfStockItems}</p>
            <div className="mt-4">
              <h3 className="font-semibold text-green-700">Available Options:</h3>
              <p className="text-gray-600">Toppings: {toppings.length}</p>
              <p className="text-gray-600">Crusts: {crusts.length}</p>
              <p className="text-gray-600">Sauces: {sauces.length}</p>
            </div>
          </div>

          {/* User Management Card */}
          <div className="bg-green-50 p-6 rounded-lg">
            <h2 className="text-xl font-semibold text-green-700 mb-4">User Management</h2>
            <p className="text-gray-600">Total Users: {totalUsers}</p>
            <p className="text-gray-600">Active Users: {activeUsers}</p>
            <p className="text-gray-600">New Users Today: {newUsersToday}</p>
          </div>
        </div>

        {/* Orders Table */}
        <div className="mt-8">
          <h2 className="text-xl font-semibold text-green-700 mb-4">All Orders</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white">
              <thead>
                <tr className="bg-green-100">
                  <th className="px-4 py-2 text-left">Order ID</th>
                  <th className="px-4 py-2 text-left">Customer</th>
                  <th className="px-4 py-2 text-left">Date</th>
                  <th className="px-4 py-2 text-left">Items</th>
                  <th className="px-4 py-2 text-left">Total</th>
                  <th className="px-4 py-2 text-left">Status</th>
                  <th className="px-4 py-2 text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr key={order.id} className="border-b">
                    <td className="px-4 py-2">{order.id}</td>
                    <td className="px-4 py-2">
                      <div>{order.customerName}</div>
                      <div className="text-sm text-gray-500">{order.customerEmail}</div>
                    </td>
                    <td className="px-4 py-2">
                      {new Date(order.orderDate).toLocaleDateString()}
                    </td>
                    <td className="px-4 py-2">
                      {order.items.map(item => (
                        <div key={item.id} className="text-sm">
                          {item.quantity}x {item.pizza.name}
                        </div>
                      ))}
                    </td>
                    <td className="px-4 py-2">₹{order.totalAmount.toFixed(2)}</td>
                    <td className="px-4 py-2">
                      <span className={`px-2 py-1 rounded text-sm ${
                        order.status === 'completed' ? 'bg-green-100 text-green-800' :
                        order.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {order.status}
                      </span>
                    </td>
                    <td className="px-4 py-2">
                      <select
                        value={order.status}
                        onChange={(e) => handleStatusUpdate(order.id, e.target.value as Order['status'])}
                        className="border rounded px-2 py-1 text-sm"
                      >
                        <option value="pending">Pending</option>
                        <option value="completed">Completed</option>
                        <option value="cancelled">Cancelled</option>
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="mt-8">
          <button
            onClick={() => logout()}
            className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition-colors"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Admin; 