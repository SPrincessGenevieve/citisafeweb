import React, { useState } from "react";
import axios from "../../plugins/axios";
import {  useNavigate, useParams } from "react-router-dom";


const ResetPassword = () => {
  const { uid, token } = useParams();
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

    const navigate = useNavigate()


  const handleSubmit = async (e) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      const response = await axios.post("accounts/users/reset_password_confirm/", {
        uid: uid,
        token: token,
        new_password: newPassword,
      });

      console.log(response);
      setSuccess(true);
      alert("Password reset successful");
      navigate('/'); // Redirect to login page after successful password reset

    } catch (error) {
      setError("An error occurred. Please try again later.");
      console.log(error);
    }
  };

  return (
    <div>
      <h1>Reset Password</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="newPassword">New Password</label>
        <input
          type="password"
          id="newPassword"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          required
        />

        <label htmlFor="confirmPassword">Confirm Password</label>
        <input
          type="password"
          id="confirmPassword"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />


        {success ? (<p>Password reset successful!</p>) : 
            (<p>{error}</p>)
        }

        <button type="submit">Reset Password</button>
      </form>
    </div>
  );
};

export default ResetPassword;
