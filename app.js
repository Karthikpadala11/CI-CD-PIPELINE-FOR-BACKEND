const express = require("express");
const app = express();
const PORT = 3000;

// Middleware
app.use(express.json());
app.use(express.static("Public"));

// Dummy login data
const user = {
  username: "admin",
  password: "1234"
};

// Dummy ticket data
const tickets = [
  { from: "Nagpur", to: "Pune", price: 3000 },
  { from: "Nagpur", to: "Mumbai", price: 4000 },
  { from: "Delhi", to: "Mumbai", price: 6000 },
  { from: "Pune", to: "Bangalore", price: 5000 },
  { from: "Mumbai", to: "Goa", price: 3500 },
  { from: "Delhi", to: "Mumbai", price: 5000 }
];

// LOGIN API
app.post("/login", (req, res) => {
  const { username, password, email } = req.body;

  if (
    username === "admin" &&
    password === "1234" &&
    email === "admin@gmail.com"
  ) {
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
  console.log(`Server running at http://localhost:${PORT}`);
});
