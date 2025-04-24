import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Search, Edit, Trash2, Filter, SortDesc, Loader2 } from 'lucide-react';
import { Package, Plus, Image } from 'lucide-react';
import './MyProducts.css'; // Make sure to import the CSS file

const MyProducts = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('newest');
  const [filterCategory, setFilterCategory] = useState('');

  // Fetch products
  useEffect(() => {
    setLoading(true);
    fetch('/api/seller/items')
      .then(res => res.json())
      .then(data => {
        setProducts(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching products:', err);
        setLoading(false);
      });
  }, []);

  // Navigate back to dashboard
  const navigateToDashboard = () => {
    navigate('/seller/dashboard');
  };

  // Handle product deletion
  const handleDelete = async (productId) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        await fetch(`/api/seller/items/${productId}`, {
          method: 'DELETE',
        });
        setProducts(products.filter(product => product.id !== productId));
      } catch (error) {
        console.error('Error deleting product:', error);
      }
    }
  };

  // Navigate to edit product page
  const navigateToEditProduct = (productId) => {
    navigate(`/seller/edit-item/${productId}`);
  };

  // Filter and sort products
  const filteredAndSortedProducts = products
    .filter(product => {
      const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                            product.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = filterCategory ? product.category === filterCategory : true;
      return matchesSearch && matchesCategory;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'priceAsc':
          return a.price - b.price;
        case 'priceDesc':
          return b.price - a.price;
        case 'name':
          return a.name.localeCompare(b.name);
        default: // newest
          return new Date(b.createdAt || Date.now()) - new Date(a.createdAt || Date.now());
      }
    });

  // Get unique categories
  const categories = [...new Set(products.map(product => product.category).filter(Boolean))];
  
  return (
    <div className="app-container">
      <div className="header">
        <div className="header-content">
          <button 
            onClick={navigateToDashboard}
            className="back-button"
          >
            <ArrowLeft size={20} />
          </button>
          <div className="header-info">
            <h1 className="page-title">My Products</h1>
            <p className="subtitle">Manage your inventory</p>
          </div>
        </div>
      </div>

      <div className="main-container">
        {/* Search and Filters */}
        <div className="search-filter-card">
          <div className="search-filter-grid">
            <div className="input-group">
              <div className="input-icon">
                <Search size={18} />
              </div>
              <input
                type="text"
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="search-input"
              />
            </div>
            
            <div className="input-group">
              <div className="input-icon">
                <Filter size={18} />
              </div>
              <select
                value={filterCategory}
                onChange={(e) => setFilterCategory(e.target.value)}
                className="filter-select"
              >
                <option value="">All Categories</option>
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>
            
            <div className="input-group">
              <div className="input-icon">
                <SortDesc size={18} />
              </div>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="sort-select"
              >
                <option value="newest">Newest First</option>
                <option value="priceAsc">Price: Low to High</option>
                <option value="priceDesc">Price: High to Low</option>
                <option value="name">Name (A-Z)</option>
              </select>
            </div>
          </div>
        </div>

        {/* Products Grid */}
        {loading ? (
          <div className="loading-container">
            <Loader2 size={40} className="spinner" />
          </div>
        ) : filteredAndSortedProducts.length === 0 ? (
          <div className="empty-state">
            <div className="icon-container">
              <div className="icon-bg">
                <Package size={32} className="icon-blue" />
              </div>
            </div>
            <h3 className="empty-title">No products found</h3>
            <p className="empty-message">
              {products.length === 0 
                ? "You haven't added any products yet." 
                : "No products match your filters."}
            </p>
            {products.length === 0 && (
              <button 
                onClick={() => navigate('/seller/add-item')}
                className="add-product-button"
              >
                <Plus size={18} className="button-icon" />
                Add Your First Product
              </button>
            )}
          </div>
        ) : (
          <div className="products-grid">
            {filteredAndSortedProducts.map((product) => (
              <div key={product.id} className="product-card">
                {product.imageUrl ? (
                  <img src={product.imageUrl} alt={product.name} className="product-image" />
                ) : (
                  <div className="image-placeholder">
                    <Image size={48} className="placeholder-icon" />
                  </div>
                )}
                <div className="product-details">
                  <div className="product-header">
                    <h2 className="product-title">{product.name}</h2>
                    {product.category && (
                      <span className="category-tag">
                        {product.category}
                      </span>
                    )}
                  </div>
                  <p className="product-description">{product.description}</p>
                  <div className="product-info">
                    <p className="product-price">₹{product.price}</p>
                    <p className="product-stock">Stock: {product.quantity}</p>
                  </div>
                  <div className="product-actions">
                    <button 
                      onClick={() => navigateToEditProduct(product.id)}
                      className="edit-button"
                    >
                      <Edit size={16} />
                      <span className="button-text">Edit</span>
                    </button>
                    <button 
                      onClick={() => handleDelete(product.id)}
                      className="delete-button"
                    >
                      <Trash2 size={16} />
                      <span className="button-text">Delete</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyProducts;