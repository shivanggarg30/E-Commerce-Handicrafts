import React from "react";
import { Link } from "react-router-dom";
import "./BelowNav.css"; // Make sure to create this CSS file

const BelowNav = () => {
  return (
    <div className="hero">
      <div className="hero-card">
        <img
          className="hero-image"
          src="./assets/Mainphoto.png.png"
          alt="Card"
        />
        <div className="hero-overlay">
          <div className="hero-content">
            <h5 className="hero-title">
              New Season Arrivals
            </h5>
          </div>

          {/* Seller Profile Button */}
          <div className="seller-button-container">
            <Link to="/seller/dashboard" className="seller-button">
              Are You a Seller?
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BelowNav;