import React, { useEffect, useState } from "react";
import axios from "axios";
// import "./finddonor.css"; // Import your CSS for styling

const XANO_BASE_URL = "https://x8ki-letl-twmt.n7.xano.io/api:KCRiHHmr"; // Update if needed

const FindDonor = () => {
  const [donors, setDonors] = useState([]); // Stores all donors
  const [filteredDonors, setFilteredDonors] = useState([]); // Stores searched donors
  const [searchLocation, setSearchLocation] = useState(""); // Search input

  // Fetch all donors from Xano API
  const fetchDonors = async () => {
    try {
      const response = await axios.get(`${XANO_BASE_URL}/donation`); // Ensure this is the correct endpoint
      setDonors(response.data);
      setFilteredDonors(response.data); // Initialize filteredDonors with full list
    } catch (error) {
      console.error("Error fetching donors:", error);
    }
  };

  // Fetch donors when the page loads
  useEffect(() => {
    fetchDonors();
  }, []);

  // Filter donors based on location
  const handleSearch = () => {
    if (searchLocation.trim() === "") {
      setFilteredDonors(donors); // Show all donors if search is empty
    } else {
      const filtered = donors.filter((donor) =>
        donor.location.toLowerCase().includes(searchLocation.toLowerCase())
      );
      setFilteredDonors(filtered);
    }
  };

  return (
    <div className="find-donor-container">
      <h2>Blood Donor List</h2>

      {/* Search Bar */}
      <div className="search-box">
        <input
          type="text"
          placeholder="Search by location..."
          value={searchLocation}
          onChange={(e) => setSearchLocation(e.target.value)}
        />
        <button onClick={handleSearch}>Search</button>
      </div>

      {/* Donor List */}
      <div className="donor-list">
        {filteredDonors.length > 0 ? (
          filteredDonors.map((donor) => (
            <div key={donor.id} className="donor-card">
              <h3>{donor.name}</h3>
              <p><strong>Blood Type:</strong> {donor.bloodType}</p>
              <p><strong>Location:</strong> {donor.location}</p>
              <p><strong>Contact:</strong> {donor.contactNumber}</p>
            </div>
          ))
        ) : (
          <p className="no-results">No donors found in this location.</p>
        )}
      </div>
    </div>
  );
};

export default FindDonor;
