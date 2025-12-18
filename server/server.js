// // // // const express = require("express");
// // // // const cors = require("cors");
// // // // const http = require("http");
// // // // const { Server } = require("socket.io");

// // // // const app = express();
// // // // app.use(cors());
// // // // app.use(express.json());

// // // // const server = http.createServer(app);

// // // // const io = new Server(server, {
// // // //   cors: {
// // // //     origin: "*",
// // // //   },
// // // // });

// // // // // Supported stocks
// // // // const SUPPORTED_STOCKS = ["GOOG", "TSLA", "AMZN", "META", "NVDA"];

// // // // // Initial random prices
// // // // let stockPrices = {
// // // //   GOOG: 100,
// // // //   TSLA: 150,
// // // //   AMZN: 200,
// // // //   META: 250,
// // // //   NVDA: 300
// // // // };

// // // // // Randomly update prices every 1 sec
// // // // setInterval(() => {
// // // //   SUPPORTED_STOCKS.forEach(stock => {
// // // //     // simulate random price change
// // // //     const change = (Math.random() * 4 - 2).toFixed(2);
// // // //     stockPrices[stock] = parseFloat(stockPrices[stock]) + parseFloat(change);

// // // //     // Emit update to clients subscribed to that stock
// // // //     io.to(stock).emit("price_update", {
// // // //       symbol: stock,
// // // //       price: stockPrices[stock].toFixed(2)
// // // //     });
// // // //   });
// // // // }, 1000);

// // // // // Handle socket connections
// // // // io.on("connection", (socket) => {
// // // //   console.log("User connected:", socket.id);

// // // //   socket.on("subscribe", (stockSymbol) => {
// // // //     console.log(`User ${socket.id} subscribed to ${stockSymbol}`);
// // // //     socket.join(stockSymbol);

// // // //     // send current price instantly
// // // //     socket.emit("price_update", {
// // // //       symbol: stockSymbol,
// // // //       price: stockPrices[stockSymbol].toFixed(2)
// // // //     });
// // // //   });

// // // //   socket.on("unsubscribe", (stockSymbol) => {
// // // //     console.log(`User ${socket.id} unsubscribed from ${stockSymbol}`);
// // // //     socket.leave(stockSymbol);
// // // //   });

// // // //   socket.on("disconnect", () => {
// // // //     console.log("User disconnected:", socket.id);
// // // //   });
// // // // });

// // // // server.listen(4000, () => {
// // // //   console.log("Server running on port 4000");
// // // // });


// // // const express = require("express");
// // // const cors = require("cors");

// // // const app = express();
// // // const PORT = 4000;

// // // app.use(cors());
// // // app.use(express.json());

// // // // Supported stocks
// // // const supportedStocks = ["GOOG", "TSLA", "AMZN", "META", "NVDA"];

// // // // Users and their subscribed stocks
// // // const users = {
// // //   "test1@example.com": { subscriptions: [] },
// // //   "test2@example.com": { subscriptions: [] },
// // // };

// // // // Current stock prices
// // // let stockPrices = {};
// // // supportedStocks.forEach(stock => {
// // //   stockPrices[stock] = (Math.random() * 500 + 100).toFixed(2);
// // // });

// // // // --- Routes ---

// // // // Login route
// // // app.post("/login", (req, res) => {
// // //   const { email } = req.body;
// // //   if (!email) return res.status(400).json({ success: false, message: "Email required" });

// // //   // Add new user if not exists
// // //   if (!users[email]) users[email] = { subscriptions: [] };

// // //   res.json({ success: true, email });
// // // });

// // // // Subscribe route
// // // app.post("/subscribe", (req, res) => {
// // //   const { email, stock } = req.body;

// // //   if (!email || !stock) return res.status(400).json({ success: false, message: "Email and stock required" });
// // //   if (!supportedStocks.includes(stock)) return res.status(400).json({ success: false, message: "Stock not supported" });

// // //   if (!users[email].subscriptions.includes(stock)) {
// // //     users[email].subscriptions.push(stock);
// // //   }

// // //   res.json({ success: true, subscriptions: users[email].subscriptions });
// // // });

