import { Box, Button, Card, TextField } from "@mui/material";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useUserContext } from "../hooks/useUserContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { dispatch } = useUserContext();

  const handleLogin = () => {
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const user = users.find(
      (user) => user.email === email && user.password === password
    );

    if (user) {
      dispatch({ type: "LOGIN", payload: user });
      navigate("/");
    } else {
      setError("Invalid email or password");
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
        <h1 style={{ color: "#6D4C41" }}>Login</h1>
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
          onClick={handleLogin}
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
          Login
        </Button>
        {error && <p style={{ color: "red" }}>{error}</p>}
        <Box sx={{ marginTop: "16px", textAlign: "center" }}>
          <span>Don't have an account?</span>
          <Link
            to="/signup"
            style={{
              textDecoration: "none",
              color: "#6D4C41",
              fontWeight: "bold",
            }}
          >
            Sign Up
          </Link>
        </Box>
      </Card>
    </div>
  );
};

export default Login;
