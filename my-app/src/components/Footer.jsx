import React from "react";

const Footer = () => {
  return (
    <footer className="bg-dark text-light py-5 mt-5">
      <div className="container">
        <div className="row">
          {/* Company Info */}
          <div className="col-md-3 mb-4 mb-md-0">
            <h5 className="text-uppercase mb-4">Handicrafts</h5>
            <p className="mb-3">Exploring The World Of Indian Handicrafts</p>
            <p className="mb-3">Since 2024</p>
            <p className="mb-0">Made for Pre-Final Year Project</p>
          </div>
          
          {/* Quick Links */}
          <div className="col-md-3 mb-4 mb-md-0">
            <h5 className="text-uppercase mb-4">Quick Links</h5>
            <ul className="list-unstyled mb-0">
              <li className="mb-2"><a href="/" className="text-decoration-none text-light">Home</a></li>
              <li className="mb-2"><a href="/products" className="text-decoration-none text-light">Products</a></li>
              <li className="mb-2"><a href="/about" className="text-decoration-none text-light">About Us</a></li>
              <li className="mb-2"><a href="/contact" className="text-decoration-none text-light">Contact</a></li>
            </ul>
          </div>
          
          {/* Contact Info */}
          <div className="col-md-3 mb-4 mb-md-0">
            <h5 className="text-uppercase mb-4">Contact Us</h5>
            <p className="mb-2"><i className="fa fa-home me-3"></i> New Delhi, India</p>
            <p className="mb-2"><i className="fa fa-envelope me-3"></i> info@handicrafts.com</p>
            <p className="mb-2"><i className="fa fa-phone me-3"></i> +91 123 456 7890</p>
          </div>
          
          {/* Newsletter */}
          <div className="col-md-3">
            <h5 className="text-uppercase mb-4">Newsletter</h5>
            <p className="mb-3">Subscribe to receive updates on new arrivals and special offers</p>
            <div className="input-group mb-3">
              <input type="email" className="form-control" placeholder="Email address" aria-label="Email address" />
              <button className="btn btn-outline-light" type="button">Subscribe</button>
            </div>
          </div>
        </div>
        
        {/* Social Media Links */}
        <div className="d-flex justify-content-center mt-4">
          <a className="btn btn-outline-light btn-floating m-1" href="#!" role="button">
            <i className="fa fa-facebook-f"></i>
          </a>
          <a className="btn btn-outline-light btn-floating m-1" href="#!" role="button">
            <i className="fa fa-twitter"></i>
          </a>
          <a className="btn btn-outline-light btn-floating m-1" href="#!" role="button">
            <i className="fa fa-instagram"></i>
          </a>
          <a className="btn btn-outline-light btn-floating m-1" href="#!" role="button">
            <i className="fa fa-linkedin"></i>
          </a>
          <a className="btn btn-outline-light btn-floating m-1" href="#!" role="button">
            <i className="fa fa-github"></i>
          </a>
        </div>
        
        {/* Copyright */}
        <div className="text-center p-3 mt-4 border-top border-secondary">
          © {new Date().getFullYear()} Handicrafts. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