// // // // Get user's subscriptions
// // // app.post("/subscriptions", (req, res) => {
// // //   const { email } = req.body;
// // //   if (!email || !users[email]) return res.status(400).json({ success: false, message: "User not found" });

// // //   res.json({ subscriptions: users[email].subscriptions });
// // // });

// // // // --- Live stock prices using Server-Sent Events ---
// // // app.get("/live-prices", (req, res) => {
// // //   res.setHeader("Content-Type", "text/event-stream");
// // //   res.setHeader("Cache-Control", "no-cache");
// // //   res.setHeader("Connection", "keep-alive");

// // //   const sendPrices = () => {
// // //     // Update stock prices randomly
// // //     supportedStocks.forEach(stock => {
// // //       stockPrices[stock] = (Math.random() * 500 + 100).toFixed(2);
// // //     });

// // //     res.write(`data: ${JSON.stringify(stockPrices)}\n\n`);
// // //   };

// // //   const interval = setInterval(sendPrices, 1000);

// // //   req.on("close", () => {
// // //     clearInterval(interval);
// // //   });
// // // });

// // // // --- Start server ---
// // // app.listen(PORT, () => {
// // //   console.log(`Server running on port ${PORT}`);
// // // });

// // const express = require("express");
// // const cors = require("cors");

// // const app = express();
// // const PORT = 4000;

// // app.use(cors());
// // app.use(express.json());

// // // Supported stocks
// // const supportedStocks = ["GOOG", "TSLA", "AMZN", "META", "NVDA"];

// // // Users and their subscriptions
// // const users = {};

// // // Current stock prices
// // let stockPrices = {};
// // supportedStocks.forEach(stock => {
// //   stockPrices[stock] = (Math.random() * 500 + 100).toFixed(2);
// // });

// // // --- Home route ---
// // app.get("/", (req, res) => {
// //   res.send("Stock Broker Backend Running!");
// // });

// // // --- Login ---
// // app.post("/login", (req, res) => {
// //   const { email } = req.body;
// //   if (!email) return res.status(400).json({ success: false, message: "Email required" });

// //   // Add user if not exists
// //   if (!users[email]) users[email] = { subscriptions: [] };

// //   res.json({ success: true, email });
// // });

// // // --- Subscribe ---
// // app.post("/subscribe", (req, res) => {
// //   const { email, stock } = req.body;

// //   if (!email || !stock) return res.status(400).json({ success: false, message: "Email and stock required" });
// //   if (!supportedStocks.includes(stock)) return res.status(400).json({ success: false, message: "Stock not supported" });

// //   if (!users[email].subscriptions.includes(stock)) {
// //     users[email].subscriptions.push(stock);
// //   }

// //   res.json({ success: true, subscriptions: users[email].subscriptions });
// // });

// // // --- Get user's subscriptions ---
// // app.post("/subscriptions", (req, res) => {
// //   const { email } = req.body;
// //   if (!email || !users[email]) return res.status(400).json({ success: false, message: "User not found" });

// //   res.json({ subscriptions: users[email].subscriptions });
// // });

// // // --- Live stock prices (SSE) ---
// // app.get("/live-prices", (req, res) => {
// //   res.setHeader("Content-Type", "text/event-stream");
// //   res.setHeader("Cache-Control", "no-cache");
// //   res.setHeader("Connection", "keep-alive");

// //   const sendPrices = () => {
// //     // Update stock prices randomly
// //     supportedStocks.forEach(stock => {
// //       stockPrices[stock] = (Math.random() * 500 + 100).toFixed(2);
// //     });

// //     res.write(`data: ${JSON.stringify(stockPrices)}\n\n`);
// //   };

// //   // Send initial prices
// //   sendPrices();

// //   const interval = setInterval(sendPrices, 1000);

// //   // Stop interval if client disconnects
// //   req.on("close", () => {
// //     clearInterval(interval);
// //   });
// // });

// // // --- Start server ---
// // app.listen(PORT, () => {
// //   console.log(`Server running on port ${PORT}`);
// // });

// const express = require("express");
// const http = require("http");
// const cors = require("cors");
// const { Server } = require("socket.io");

// const users = require("./users");
// const stocks = require("./stocks");

