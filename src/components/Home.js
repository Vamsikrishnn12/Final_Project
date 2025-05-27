import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Header.css";
import logo from "./logo.webp";
// import doctorimg1 from "./doctorimg1.PNG";
// import doctorimg2 from "./doctorimg2.PNG";
// import doctorimg3 from "./doctorimg3.PNG";
// import doctorimg4 from "./doctorimg4.PNG";
// import doctorimg5 from "./doctorimg5.PNG";
// import doctorimg6 from "./doctorimg6.PNG";
import { Linkedin, Instagram } from "lucide-react";

function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [doctors, setDoctors] = useState([]);

  useEffect(() => {
    const checkLogin = () => {
      const token = localStorage.getItem("authToken");
      setIsLoggedIn(!!token);
    };

    checkLogin();
    window.addEventListener("storage", checkLogin);

    return () => {
      window.removeEventListener("storage", checkLogin);
    };
  }, [isLoggedIn]);

  // Fetch doctors from Xano
  useEffect(() => {
    fetch("https://x8ki-letl-twmt.n7.xano.io/api:XHSwC2Qx/healthcare_professional")
      .then((res) => res.json())
      .then((data) => setDoctors(data))
      .catch((err) => console.error("Error fetching doctors:", err));
  }, []);

  return (
    <div className="home-container">
      {/* Header Section */}
      <header className="head">
        <div className="logo-container">
          <img src={logo} alt="LifelineConnect Logo" className="logo" />
          <h2>LifelineConnect</h2>
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
          <Link to="/Fitness" onClick={() => setMenuOpen(false)} className="fitlink">
            <h3 className="fitlist">Fitness Tracker</h3>
          </Link>
          {/* <Link to="/Medician" onClick={() => setMenuOpen(false)} className="medlink">
            <h3 className="medlist">Medicine Show</h3>
          </Link> */}

          {!isLoggedIn ? (
            <>
              <Link to="/Login" onClick={() => setMenuOpen(false)} className="loglink">
                <h3 className="loginbtn">Login</h3>
              </Link>
              <Link to="/Register" onClick={() => setMenuOpen(false)} className="reglink">
                <h3 className="registerbtn">Register</h3>
              </Link>
            </>
          ) : (
            <button
              className="logoutbtn"
              onClick={() => {
                localStorage.removeItem("authToken");
                setIsLoggedIn(false);
                setMenuOpen(false);
                window.location.reload();
              }}
            >
              Logout
            </button>
          )}
        </nav>
      </header>

      {/* Main Content */}
      <main>
        <div className="mainheading">
          <p>
            Empowering Healthcare, <br /> One Connection at a Time – Find the Right Doctor,
            <br /> Save Lives Through Blood Donation, <br /> and Track Medical Needs Seamlessly
          </p>
        </div>
        <br></br>

        <div className="mainbody">
          <br></br>
          <h1>Explore The Services</h1>
          <h2>Find The Doctor:</h2>
          {/* <div className="docimges">
            <Link to="/DoctorList"><img src={doctorimg1} alt="img one" className="docimg1" /></Link>
            <Link to="/DoctorList"><img src={doctorimg2} alt="img one" className="docimg1" /></Link>
            <Link to="/DoctorList"><img src={doctorimg3} alt="img one" className="docimg1" /></Link>
            <Link to="/DoctorList"><img src={doctorimg4} alt="img one" className="docimg1" /></Link>
            <Link to="/DoctorList"><img src={doctorimg5} alt="img one" className="docimg1" /></Link>
            <Link to="/DoctorList"><img src={doctorimg6} alt="img one" className="docimg1" /></Link>
          </div> */}

          {/* 👇 Doctor Cards from API */}
          <div className="doctor-list">
            {doctors.map((doc) => (
                <Link to="/DoctorList"><div key={doc.id} className="doctor-card">
                <h3>{doc.name}</h3>
                <p><strong>Specialization:</strong> {doc.specialization}</p>
                <p><strong>Experience:</strong> {doc.experience}</p>
                <p><strong>Qualifications:</strong> {doc.qualifications}</p>
                <p><strong>Hospital:</strong> {doc.hospital}</p>
                <p><strong>Languages:</strong> {doc.languages?.join(", ")}</p>
              </div></Link>
            ))}
          </div>

          {/* Buttons */}
          <div className="btnhome">
            <Link to="/DonorList" className="btnhomedon"><h2>Find Donor</h2></Link>
            <Link to="/fitness" className="btnhomefit"><h2>Track Fitness</h2></Link>
            {/* <Link to="./medicine" className="btnhomemed"><h2>See Medicine</h2></Link> */}
          </div>

          {/* Footer */}
<div className="footer">
  <div>
    <h2>About Us:</h2>
    <p><strong>About Lifeline Connect</strong></p>
    <p>We're building a compassionate community where lives are saved by connection — not division. Lifeline Connect brings together donors and recipients in times of urgent need.</p>
    <p>Developed with purpose by Vamsi Krishnan, Vishwa & Senthil.</p>
  </div>
  <div>
    <h2>Follow Us:</h2>
    <div className="social-icons">
      <a href="https://www.linkedin.com/in/vamsi-krishnavr-rr/" target="_blank" rel="noopener noreferrer" className="linkden">
        <Linkedin size={32} />
      </a>
      <a href="https://www.instagram.com/itz_me_vamsi66/?hl=en" target="_blank" rel="noopener noreferrer" className="insta">
        <Instagram size={32} />
      </a>
    </div>
  </div>
</div>

        </div>
      </main>
    </div>
  );
}

export default Home;
