const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

const database = require("./config/database");
const Product = require("./models/Products");

dotenv.config();

const PORT = process.env.PORT || 8080;

const app = express();

database.connect();
app.use(express.json());
app.use(cors());

app.post("/addProduct", async (req, res) => {
  const { name } = req.body;

  try {
    // Check if the product already exists
    const existingProduct = await Product.findOne({ name });

    if (existingProduct) {
      existingProduct.quantity += 1;
      if (existingProduct.quantity === 2) {
        existingProduct.type = "add something";
      }

      await existingProduct.save();
    } else {
      // Create a new product
      const newProduct = new Product({ name, quantity: 1, type: "" });
      await newProduct.save();
    }

    res.status(201).json({ message: "Product added successfully" });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

app.post("/buyAll", async (req, res) => {
  const { name } = req.body;

  try {
    // Check if the product already exists
    const existingProduct = await Product.findOne({ name });

    if (existingProduct) {
      existingProduct.quantity += 1;
      if (existingProduct.quantity === 2) {
        existingProduct.type = "add something";
      }

      await existingProduct.save();
    } else {
      // Create a new product
      const newProduct = new Product({ name, quantity: 1, type: "" });
      await newProduct.save();
    }

    res.status(201).json({ message: "Product added successfully" });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