// const app = express();
// app.use(cors());
// app.use(express.json());

// const server = http.createServer(app);

// // const io = new Server(server, {
// //   cors: { origin: "*" }
// // });
// const io = new Server(server, {
//   cors: {
//     origin: [
//       "http://localhost:5173",
//       "https://your-frontend.vercel.app"
//     ],
//     methods: ["GET", "POST"]
//   }
// });

// // ---------------- REST API ---------------- //

// app.post("/login", (req, res) => {
//   const { email } = req.body;
//   users[email] = users[email] || { email, subscribed: [] };
//   return res.json(users[email]);
// });

// app.post("/subscribe", (req, res) => {
//   const { email, ticker } = req.body;
//   if (!users[email]) return res.status(400).json({ message: "User not found" });

//   if (!stocks.supported.includes(ticker))
//     return res.status(400).json({ message: "Ticker not supported" });

//   if (!users[email].subscribed.includes(ticker))
//     users[email].subscribed.push(ticker);

//   return res.json(users[email]);
// });

// // ---------------- SOCKET IO ---------------- //

// io.on("connection", (socket) => {
//   console.log("Client connected", socket.id);

//   socket.on("join", (email) => {
//     socket.join(email);
//     console.log("User joined:", email);
//   });

//   socket.on("disconnect", () => {
//     console.log("Client disconnected");
//   });
// });

// // Update stock prices every second
// setInterval(() => {
//   stocks.prices = stocks.prices.map(s => ({
//     ticker: s.ticker,
//     price: (Math.random() * 2000 + 100).toFixed(2)
//   }));

//   // Broadcast prices to subscribed users
//   Object.values(users).forEach(user => {
//     const filtered = stocks.prices.filter(p =>
//       user.subscribed.includes(p.ticker)
//     );
//     io.to(user.email).emit("priceUpdate", filtered);
//   });

// }, 1000);

// // server.listen(5000, () => console.log("Server running on port 5000"));
// const PORT = process.env.PORT || 5000;
// server.listen(PORT, () =>
//   console.log(`Server running on port ${PORT}`)
// );
const express = require("express");
const http = require("http");
const cors = require("cors");
const { Server } = require("socket.io");

const users = {};
const stocks = {
  supported: ["GOOG", "TSLA", "AMZN", "META", "NVDA"],
  prices: [
    { ticker: "GOOG", price: 100 },
    { ticker: "TSLA", price: 200 },
    { ticker: "AMZN", price: 300 },
    { ticker: "META", price: 400 },
    { ticker: "NVDA", price: 500 }
  ]
};

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Backend is running 🚀");
});

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: [
      "http://localhost:5173",
      // "https://stock-dashboard-cjlh.vercel.app/"
      "https://stock-dashboard-4.onrender.com"
    ],
    methods: ["GET", "POST"]
  }
});

// -------- REST APIs -------- //

app.post("/login", (req, res) => {
  const { email } = req.body;
  users[email] = users[email] || { email, subscribed: [] };
  res.json(users[email]);
});

app.post("/subscribe", (req, res) => {
  const { email, ticker } = req.body;

  if (!users[email]) return res.status(400).json({ message: "User not found" });
  if (!stocks.supported.includes(ticker))
    return res.status(400).json({ message: "Ticker not supported" });

  if (!users[email].subscribed.includes(ticker)) {
    users[email].subscribed.push(ticker);
  }

  res.json(users[email]);
});

// -------- SOCKET IO -------- //

io.on("connection", (socket) => {
  console.log("Client connected:", socket.id);

  socket.on("join", (email) => {
    socket.join(email);
    console.log("User joined room:", email);
  });

  socket.on("disconnect", () => {
    console.log("Client disconnected");
  });
});

// -------- PRICE UPDATES -------- //

setInterval(() => {
  stocks.prices = stocks.prices.map(s => ({
    ticker: s.ticker,
    price: (Math.random() * 2000 + 100).toFixed(2)
  }));

  Object.values(users).forEach(user => {
    const updates = stocks.prices.filter(p =>
      user.subscribed.includes(p.ticker)
    );
    io.to(user.email).emit("priceUpdate", updates);
  });
}, 1000);

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
