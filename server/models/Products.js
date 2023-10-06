const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: String,
  quantity: Number,
  type: String,
});

module.exports = mongoose.model("Product", productSchema);
