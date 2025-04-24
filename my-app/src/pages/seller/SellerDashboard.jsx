import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { BarChart3, Package, ShoppingCart, Plus, ChevronRight, TrendingUp, AlertCircle, User, LogOut } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import './SellerDashboard.css';

const SellerDashboard = () => {
  const navigate = useNavigate();
  const { user, userRole, logout } = useAuth(); // Get user, userRole, and logout from auth context
  const [products, setProducts] = useState([]);
  const [pendingOrders, setPendingOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Check if user has seller role, if not redirect
  useEffect(() => {
    if (userRole !== 'seller') {
      navigate('/unauthorized');
    }
  }, [userRole, navigate]);
  
  // Fetch products
  useEffect(() => {
    setLoading(true);
    // You might need to update this to use your actual API endpoints and auth methods
    fetch('/api/seller/items', {
      headers: {
        // Include authentication token if needed
        'Authorization': `Bearer ${user?.getIdToken ? user.getIdToken() : ''}`
      }
    })
      .then(res => {
        if (!res.ok) {
          throw new Error('Failed to fetch');
        }
        return res.json();
      })
      .then(data => {
        setProducts(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching products:', err);
        setLoading(false);
      });
  }, [user]);

  // Fetch orders
  useEffect(() => {
    fetch('/api/seller/orders?status=pending', {
      headers: {
        'Authorization': `Bearer ${user?.getIdToken ? user.getIdToken() : ''}`
      }
    })
      .then(res => {
        if (!res.ok) {
          throw new Error('Failed to fetch orders');
        }
        return res.json();
      })
      .then(data => setPendingOrders(data))
      .catch(err => console.error('Error fetching orders:', err));
  }, [user]);

  // Sample recent sales data - you might want to replace this with actual data
  const recentSales = [
    { id: 1, product: 'Wireless Headphones', date: 'Today, 2:30 PM', amount: '₹1,299', status: 'Completed' },
    { id: 2, product: 'Smart Watch', date: 'Today, 11:15 AM', amount: '₹2,499', status: 'Processing' },
    { id: 3, product: 'Bluetooth Speaker', date: 'Yesterday', amount: '₹799', status: 'Completed' },
  ];

  // Navigate to different pages
  const navigateTo = (path) => {
    navigate(path);
  };

  // Handle logout
  const handleLogout = async () => {
    try {
      await logout();
      // No need to navigate here as logout function handles navigation
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  // If still loading user role, show loading
  if (!userRole) {
    return <div className="loading-container">Checking permissions...</div>;
  }

  return (
    <div className="app-container">
      {/* Header/Navbar */}
      <div className="navbar">
        <div className="navbar-brand">
          <h1 className="page-title">Seller Dashboard</h1>
        </div>
        <div className="navbar-welcome">
          <p className="welcome-text">Welcome back, {user?.email || 'Seller'}</p>
        </div>
        <div className="navbar-actions">
          <button 
            onClick={() => navigateTo('/seller/profile')} 
            className="navbar-button profile-button"
            title="My Profile"
          >
            <User size={18} />
            <span>Profile</span>
          </button>
          <button 
            onClick={handleLogout} 
            className="navbar-button logout-button"
            title="Logout"
          >
            <LogOut size={18} />
            <span>Logout</span>
          </button>
        </div>
      </div>

      {/* Dashboard Content */}
      <div className="main-container">
        <p className="subtitle">Here's your store overview</p>
        
        <div className="stats-grid">
          <div className="stat-card blue-border">
            <div className="stat-content">
              <div className="stat-details">
                <p className="stat-label">Total Products</p>
                {loading ? (
                  <p className="stat-value">...</p>
                ) : (
                  <p className="stat-value">{products.length}</p>
                )}
                <p className="stat-trend trend-up">
                  <TrendingUp size={14} className="trend-icon" /> 
                  <span>In your inventory</span>
                </p>
              </div>
              <div className="stat-icon-wrapper">
                <Package className="blue-icon" size={24} />
              </div>
            </div>
          </div>
          
          <div className="stat-card amber-border">
            <div className="stat-content">
              <div className="stat-details">
                <p className="stat-label">Pending Orders</p>
                <p className="stat-value">{pendingOrders.length}</p>
                <p className="stat-trend trend-warning">
                  <AlertCircle size={14} className="trend-icon" /> 
                  <span>{pendingOrders.length > 0 ? 'Requires attention' : 'No pending orders'}</span>
                </p>
              </div>
              <div className="stat-icon-wrapper">
                <ShoppingCart className="amber-icon" size={24} />
              </div>
            </div>
          </div>
          
          <div className="stat-card green-border">
            <div className="stat-content">
              <div className="stat-details">
                <p className="stat-label">Monthly Revenue</p>
                <p className="stat-value">₹{products.reduce((sum, p) => sum + (p.price * (p.sold || 0)), 0).toLocaleString('en-IN')}</p>
                <p className="stat-trend trend-up">
                  <TrendingUp size={14} className="trend-icon" /> 
                  <span>Based on completed sales</span>
                </p>
              </div>
              <div className="stat-icon-wrapper">
                <BarChart3 className="green-icon" size={24} />
              </div>
            </div>
          </div>
        </div>
        
        {/* Actions */}
        <div className="card">
          <h2 className="card-title">Quick Actions</h2>
          <div className="actions-container">
            <button 
              onClick={() => navigateTo('/seller/add-item')}
              className="action-button blue-button"
            >
              <Plus size={18} className="action-icon" />
              <span>Add New Item</span>
            </button>
            <button 
              onClick={() => navigateTo('/seller/my-products')}
              className="action-button indigo-button"
            >
              <Package size={18} className="action-icon" />
              <span>Manage Products {products.length > 0 && `(${products.length})`}</span>
            </button>
            <button 
              onClick={() => navigateTo('/seller/orders')}
              className="action-button green-button"
            >
              <ShoppingCart size={18} className="action-icon" />
              <span>View Orders {pendingOrders.length > 0 && `(${pendingOrders.length})`}</span>
            </button>
          </div>
        </div>
        
        {/* Products Preview */}
        {products.length > 0 && (
          <div className="card">
            <div className="card-header">
              <h2 className="card-title">Recent Products</h2>
              <button 
                onClick={() => navigateTo('/seller/my-products')}
                className="view-all"
              >
                View All <ChevronRight size={16} className="chevron-icon" />
              </button>
            </div>
            <div className="products-grid">
              {products.slice(0, 3).map((product) => (
                <div key={product.id} className="product-card">
                  {product.imageUrl && (
                    <img src={product.imageUrl} alt={product.name} className="product-image" />
                  )}
                  <div className="product-details">
                    <h3 className="product-title">{product.name}</h3>
                    <p className="product-description">{product.description}</p>
                    <div className="product-footer">
                      <span className="product-price">₹{product.price}</span>
                      <span className="product-stock">Qty: {product.quantity}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        
        {/* Recent Sales */}
        <div className="card">
          <div className="card-header">
            <h2 className="card-title">Recent Sales</h2>
            <button 
              onClick={() => navigateTo('/seller/orders')}
              className="view-all"
            >
              View All <ChevronRight size={16} className="chevron-icon" />
            </button>
          </div>
          {recentSales.length > 0 ? (
            <div className="table-container">
              <table className="sales-table">
                <thead>
                  <tr className="table-header">
                    <th>Product</th>
                    <th>Date</th>
                    <th>Amount</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {recentSales.map(sale => (
                    <tr key={sale.id} className="table-row">
                      <td className="table-cell">{sale.product}</td>
                      <td className="table-cell table-date">{sale.date}</td>
                      <td className="table-cell table-price">{sale.amount}</td>
                      <td className="table-cell">
                        <span className={`status-tag ${
                          sale.status === 'Completed' ? 'status-completed' : 'status-processing'
                        }`}>
                          {sale.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="empty-message">No sales recorded yet.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default SellerDashboard;