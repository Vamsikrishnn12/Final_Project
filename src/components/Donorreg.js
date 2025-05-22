import React, { useState } from "react";
// import axios from "axios";
import { registerDonor } from "../api/xano";

import "./Donoereg.css";

const Donorreg = () => {
  const [formData, setFormData] = useState({
    name: "",
    bloodType: "",
    contactNumber: "",
    location: "",
    lastDonationDate: "",
  });

  const [message, setMessage] = useState("");

  // Handle input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await registerDonor(formData);
      
      if (response && response.id) { // Assuming the API returns the newly created donor ID
        setMessage("Registration successful! Donor added.");
        
        
        // Clear the form fields
        setFormData({
          name: "",
          bloodType: "",
          contactNumber: "",
          location: "",
          lastDonationDate: "",
          
        });
      } else {
        setMessage("Registration failed. Please try again.");
      }
      
    } catch (error) {
      console.error("Error registering donor:", error);
      setMessage("Registration failed. Please try again.");
    }
  };
  
  return (
    <div className="doregmain">
    <div className="doreg">
      <h2>Blood Donor Registration</h2>
      {message && <p className="message">{message}</p>}
      <form className="donorregform"onSubmit={handleSubmit}>
        <label>Name:</label>
        <input type="text" name="name" value={formData.name} onChange={handleChange} required />

        <label>Blood Type:</label>
        <select name="bloodType" value={formData.bloodType} onChange={handleChange} required>
          <option value="">Select Blood Type</option>
          <option value="A+">A+</option>
          <option value="A-">A-</option>
          <option value="B+">B+</option>
          <option value="B-">B-</option>
          <option value="O+">O+</option>
          <option value="O-">O-</option>
          <option value="AB+">AB+</option>
          <option value="AB-">AB-</option>
        </select>

        <label>Contact Number:</label>
        <input type="text" name="contactNumber" value={formData.contactNumber} onChange={handleChange} required />

        <label>Location:</label>
        <input type="text" name="location" value={formData.location} onChange={handleChange} required />

        <label>Last Donation Date:</label>
        <input type="date" name="lastDonationDate" value={formData.lastDonationDate} onChange={handleChange} />

        <button type="submit">Register</button>
      </form>
    </div>
    </div>
  );
};

export default Donorreg;
