import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Header.css"; // Import CSS file
import logo from "./logo.webp";
function Mediciantrack(){
 const [menuOpen, setMenuOpen] = useState(false);
    return(
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
                 </div>
    );
}
export default Mediciantrack;