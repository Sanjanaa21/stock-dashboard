
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
    origin: "*",
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
