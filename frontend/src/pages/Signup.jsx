import { Box, Button, Card, TextField } from "@mui/material";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useUserContext } from "../hooks/useUserContext";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { dispatch } = useUserContext();

  const handleSignup = () => {
    const users = JSON.parse(localStorage.getItem("users")) || [];

    const userExists = users.some((user) => user.email === email);
    if (userExists) {
      setError("Email is already registered");
    } else {
      const newUser = { email, password };
      dispatch({ type: "SIGNUP", payload: newUser });
      navigate("/");
    }
  };

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Card
        sx={{
          borderRadius: "20px",
          boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
          backdropFilter: "blur(20px)",
          backgroundColor: "rgba(182, 182, 182, 0.459)",
          margin: "100px",
          maxWidth: "500px",
          padding: "10px",
        }}
      >
        <h1 style={{ color: "#6D4C41" }}>Signup</h1>
        <TextField
          label="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          fullWidth
          margin="normal"
          required
          sx={{
            borderRadius: "20px",
            "& .MuiOutlinedInput-root": {
              borderRadius: "20px",
              color: "#6D4C41",
              "& fieldset": {
                borderColor: "#8B7765",
              },
              "&:hover fieldset": {
                borderColor: "#8B7765",
              },
              "&.Mui-focused fieldset": {
                borderColor: "#6D4C41",
              },
            },
          }}
        />
        <TextField
          label="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          fullWidth
          margin="normal"
          required
          sx={{
            borderRadius: "20px",
            "& .MuiOutlinedInput-root": {
              borderRadius: "20px",
              color: "#6D4C41",
              "& fieldset": {
                borderColor: "#8B7765",
              },
              "&:hover fieldset": {
                borderColor: "#8B7765",
              },
              "&.Mui-focused fieldset": {
                borderColor: "#6D4C41",
              },
            },
          }}
        />
        <Button
          type="submit"
          variant="contained"
          onClick={handleSignup}
          sx={{
            marginTop: "16px",
            backgroundColor: "#6D4C41",
            borderRadius: "20px",
            color: "#FAF3E0",
            "&:hover": {
              backgroundColor: "#8B7765",
            },
          }}
        >
          Signup
        </Button>
        {error && <p style={{ color: "red" }}>{error}</p>}
        <Box sx={{ marginTop: "16px", textAlign: "center" }}>
          <span>Have an account?</span>
          <Link
            to="/login"
            style={{
              textDecoration: "none",
              color: "#6D4C41",
              fontWeight: "bold",
            }}
          >
            Login
          </Link>
        </Box>
      </Card>
    </div>
  );
};

export default Signup;
