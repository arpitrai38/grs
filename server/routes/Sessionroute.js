const express = require("express");
const routes = express.Router();

const Session = require("../models/Session");

// Register Session
routes.post("/register", async (req, res) => {
  try {
    const { name } = req.body;

    const session = await Session.findOne({ name });

    if (session) {
      return res.json({ msg: "Session Already Exists" });
    }

    const newSession = new Session({
      name,
      status: "active",
    });

    await newSession.save();

    return res.json({ msg: "Session Registered Successfully" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ msg: "Server Error" });
  }
});

// Show All Sessions
routes.get("/show", async (req, res) => {
  try {
    const data = await Session.find({
      status: { $in: ["active", "inactive"] },
    });

    return res.json({
      msg: "Data Fetched",
      session: data,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ msg: "Server Error" });
  }
});

// Update Session
routes.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;

    await Session.findByIdAndUpdate(id, { name });

    return res.json({
      msg: "Session Updated Successfully",
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ msg: "Server Error" });
  }
});

// Delete Session (Soft Delete)
routes.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    await Session.findByIdAndUpdate(id, {
      status: "delete",
    });

    return res.json({
      msg: "Session Deleted Successfully",
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ msg: "Server Error" });
  }
});

// Active Sessions
routes.get("/active", async (req, res) => {
  try {
    const data = await Session.find({
      status: "active",
    });

    return res.json({
      msg: "Session Fetched",
      session: data,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ msg: "Server Error" });
  }
});

// Block / Unblock Session
routes.patch("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    await Session.findByIdAndUpdate(id, { status });

    return res.json({
      msg: "Status Updated",
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ msg: "Server Error" });
  }
});

module.exports = routes;