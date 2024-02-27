const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  groups: [mongoose.Schema.Types.ObjectId],
});

const User = mongoose.model("User", userSchema);

module.exports = User;
