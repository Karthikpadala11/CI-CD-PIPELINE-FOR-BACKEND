// index.js
const express = require("express");
const cors = require("cors");

const app = express();

// Load environment variables (optional)
const PORT = process.env.PORT || 3000;
const USERNAME = process.env.USERNAME || "admin";
const PASSWORD = process.env.PASSWORD || "1234";
const EMAIL = process.env.EMAIL || "admin@gmail.com";

// Middleware
app.use(cors()); // Allow frontend to call backend
app.use(express.json());
app.use(express.static("Public")); // Serve static files from 'Public'

// Dummy ticket data
const tickets = [
  { from: "Nagpur", to: "Pune", price: 3000 },
  { from: "Nagpur", to: "Mumbai", price: 4000 },
  { from: "Delhi", to: "Mumbai", price: 6000 },
  { from: "Pune", to: "Bangalore", price: 5000 },
  { from: "Mumbai", to: "Goa", price: 3500 },
  { from: "Delhi", to: "Mumbai", price: 5000 },
  { from: "Tirupati", to: "Nagpur", price: 3000 }
];

// Health check endpoint (for ALB)
app.get("/health", (req, res) => {
  res.status(200).json({ status: "UP" });
});

// LOGIN API
app.post("/login", (req, res) => {
  const { username, password, email } = req.body;

  if (username === USERNAME && password === PASSWORD && email === EMAIL) {
    res.json({ success: true, username, email });
  } else {
    res.json({ success: false });
  }
});

// SEARCH API
app.post("/search", (req, res) => {
  const { from, to, people } = req.body;

  const ticket = tickets.find(
    t =>
      t.from.toLowerCase() === from.toLowerCase() &&
      t.to.toLowerCase() === to.toLowerCase()
  );

  if (ticket) {
    res.json({
      success: true,
      data: {
        from,
        to,
        people,
        price: ticket.price,
        total: ticket.price * people
      }
    });
  } else {
    res.json({ success: false });
  }
});

// START SERVER
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

