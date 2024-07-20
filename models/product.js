const mongoose = require("mongoose");

const Produit = mongoose.model("Produit", {
    image: String,
    name: String,
    description: String,
    price: Number,
});

module.exports = Produit;
