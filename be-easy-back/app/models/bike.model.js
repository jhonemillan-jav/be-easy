const mongoose = require("mongoose");

const Bike = mongoose.model(
  "Bike",
  new mongoose.Schema({
    brand: String,
    registration: String,
    size: Number,
    color: String,
    owner: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
      }
    ]
  })
);

module.exports = Bike;
