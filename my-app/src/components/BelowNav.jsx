import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./BelowNav.css";

const BelowNav = () => {
  // Array of carousel images
  const carouselImages = [
    {
      src: "./assets/Mainphoto.png.png",
      title: "New Season Arrivals"
    },
    {
      src: "./assets/Slide2.jpg"
    },
    {
      src: "./assets/Slide3.png"
    }
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  // Function to move to the next slide
  const nextSlide = () => {
    if (!isAnimating) {
      setIsAnimating(true);
      setCurrentIndex((prevIndex) => (prevIndex === carouselImages.length - 1 ? 0 : prevIndex + 1));
      setTimeout(() => setIsAnimating(false), 500); // Match this with CSS transition time
    }
  };

  // Function to move to the previous slide
  const prevSlide = () => {
    if (!isAnimating) {
      setIsAnimating(true);
      setCurrentIndex((prevIndex) => (prevIndex === 0 ? carouselImages.length - 1 : prevIndex - 1));
      setTimeout(() => setIsAnimating(false), 500); // Match this with CSS transition time
    }
  };

  // Auto-play functionality
  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 3000); // Change slide every 5 seconds

    return () => clearInterval(interval);
  }, [currentIndex]);

  return (
    <div className="hero">
      <div className="hero-card">
        <div className="carousel-container">
          {carouselImages.map((image, index) => (
            <div 
              key={index} 
              className={`carousel-slide ${index === currentIndex ? 'active' : ''}`}
              style={{ transform: `translateX(${(index - currentIndex) * 100}%)` }}
            >
              <img className="hero-image" src={image.src} alt={`Slide ${index + 1}`} />
              <div className="hero-overlay">
                <div className="hero-content">
                  <h5 className="hero-title">{image.title}</h5>
                </div>
                {/* Seller Profile Button - only on the active slide */}
                {index === currentIndex && (
                  <div className="seller-button-container">
                    <Link to="/seller/dashboard" className="seller-button">
                      Are You a Seller?
                    </Link>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Navigation buttons */}
        <button className="carousel-btn prev-btn" onClick={prevSlide}>
          <span>&lt;</span>
        </button>
        <button className="carousel-btn next-btn" onClick={nextSlide}>
          <span>&gt;</span>
        </button>

        {/* Indicators */}
        <div className="carousel-indicators">
          {carouselImages.map((_, index) => (
            <span 
              key={index} 
              className={`indicator ${index === currentIndex ? 'active' : ''}`}
              onClick={() => {
                if (!isAnimating) {
                  setIsAnimating(true);
                  setCurrentIndex(index);
                  setTimeout(() => setIsAnimating(false), 500);
                }
              }}
            ></span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BelowNav;