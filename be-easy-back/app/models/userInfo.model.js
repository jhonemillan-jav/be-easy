const mongoose = require("mongoose");

const UserInfo = mongoose.model(
  "UserInfo",
  new mongoose.Schema({
    name: String,
    lastname: String,
    birthday: String,
    height: Number,
    weight: Number,
    user: 
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
      }
  })
);

module.exports = UserInfo;
