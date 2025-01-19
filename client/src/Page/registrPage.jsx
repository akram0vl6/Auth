import React from 'react';
import './style.css';

const RegistrPage = () => {
  return (
    <div className="register-container">
      <h2 className="register-title">Register</h2>
      <form className="register-form">
        <div className="form-group">
          <label htmlFor="email" className="form-label">Email</label>
          <input 
            type="email" 
            id="email" 
            name="email" 
            className="form-input" 
            placeholder="Enter your email" 
          />
        </div>
        <div className="form-group">
          <label htmlFor="password" className="form-label">Password</label>
          <input 
            type="password" 
            id="password" 
            name="password" 
            className="form-input" 
            placeholder="Enter your password" 
          />
        </div>
        <button type="submit" className="register-button">Register</button>
      </form>
    </div>
  );
};

export default RegistrPage;
