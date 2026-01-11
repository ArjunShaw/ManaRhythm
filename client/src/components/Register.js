import { useState } from "react";
import { api } from "../api";

export default function Register({ onSwitchToLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const register = async () => {
    try {
      await api.post("/auth/register", { email, password });
      alert("Registered successfully. Now login.");
      onSwitchToLogin(); // ✅ Register ke baad Login page
    } catch (err) {
      alert(err.response?.data?.message || "Register failed");
    }
  };

  return (
    <div style={box}>
      <h2>Register</h2>

      <input
        placeholder="Email"
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        placeholder="Password"
        type="password"
        onChange={(e) => setPassword(e.target.value)}
      />

      <button onClick={register}>Register</button>

      {/* ✅ FORM KE JUST NICHE */}
      <p style={linkText} onClick={onSwitchToLogin}>
        Already have an account? <span style={link}>Login</span>
      </p>
    </div>
  );
}

const box = {
  width: "300px",
  margin: "100px auto",
  display: "flex",
  flexDirection: "column",
  gap: "10px",
  textAlign: "center",
};

const linkText = {
  marginTop: "10px",
  cursor: "pointer",
  fontSize: "14px",
};

const link = {
  color: "#4ea1ff",
};
