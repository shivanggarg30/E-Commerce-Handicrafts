import React, { useState } from "react";
import './SellerProfile.css';

const SellerProfile = () => {
  // Initialize state for profile data
  const [profileData, setProfileData] = useState({
    shopName: "",
    bio: "",
    location: "",
    contactEmail: "",
    instagramUrl: "",
    facebookUrl: "",
    pinterestUrl: "",
    aadharId: "",
  });

  // State to track form submission
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfileData({
      ...profileData,
      [name]: value,
    });
  };

  // Form validation
  const validateForm = () => {
    const { shopName, location, contactEmail, aadharId } = profileData;
    if (!shopName || !location || !contactEmail || !aadharId) {
      return false;
    }
    // Add further validation for Aadhaar ID format or email if needed
    return true;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      alert("Please fill in all required fields!");
      return;
    }
    
    setLoading(true);
    setError("");
    setSuccessMessage("");

    try {
      const response = await axios.post("http://localhost:5000/api/sellerProfile", profileData);
      setSuccessMessage("Profile Saved Successfully!");
      setProfileData({
        shopName: "",
        bio: "",
        location: "",
        contactEmail: "",
        instagramUrl: "",
        facebookUrl: "",
        pinterestUrl: "",
        aadharId: "",
      });
    } catch (error) {
      setError("Error saving profile. Please try again.");
      console.error("Error saving profile", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="seller-profile">
      <h2>Seller Profile</h2>
      
      {successMessage && <div className="success-message">{successMessage}</div>}
      {error && <div className="error-message">{error}</div>}
      
      <form onSubmit={handleSubmit}>
        <label>Shop Name:</label>
        <input
          type="text"
          name="shopName"
          value={profileData.shopName}
          onChange={handleChange}
          required
        />

        <label>Bio:</label>
        <textarea
          name="bio"
          value={profileData.bio}
          onChange={handleChange}
        />

        <label>Location:</label>
        <input
          type="text"
          name="location"
          value={profileData.location}
          onChange={handleChange}
          required
        />

        <label>Contact Email:</label>
        <input
          type="email"
          name="contactEmail"
          value={profileData.contactEmail}
          onChange={handleChange}
          required
        />

        <label>Instagram URL:</label>
        <input
          type="url"
          name="instagramUrl"
          value={profileData.instagramUrl}
          onChange={handleChange}
        />

        <label>Facebook URL:</label>
        <input
          type="url"
          name="facebookUrl"
          value={profileData.facebookUrl}
          onChange={handleChange}
        />

        <label>Pinterest URL:</label>
        <input
          type="url"
          name="pinterestUrl"
          value={profileData.pinterestUrl}
          onChange={handleChange}
        />

        <label>Aadhaar ID:</label>
        <input
          type="text"
          name="aadharId"
          value={profileData.aadharId}
          onChange={handleChange}
          required
        />

        <button type="submit" disabled={loading}>
          {loading ? "Saving..." : "Save Profile"}
        </button>
      </form>
    </div>
  );
};

export default SellerProfile;