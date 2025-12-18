// import { useState } from "react";
// import API from "./api.js";

// export default function Login({ setUser }) {
//   const [email, setEmail] = useState("");

//   async function handleLogin() {
//     try {
//       const res = await API.post("/login", { email });
//       setUser(res.data);
//     } catch (error) {
//       console.error("Login error:", error);
//       alert("Server not running or error in login.");
//     }
//   }

//   return (
//     <div style={{ padding: 200 }}>
//       <h2>Login</h2>
//       <input
//         placeholder="Enter Email"
//         value={email}
//         onChange={e => setEmail(e.target.value)}
//       />
//       <button onClick={handleLogin}>Login</button>
//     </div>
//   );
// }

import { useState } from "react";
import API from "./api.js";

export default function Login({ setUser }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  // Simple email format regex for validation
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

  return (
    <div style={{ padding: 200 }}>
      <h2>Login</h2>
      <input
        type="email"
        placeholder="Enter Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        disabled={loading}
      />
      <input
        type="password"
        placeholder="Enter Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        disabled={loading}
      />
      <button onClick={handleLogin} disabled={loading}>
        {loading ? "Logging in..." : "Login"}
      </button>
    </div>
  );
}
