import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Header.css";
import "./DonorList.css"
import logo from "./logo.webp";

function DonorList() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="home-container1">
      {/* Header Section */}
      <header className="head">
        <div className="logo-container">
          <img src={logo} alt="LifelineConnect Logo" className="logo" />
          <Link to="/" className="homerout">
            <h2 className="homerout">LifelineConnect</h2>
          </Link>
        </div>

        <div className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
          <div className="hline"></div>
          <div className="hline"></div>
          <div className="hline"></div>
        </div>

        <nav className={`nav-links ${menuOpen ? "open" : ""}`}>
          <Link to="/DoctorList" onClick={() => setMenuOpen(false)} className="doclink">
            <h3 className="doctorlist">Doctor Recommendation</h3>
          </Link>
          <Link to="/DonorList" onClick={() => setMenuOpen(false)} className="donlink">
            <h3 className="bloodlist">Blood Donor Network</h3>
          </Link>
          <Link to="/fitness" onClick={() => setMenuOpen(false)} className="fitlink">
            <h3 className="fitlist">Fitness Tracker</h3>
          </Link>
        </nav>
      </header>

      {/* Main Content Section */}
      <div className="donoreglist6">
        {/* Call-to-Action Buttons */}
        <div className="dbuttons">
          <Link to="/Donorreg" className="donorregbtn">
            <h2>Become a Donor</h2>
          </Link>
          <Link to="/Donorfind" className="donorfindbtn">
            <h2>Find a Donor</h2>
          </Link>
        </div>

        {/* Motivational Quote */}
        <div className="quote-section">
          <h1 className="donlistheading">
            "A few minutes of your time, a few drops of your blood — a lifetime for someone in need."
            <br />
            "Donate blood. Be the reason someone sees tomorrow."
          </h1>
        </div>

        {/* Introduction to Blood Donation */}
        <div className="intro-section">
          <p>
            Blood donation is a selfless act that can save lives during emergencies, surgeries, cancer treatments, and childbirth. By donating blood, you are making a real difference in someone’s future.
          </p>
        </div>

        {/* Why Donate Blood Section */}
        <div className="why-donate">
          <h2>Why Should You Donate Blood?</h2>
          <ul>
            <li>🩸 Every 2 seconds, someone needs blood.</li>
            <li>🫀 One donation can save up to 3 lives.</li>
            <li>❤️ Regular donation reduces harmful iron stores in your body.</li>
            <li>👨‍⚕️ Safe, quick, and medically supervised process.</li>
          </ul>
        </div>

        {/* Blood Facts */}
        <div className="blood-facts">
          <h2>Did You Know?</h2>
          <p>• There’s no substitute for human blood — only donors can provide it.</p>
          <p>• Type O-negative is the universal donor, used in emergencies when blood type is unknown.</p>
          <p>• Less than 10% of eligible donors donate each year. Be the change.</p>
          <br></br>
          <br></br>
          <br>
          </br>
          <br></br>
        </div>
      </div>
    </div>
  );
}

export default DonorList;
