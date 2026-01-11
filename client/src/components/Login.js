import { useState } from "react";
import { api } from "../api";

export default function Login({ setLoggedIn, onSwitchToRegister }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const login = async () => {
    try {
      const res = await api.post("/auth/login", { email, password });
      localStorage.setItem("token", res.data.token);
      setLoggedIn(true);
    } catch (err) {
      alert(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div style={box}>
      <h2>Login</h2>

      <input
        placeholder="Email"
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        placeholder="Password"
        type="password"
        onChange={(e) => setPassword(e.target.value)}
      />

      <button onClick={login}>Login</button>

      {/* ✅ YAHAN ADD KIYA */}
      <p style={linkText} onClick={onSwitchToRegister}>
        Don’t have an account? <span style={link}>Create Account</span>
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
