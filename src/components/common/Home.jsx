import React from "react";
import { Link } from "react-router-dom";
import "../../assets/css/home_style.css";

export const Home = () => {
  return (
    <div>
      {/* Navbar */}
      <nav className="navbar">
        <h2 className="logo">Ag Hires</h2>
        <ul className="nav-links">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/signin">Login</Link></li>
          <li><Link to="/signup">Signup</Link></li>
        </ul>
      </nav>

      {/* Hero Section */}
      <div className="hero">
        <h1>Welcome to Our Platform</h1>
        <p>Sign up or log in to get started!</p>
      </div>
    </div>
  );
};
