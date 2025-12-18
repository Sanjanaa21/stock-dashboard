import { useEffect, useState } from "react";
import API from "./api.js";
import { io } from "socket.io-client";

// const socket = io("http://localhost:5000");
export default function Dashboard({ user }) {

  const [stocks, setStocks] = useState([]);
  const supported = ["GOOG", "TSLA", "AMZN", "META", "NVDA"];

  
  useEffect(() => {
  const socket = io("https://stock-dashboard-backend.onrender.com", {
    transports: ["websocket"],
    withCredentials: true,
  });

  socket.emit("join", user.email);

  socket.on("priceUpdate", (data) => {
    setStocks(data);
  });

  return () => {
    socket.off("priceUpdate");
    socket.disconnect();
  };
}, [user.email]);


  async function subscribe(ticker) {
    try {
      const res = await API.post("/subscribe", {
        email: user.email,
        ticker,
      });
      console.log(res.data);
    } catch (error) {
      console.error("Subscribe error:", error);
      alert("Server not running or error in subscribe.");
    }
  }

  return (
    <div className="dashboard-container">
      <h2>Welcome {user.email}</h2>

      <h3>Subscribe to Stock</h3>
      {supported.map(t => (
        <button key={t} onClick={() => subscribe(t)}>
          {t}
        </button>
      ))}

      <h3>Subscribed Stock Prices</h3>
      <div>
        {stocks.map(s => (
          <p key={s.ticker} className="stock-card">
            {s.ticker}: <b>${s.price}</b>
          </p>
        ))}
      </div>
    </div>
  );
}
