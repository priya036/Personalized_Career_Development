import React from "react";
import Button from "@mui/material/Button";
import { signInWithGoogle } from "../Firebase";
import { useNavigate } from "react-router-dom";

function LoginButton() {
  const navigate = useNavigate();

  const handleSignIn = async () => {
    try {
      const user = await signInWithGoogle(); // Trigger Google login
      if (user) {
        navigate("/home"); // Navigate to home page on success
      }
    } catch (error) {
      console.error("Login error:", error);
      alert("Failed to log in. Please try again.");
    }
  };

  return (
    <Button
      variant="contained"
      color="primary"
      onClick={handleSignIn}
      style={{
        textTransform: "none",
        padding: "10px 20px", // Adjust padding for size
        fontSize: "15px", // Adjust font size
        borderRadius: 10,
      }}
    >
      Continue with Google
    </Button>
  );
}

export default LoginButton;
