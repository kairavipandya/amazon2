require("dotenv").config();
require('./db');

const express = require("express");
const cors = require("cors");
const { logout } = require("./logout");
const { login } = require("./login");
const { addProduct, productSearch } = require("./product");
const User = require("./models/User");

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello from the backend!");
});

app.post("/api/signup", async (req, res) => {
console.log("SIGNUP hit");

  const { username, password } = req.body;

  try {
    const existingUser = await User.findOne({ username });

    if (existingUser) {
      return res.status(409).json({ message: "Username already taken" });
    }

    const newUser = new User({ username, password }); // You’ll hash this later
    await newUser.save();

    res.json({ message: "Signup successful" });
  } catch (err) {
    console.error("Signup error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

app.post("/api/login", async (req, res) => {
  const { username, password } = req.body;
  const result = await login(username, password);

  if (result === "Success") {
    res.json({ message: "Login successful" });
  } else {
    res.status(401).json({ message: result }); // <-- Passes "Invalid credentials"
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

app.get("/api/category/:name", async (req, res) => {
  try {
    const collectionName = req.params.name.toLowerCase();
    const collection = mongoose.connection.collection(collectionName);
    const items = await collection.find({}).toArray();
    res.json(items);
  } catch (err) {
    console.error("Category fetch error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
