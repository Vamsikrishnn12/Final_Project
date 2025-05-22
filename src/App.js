import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import DonorList from "./components/DonorList";
import DoctorList from "./components/DoctorList";
import Fitnesstracker from "./components/Fitnesstracker";
import Mediciantrack from "./components/Mediciantrack";
import Registeration from "./components/Registeration";
import Login from "./components/login";
import Donorreg from "./components/Donorreg"
import './App.css';
import FindDonor from "./components/finddonor";



function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/DonorList" element={<DonorList />} />
        <Route path="/DoctorList" element={<DoctorList />} />
        <Route path="/fitness" element={<Fitnesstracker/>}/>
        <Route path="/medician" element={<Mediciantrack/>}/>
        <Route path="/Register" element={<Registeration/>}/>
        <Route path="/Login" element={<Login/>}/>
        <Route path="/Donorreg" element={<Donorreg/>}/>
        <Route path="/Donorfind" element={<FindDonor/>}/>
        
      </Routes>
    </Router>
  );
}

export default App;

