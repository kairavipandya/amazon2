require("dotenv").config();
require('./db');

const mongoose = require("mongoose");
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

app.get("/api/category/automotive", async (req, res) => {
  const collection = mongoose.connection.collection("automotive");
  const products = await collection.find({}).toArray();
  res.json(products);
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
    const categoryName = req.params.name;

    const collection = mongoose.connection.db.collection(categoryName);
    const products = await collection.find().toArray();

    res.json(products);
  } catch (err) {
    console.error("❌ Failed to fetch category:", err);
    res.status(500).json({ message: "Server error" });
  }
});

app.get("/api/category/beautyAndPersonalCare", async (req, res) => {
  const collection = mongoose.connection.db.collection("beautyAndPersonalCare");
  const products = await collection.find().toArray();
  res.json(products);
});

const { processCheckout } = require("./checkout");

app.post("/api/checkout", (req, res) => {
  const { cardNumber, cvv, expirationDate } = req.body;
  const result = processCheckout(cardNumber, cvv, expirationDate);
  res.json({ message: result });
});

app.get("/api/all-products", async (req, res) => {
  try {
    const db = mongoose.connection.db;

    // You can list all collections and fetch from each if needed
    const collections = await db.listCollections().toArray();

    let allProducts = [];

    for (const col of collections) {
      const collection = db.collection(col.name);
      const items = await collection.find().toArray();

      // Normalize with category and map
      const formatted = items.map(item => ({
        _id: item._id,
        Name: item.Name || item.name,
        Price: item.Price || item.price,
        Quantity: item.Quantity || item.quantity,
        Rating: item.Rating || "4.9",
        imageUrl: item.imageUrl || item.image || "/fallback.jpg",
        category: col.name
      }));

      allProducts = [...allProducts, ...formatted];
    }

    res.json(allProducts);
  } catch (err) {
    console.error("❌ Failed to fetch all products:", err);
    res.status(500).json({ message: "Server error" });
  }
});

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
