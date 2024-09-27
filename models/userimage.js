const mongoose = require("mongoose");

const userImage = new mongoose.Schema({
  image_url: String,
  public_id: String,
  userId: String,
});

module.exports = mongoose.model("images", userImage);
