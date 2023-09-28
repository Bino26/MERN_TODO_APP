import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import SignupForm from "./SignupForm.jsx";
import "./style.css";

const Signup = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Sending form data to the server
      const response = await axios.post(
        `${import.meta.env.VITE_REACT_APP_API_KEY}/signup`,
        { name, email, password },
        {
          withCredentials: true,
          headers: { "Content-Type": "application/json" },
        }
      );

      // Show success message using Toastify
      toast.success(response.data.message, {
        position: toast.POSITION.TOP_CENTER,
      });

      // Navigate to home page using history.push
      navigate("/");
    } catch (error) {
      // Show error message using Toastify
      toast.error(error.response.data.message, {
        position: toast.POSITION.TOP_CENTER,
      });
    }
  };

  return (
    <section className="auth-section">
      <div className="form-container">
        <div className="content">
          <h2>Signup</h2>
          <SignupForm
            name={name}
            email={email}
            password={password}
            setName={setName}
            setEmail={setEmail}
            setPassword={setPassword}
            handleSubmit={handleSubmit}
          />
        </div>
      </div>
    </section>
  );
};

export default Signup;
