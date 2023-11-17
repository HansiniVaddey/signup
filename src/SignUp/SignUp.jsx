import React, { useState } from "react";
import './style.css';
import person_icon from '../Assets/person.png';
import ph2_icon from '../Assets/ph2.png';
import email_icon from '../Assets/email.png';
import password_icon from '../Assets/password.png';

import axios from "axios"; // Import Axios

const SignUp = () => {
  const [formData, setFormData] = useState({
    name: "",
    phoneNumber: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({
    name: "",
    phoneNumber: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [success, setSuccess] = useState(false);

  const validateName = (name) => {
    if (name.trim() === "") {
      return "Name is required";
    }
    return "";
  };

  const validatePhoneNumber = (phoneNumber) => {
    const phoneNumberRegex = /^[0-9]{10}$/; // Adjust the regular expression as needed
    if (!phoneNumberRegex.test(phoneNumber)) {
      return "Phone Number is invalid";
    }
    return "";
  };

  const validateEmail = (email) => {
    const emailRegex = /\S+@\S+\.\S+/; // Basic email format validation
    if (!emailRegex.test(email)) {
      return "Email is invalid";
    }
    return "";
  };

  const validatePassword = (password) => {
    if (password.length < 9) {
      return "Password must be at least 9 characters long";
    }
  
    const specialCharRegex = /[!@#$%^&*()_+[\]{};':"\\|,.<>?]/;
    if (!specialCharRegex.test(password)) {
      return "Password must contain at least one special character";
    }
  
    return "";
  };

  const validateConfirmPassword = (confirmPassword) => {
    if (confirmPassword !== formData.password) {
      return "Passwords do not match";
    }
    return "";
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    let errorMessage = "";
    switch (name) {
      case "name":
        errorMessage = validateName(value);
        break;
      case "phoneNumber":
        errorMessage = validatePhoneNumber(value);
        break;
      case "email":
        errorMessage = validateEmail(value);
        break;
      case "password":
        errorMessage = validatePassword(value);
        break;
      case "confirmPassword":
        errorMessage = validateConfirmPassword(value);
        break;
      default:
        break;
    }

    setErrors({
      ...errors,
      [name]: errorMessage,
    });
  };

  const handleSubmit = async () => {
    if (
      formData.name.trim() === "" ||
      formData.phoneNumber.trim() === "" ||
      formData.email.trim() === "" ||
      formData.password.trim() === "" ||
      formData.confirmPassword.trim() === ""
    ) {
      setErrors({
        name: formData.name.trim() === "" ? "Name is required" : "",
        phoneNumber: formData.phoneNumber.trim() === "" ? "Phone Number is required" : "",
        email: formData.email.trim() === "" ? "Email is required" : "",
        password: formData.password.trim() === "" ? "Password is required" : "",
        confirmPassword: formData.confirmPassword.trim() === "" ? "Confirm Password is required" : "",
      });
      return;
    }

    try {
      const response = await axios.post("/api/register", formData);
      if (response.status === 200) {
        setSuccess(true);
      }
    } catch (err) {
      setErrors({
        ...errors,
        // Set error message based on the error response
      });
    }
  };

  return (
    <div className="container">
      <div className="header">
        <div className="text">Sign Up</div>
        <div className="underline"></div>
      </div>
      <div className="inputs">
        <div className="input">
          <img src={person_icon} alt="" />
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="error-message">{errors.name}</div>

        <div className="input">
          <img src={ph2_icon} alt="" />
          <input
            type="tel"
            name="phoneNumber"
            placeholder="Phone Number"
            value={formData.phoneNumber}
            onChange={handleChange}
            required
          />
        </div>
        <div className="error-message">{errors.phoneNumber}</div>

        <div className="input">
          <img src={email_icon} alt="" />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="error-message">{errors.email}</div>
        
        <div className="input">
          <img src={password_icon} alt="" />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <div className="error-message">{errors.password}</div>

        <div className="input">
          <img src={password_icon} alt="" />
          <input
            type="password"
            name="confirmPassword"
            placeholder="Re-Enter Password"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
          />
        </div>
        <div className="error-message">{errors.confirmPassword}</div>

        <div className="submit-container">
          <button type="button" onClick={handleSubmit} className="submit">
            SUBMIT
          </button>
        </div>
      </div>

      {success && (
        <p className="success">Registration successful. You can now sign in.</p>
      )}

      <div className="signin">
        Already have an account? <a href="#">Sign In</a>
      </div>
    </div>
  );
};

export default SignUp;
