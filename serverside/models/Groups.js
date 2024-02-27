const mongoose = require("mongoose");

const groupSchema = mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    groupName: {
      type: String,
      required: true,
    },
    groupColor: {
      type: String,
      required: true,
    },
    notes: {
      type: [{ content: String, time: String, date: String }],
      default: [],
    },
  },
  { timestamps: true }
);

const Groups = mongoose.model("Group", groupSchema);

module.exports = Groups;
