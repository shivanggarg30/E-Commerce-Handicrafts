import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './routes/ProtectedRoute';
import SellerDashboard from './pages/seller/SellerDashboard';
import AddItem from './pages/seller/AddItem';
import MyProducts from './pages/seller/MyProducts';
import BuyerProfile from './pages/BuyerProfile';
import SellerProfile from './pages/seller/SellerProfile';
import 'bootstrap-icons/font/bootstrap-icons.css';

import {
  Home,
  Products,
  Product,
  AboutPage,
  ContactPage,
  Cart,
  Login,
  Register,
  Checkout,
  PageNotFound,
} from './pages';

function App() {
  return (
    <AuthProvider>
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<Home />} />
        <Route path="/product" element={<Products />} />
        <Route path="/product/:id" element={<Product />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/Profile" element={<BuyerProfile />} />
       
        {/* Protected routes */}
        <Route path="/checkout" element={
          <ProtectedRoute>
            <Checkout />
          </ProtectedRoute>
        } />
<Route path="/seller/profile" element={
  <ProtectedRoute requiredRole="seller">
    <SellerProfile />
  </ProtectedRoute>
} />
        {/* Protected seller routes */}
        <Route path="/seller/dashboard" element={
          <ProtectedRoute requiredRole="seller">
            <SellerDashboard />
          </ProtectedRoute>
        } />
        <Route path="/seller/add-item" element={
          <ProtectedRoute requiredRole="seller">
            <AddItem />
          </ProtectedRoute>
        } />
        <Route path="/seller/my-products" element={
          <ProtectedRoute requiredRole="seller">
            <MyProducts />
          </ProtectedRoute>
        } />

        {/* Unauthorized access and 404 */}
        <Route path="/unauthorized" element={
          <div className="unauthorized-container">
            <h1>Unauthorized Access</h1>
            <p>You don't have permission to access this page.</p>
            <button
              className="back-button"
              onClick={() => window.history.back()}
            >
              Go Back
            </button>
          </div>
        } />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </AuthProvider>
  );
}

export default App;


