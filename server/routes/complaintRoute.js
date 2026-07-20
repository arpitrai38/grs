const express = require("express");
const routes = express.Router();

const Complaint = require("../models/Complaint");

// Register Complaint Type
routes.post("/register", async (req, res) => {
  try {
    const { complaintType } = req.body;

    const complaint = await Complaint.findOne({ complaintType });

    if (complaint) {
      return res.json({ msg: "Complaint Type Already Exists" });
    }

    const newComplaint = new Complaint({
      complaintType,
      status: "active",
    });

    await newComplaint.save();

    return res.json({ msg: "Complaint Type Added Successfully" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ msg: "Server Error" });
  }
});

// Show All Complaint Types
routes.get("/show", async (req, res) => {
  try {
    const data = await Complaint.find({
      status: { $in: ["active", "inactive"] },
    });

    return res.json({
      msg: "Data Fetched",
      complaint: data,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ msg: "Server Error" });
  }
});

// Update Complaint Type
routes.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { complaintType } = req.body;

    await Complaint.findByIdAndUpdate(id, {
      complaintType,
    });

    return res.json({
      msg: "Complaint Type Updated Successfully",
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ msg: "Server Error" });
  }
});

// Delete Complaint Type (Soft Delete)
routes.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    await Complaint.findByIdAndUpdate(id, {
      status: "delete",
    });

    return res.json({
      msg: "Complaint Type Deleted Successfully",
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ msg: "Server Error" });
  }
});

// Active Complaint Types
routes.get("/active", async (req, res) => {
  try {
    const data = await Complaint.find({
      status: "active",
    });

    return res.json({
      msg: "Complaint Type Fetched",
      complaint: data,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ msg: "Server Error" });
  }
});

// Block / Unblock Complaint Type
routes.patch("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    await Complaint.findByIdAndUpdate(id, {
      status,
    });

    return res.json({
      msg: "Status Updated",
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ msg: "Server Error" });
  }
});

module.exports = routes;