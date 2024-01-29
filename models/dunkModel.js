const mongoose = require("mongoose");

// Data about the Data
let schemaDunk = mongoose.Schema({
  styleID: {
    type: String,
    required: true,
    unique: true,
    index: true,
  },
  nickName: {
    type: String,
    required: true,
    default: "unknown",
  },
  box: {
    type: String,
    required: true,
    default: "unknown",
  },
  img: {
    type: String,
    required: true,
    default: "unknown",
  },
  background: {
    type: String,
    required: true,
    default: "unknown",
  },
});

// Create and Export Model
module.exports = mongoose.model("dunk", schemaDunk);
