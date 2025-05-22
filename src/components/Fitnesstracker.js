import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./Header.css"; // Import CSS file
import logo from "./logo.webp";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";

function Fitnesstracker({ token, userId }) {
  const [menuOpen, setMenuOpen] = useState(false);

  const [formData, setFormData] = useState({
    user_id: userId,
    date: new Date().toISOString().slice(0, 10), // YYYY-MM-DD
    weight: "",
    steps: "",
    calories_burned: "",
    sleep_hours: "",
    mood: "",
  });

  const [message, setMessage] = useState("");
  const [fitnessData, setFitnessData] = useState([]);

  // Fetch fitness data from Xano
  useEffect(() => {
    const fetchFitnessData = async () => {
      try {
        const response = await axios.get(
          `https://x8ki-letl-twmt.n7.xano.io/api:qJJevoie/daily_health_metric${userId}`, // Replace with your Xano URL
          {
            headers: {
              Authorization: `Bearer ${token}`, // If using auth
            },
          }
        );
        setFitnessData(response.data);
      } catch (err) {
        console.error("Error fetching data:", err);
      }
    };

    fetchFitnessData();
  }, [userId, token]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const submitFitnessData = async (formData, token) => {
    try {
      const response = await axios.post(
        "https://x8ki-letl-twmt.n7.xano.io/api:qJJevoie/daily_health_metric", // Replace with your Xano URL
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`, // If using auth
          },
        }
      );
      console.log("Saved successfully:", response.data);
      return response.data;
    } catch (err) {
      console.error("Error saving data:", err);
      return null;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await submitFitnessData(formData, token);
    if (result) {
      setMessage("✅ Fitness data saved successfully!");
      setFormData({
        ...formData,
        weight: "",
        steps: "",
        calories_burned: "",
        sleep_hours: "",
        mood: "",
      });
      // Re-fetch the data to include the new entry
      const response = await axios.get(
        `https://x8ki-letl-twmt.n7.xano.io/api:qJJevoie/daily_health_metric`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setFitnessData(response.data);
    } else {
      setMessage("❌ Failed to save data. Check the console.");
    }
  };

  // Chart data formatting
  const chartData = fitnessData.map((entry) => ({
    date: entry.date,
    steps: entry.steps,
    weight: entry.weight,
    calories_burned: entry.calories_burned,
  }));

  return (
    <div className="home-container">
      {/* Header Section */}
      <header className="head">
        {/* Left Side: Logo & Brand Name */}
        <div className="logo-container">
          <img src={logo} alt="LifelineConnect Logo" className="logo" />
          <Link to="/" className="homerout">
            <h2 className="homerout">LifelineConnect</h2>
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
          <Link to="/DoctorList" onClick={() => setMenuOpen(false)} className="doclink">
            <h3 className="doctorlist">Doctor Recommendation</h3>
          </Link>
          <Link to="/DonorList" onClick={() => setMenuOpen(false)} className="donlink">
            <h3 className="bloodlist">Blood Donor Network</h3>
          </Link>
          <Link to="/fitness" onClick={() => setMenuOpen(false)} className="fitlink">
            <h3 className="fitlist">Fitness Tracker</h3>
          </Link>
          <Link to="/medicine" onClick={() => setMenuOpen(false)} className="medlink">
            <h3 className="medlist">Medicine show</h3>
          </Link>
        </nav>
      </header>

      {/* Fitness Form */}
      <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-2xl mt-10">
        <h2 className="text-2xl font-bold mb-6">Track Your Fitness</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
          <input
            type="number"
            name="weight"
            value={formData.weight}
            onChange={handleChange}
            placeholder="Weight (kg)"
            className="w-full p-2 border rounded"
            required
          />
          <input
            type="number"
            name="steps"
            value={formData.steps}
            onChange={handleChange}
            placeholder="Steps"
            className="w-full p-2 border rounded"
            required
          />
          <input
            type="number"
            name="calories_burned"
            value={formData.calories_burned}
            onChange={handleChange}
            placeholder="Calories Burned"
            className="w-full p-2 border rounded"
          />
          <input
            type="number"
            name="sleep_hours"
            value={formData.sleep_hours}
            onChange={handleChange}
            placeholder="Sleep Hours"
            className="w-full p-2 border rounded"
          />
          <select
            name="mood"
            value={formData.mood}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          >
            <option value="">Mood</option>
            <option value="Happy">Happy</option>
            <option value="Tired">Tired</option>
            <option value="Energetic">Energetic</option>
            <option value="Stressed">Stressed</option>
          </select>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
          >
            Save Fitness Data
          </button>

          {message && <p className="mt-4 text-sm text-green-600">{message}</p>}
        </form>
      </div>

      {/* Fitness Data Chart */}
      <div className="mt-10">
        <h3 className="text-xl font-bold mb-4">Your Fitness Progress</h3>
        <LineChart width={window.innerWidth < 768 ? 300 : 700} height={300} data={chartData}>
  <CartesianGrid strokeDasharray="3 3" />
  <XAxis dataKey="date" tickFormatter={(d) => new Date(d).toLocaleDateString()} />
  <YAxis />
  <Tooltip />
  <Legend />
  <Line type="monotone" dataKey="steps" stroke="#8884d8" name="Steps" />
  <Line type="monotone" dataKey="weight" stroke="#82ca9d" name="Weight (kg)" />
  <Line type="monotone" dataKey="calories_burned" stroke="#ffc658" name="Calories Burned" />
</LineChart>

      </div>
    </div>
  );
}

export default Fitnesstracker;
