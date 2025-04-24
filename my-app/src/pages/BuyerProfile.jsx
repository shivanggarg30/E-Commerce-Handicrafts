import React, { useState } from "react";
import './BuyerProfile.css';

const BuyerProfile = () => {
  const [profileData, setProfileData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    address: "",
    city: "",
    state: "",
    postalCode: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfileData({
      ...profileData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Using native fetch instead of axios
      const response = await fetch("http://localhost:5000/api/buyerProfile", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(profileData),
      });

      if (response.ok) {
        alert("Buyer Profile Saved!");
      } else {
        alert("Error saving profile");
      }
    } catch (error) {
      console.error("Error saving profile", error);
      alert("Error saving profile");
    }
  };

  return (
    <div className="buyer-profile">
      <h2>Buyer Profile</h2>
      <form onSubmit={handleSubmit}>
        <label>First Name:</label>
        <input
          type="text"
          name="firstName"
          value={profileData.firstName}
          onChange={handleChange}
          required
        />

        <label>Last Name:</label>
        <input
          type="text"
          name="lastName"
          value={profileData.lastName}
          onChange={handleChange}
        />

        <label>Email:</label>
        <input
          type="email"
          name="email"
          value={profileData.email}
          onChange={handleChange}
          required
        />

        <label>Phone Number:</label>
        <input
          type="text"
          name="phoneNumber"
          value={profileData.phoneNumber}
          onChange={handleChange}
        />

        <label>Address:</label>
        <input
          type="text"
          name="address"
          value={profileData.address}
          onChange={handleChange}
          required
        />

        <label>City:</label>
        <input
          type="text"
          name="city"
          value={profileData.city}
          onChange={handleChange}
          required
        />

        <label>State:</label>
        <input
          type="text"
          name="state"
          value={profileData.state}
          onChange={handleChange}
        />

        <label>Postal Code:</label>
        <input
          type="text"
          name="postalCode"
          value={profileData.postalCode}
          onChange={handleChange}
          required
        />

        <button type="submit">Save Profile</button>
      </form>
    </div>
  );
};

export default BuyerProfile;