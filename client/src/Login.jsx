
import { useState } from "react";
import API from "./api.js";

export default function Login({ setUser }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  
  function validateEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  async function handleLogin() {
    if (!email || !validateEmail(email)) {
      alert("Please enter a valid email");
      return;
    }
    if (!password) {
      alert("Please enter your password");
      return;
    }

    setLoading(true);
    try {
      const res = await API.post("/login", { email, password });
      setUser(res.data);
    } catch (error) {
      console.error("Login error:", error);
      if (error.response && error.response.status === 401) {
        alert("Invalid email or password");
      } else {
        alert("Server error or network issue");
      }
    } finally {
      setLoading(false);
    }
  }

  const inputStyle = {
    display: "block",
    marginBottom: 16,
    padding: 8,
    fontSize: 16,
    width: 300,
  };

  const buttonStyle = {
    padding: "10px 20px",
    fontSize: 16,
    cursor: loading ? "not-allowed" : "pointer",
  };

  return (
    <div style={{ padding: 200 }}>
      <h2>Login</h2>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleLogin();
        }}
      >
        <input
          type="email"
          placeholder="Enter Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={loading}
          autoComplete="email"
          style={inputStyle}
        />
        <input
          type="password"
          placeholder="Enter Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          disabled={loading}
          autoComplete="current-password"
          style={inputStyle}
        />
        <button type="submit" disabled={loading} style={buttonStyle}>
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>
    </div>
  );
}
