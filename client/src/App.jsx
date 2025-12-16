import { useState } from "react";
import Login from "./Login.jsx";
import Dashboard from "./Dashboard.jsx";

export default function App() {
  const [user, setUser] = useState(null);

  return user ? <Dashboard user={user} /> : <Login setUser={setUser} />;
}
