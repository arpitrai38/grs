const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");

dotenv.config();

const mongoDB = require("./config/db");

const app = express();
const PORT = process.env.PORT || 5000;

// Connect Database
mongoDB();

// Middlewares
app.use(cors());

app.use(express.json());

// Routes
app.use("/api/admin", require("./routes/adminRoute"));
app.use("/api/college",require('./routes/collegeRoute'))
app.use("/api/session", require("./routes/Sessionroute"));
app.use("/api/complaint", require("./routes/complaintRoute"));

app.listen(PORT, () => {
    console.log(`Server Running on http://localhost:${PORT}`);
});