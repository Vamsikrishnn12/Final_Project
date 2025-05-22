import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Header.css";
import logo from "./logo.webp";

function Doctor() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [doctors, setDoctors] = useState([]);
  const [searchLocation, setSearchLocation] = useState("");
  const [searchSpecialization, setSearchSpecialization] = useState("");

  // Fetch doctor data from Xano API
  useEffect(() => {
    fetch("https://x8ki-letl-twmt.n7.xano.io/api:XHSwC2Qx/healthcare_professional")
      .then((res) => res.json())
      .then((data) => setDoctors(data))
      .catch((err) => console.error("Error fetching doctors:", err));
  }, []);

  // Filter logic
  const filteredDoctors = doctors.filter((doc) => {
    return (
      doc.specialization.toLowerCase().includes(searchSpecialization.toLowerCase()) &&
      doc.hospital.toLowerCase().includes(searchLocation.toLowerCase())
    );
  });

  return (
    <div className="home-container">
                   {/* Header Section */}
                   <header className="head">
                     {/* Left Side: Logo & Brand Name */}
                     <div className="logo-container">
                     
                                 <img src={logo} alt="LifelineConnect Logo" className="logo" />
                                                        <Link to="/" className="homerout"><h2 className="homerout">LifelineConnect</h2>
                                        
                                      </Link>
                       
                     </div>
             
                     {/* Hamburger Menu (Only Visible on Mobile) */}
                     <div className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
                       <div className="hline"></div>
                       <div className="hline"></div>
                       <div className="hline"></div>
                     </div>
             
                     {/* Navigation Links (Hidden in Mobile) */}
                     <nav className={`nav-links ${menuOpen ? "open" : ""}`}>
                       <Link to="/DoctorList" onClick={() => setMenuOpen(false)} className="doclink"><h3 className="doctorlist">Doctor Recommendation</h3></Link>
                       <Link to="/DonorList" onClick={() => setMenuOpen(false)} className="donlink"><h3 className="bloodlist">Blood Donor Network</h3></Link>
                       <Link to="/fitness" onClick={() => setMenuOpen(false)} className="fitlink"><h3 className="fitlist">Fitness Tracker</h3></Link>
                       <Link to="/medicine" onClick={() => setMenuOpen(false)} className="medlink"><h3 className="medlist">Medicine show</h3></Link>
                       
                      
                     </nav>
                     </header>

      {/* Search Inputs */}
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search by specialization..."
          value={searchSpecialization}
          onChange={(e) => setSearchSpecialization(e.target.value)}
        />
        <input
          type="text"
          placeholder="Search by location..."
          value={searchLocation}
          onChange={(e) => setSearchLocation(e.target.value)}
        />
      </div>

      {/* Display Doctors */}
      <div className="doctor-list">
        {filteredDoctors.map((doc) => (
          <div key={doc.id} className="doctor-card">
          
          <h3>{doc.name}</h3>
          <p><strong>Specialization:</strong> {doc.specialization}</p>
          <p><strong>Experience:</strong> {doc.experience}</p>
          <p><strong>Qualifications:</strong> {doc.qualifications}</p>
          <p><strong>Hospital:</strong> {doc.hospital}</p>
          <p><strong>Languages:</strong> {doc.languages?.join(", ")}</p>
        </div>
        
        ))}
      </div>
    </div>
  );
}

export default Doctor;
