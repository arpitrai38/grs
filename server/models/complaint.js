const mongoose = require("mongoose");

const complaintSchema = new mongoose.Schema(
  {
    complaintType: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    status: {
      type: String,
      default: "active",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Complaint", complaintSchema);