const express = require("express");
const routes = express.Router();

const College = require("../models/College");

// Register College
routes.post("/register", async (req, res) => {
  try {
    const { name, description } = req.body;

    const college = await College.findOne({ name });

    if (college) {
      return res.json({
        msg: "College Already Exists",
      });
    }

    const newCollege = new College({
      name,
      description,
      status: "active",
    });

    await newCollege.save();

    return res.json({
      msg: "College Registered Successfully",
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      msg: "Server Error",
    });
  }
});

// Show All Colleges
routes.get("/show", async (req, res) => {
  try {
    const data = await College.find({
      status: { $in: ["active", "inactive"] },
    });

    return res.json({
      msg: "Data Fetched",
      college: data,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      msg: "Server Error",
    });
  }
});

// Update College
routes.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description } = req.body;

    await College.findByIdAndUpdate(id, {
      name,
      description,
    });

    return res.json({
      msg: "College Updated Successfully",
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      msg: "Server Error",
    });
  }
});

// Delete College (Soft Delete)
routes.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    await College.findByIdAndUpdate(id, {
      status: "delete",
    });

    return res.json({
      msg: "College Deleted Successfully",
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      msg: "Server Error",
    });
  }
});

// Active Colleges
routes.get("/active", async (req, res) => {
  try {
    const data = await College.find({
      status: "active",
    });

    return res.json({
      msg: "College Fetched",
      college: data,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      msg: "Server Error",
    });
  }
});

// Block / Unblock College
routes.patch("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    await College.findByIdAndUpdate(id, {
      status,
    });

    return res.json({
      msg: "Status Updated Successfully",
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      msg: "Server Error",
    });
  }
});

module.exports = routes;