require("dotenv").config();
require('./db');

const express = require("express");
const cors = require("cors");
const { logout } = require("./logout");
const { login } = require("./login");
const { addProduct, productSearch } = require("./product");

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello from the backend!");
});

app.post("/api/login", (req, res) => {
  const { username, password } = req.body;
  const result = login(username, password);

  if (result === "Success") {
    res.json({ message: "Login successful" });
  } else {
    res.status(401).json({ message: "Invalid credentials" });
  }
});

app.post("/api/logout", (req, res) => {
  const { logoutClicked, confirmationClicked } = req.body;
  const result = logout(logoutClicked, confirmationClicked);
  res.json({ message: result });
});

app.post("/api/add-product", async (req, res) => {
  const { name, price, quantity } = req.body;
  const result = addProduct(name, price, quantity);
  res.json({ message: result });
});

app.get("/api/search-product", async (req, res) => {
  const { keyword } = req.query;
  const result = productSearch(keyword);
  res.json({ message: result });
});

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
