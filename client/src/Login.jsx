import { useState } from "react";
import API from "./api.js";

export default function Login({ setUser }) {
  const [email, setEmail] = useState("");

  async function handleLogin() {
    try {
      const res = await API.post("/login", { email });
      setUser(res.data);
    } catch (error) {
      console.error("Login error:", error);
      alert("Server not running or error in login.");
    }
  }

  return (
    <div style={{ padding: 200 }}>
      <h2>Login</h2>
      <input
        placeholder="Enter Email"
        value={email}
        onChange={e => setEmail(e.target.value)}
      />
      <button onClick={handleLogin}>Login</button>
    </div>
  );
}
