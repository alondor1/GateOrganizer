import React, { useState, useEffect } from "react";
import axiosInstance from "../axiosConfig";
import { useParams, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const PWDpage = () => {
  const { token } = useParams(); // Get the token from URL parameters
  const [newPassword, setNewPassword] = useState(""); // State for new password
  const navigate = useNavigate(); // Hook for navigation

  useEffect(() => {
    const validateToken = async () => {
      try {
        // Check if the token is valid by making a GET request to the server
        await axiosInstance.get(`auth/validate-token/${token}`);
      } catch (error) {
        // If token is invalid or expired, redirect to the homepage
        navigate("/"); // Change to your desired route
      }
    };

    validateToken(); // Call the validation function
  }, [token, navigate]); // Dependencies

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent the default form submission
    try {
      // Send the new password to the server
      const response = await axiosInstance.post(
        `/auth/password-reset/${token}`,
        {
          newPassword,
        }
      );
      toast(response.data.message); // Show success message

      // Set a small success message and clear it after a few seconds
      toast.success("Password has been successfully changed!");
      setTimeout(() => {
        navigate("/"); // Change to your desired route after password reset
      }, 3000);
      // Optionally redirect after a successful password reset
    } catch (error) {
      // Handle error responses
      toast.error("form expired please generate new form from site");
    }
  };

  return (
    <div>
      <h2>Reset Password</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="password"
          placeholder="Enter new password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)} // Update new password state
          required
        />
        <button type="submit">Reset Password</button>
      </form>
      <ToastContainer
        position={"top-center"}
        closeOnClick={true}
        pauseOnHover={false}
        autoClose={false}
      />
    </div>
  );
};
