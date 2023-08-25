const express = require("express");

const mongoose = require("mongoose");
const cors = require("cors");
const userRoute = require("./routes/userRoute.js");
const app = express();
require("dotenv").config();
app.use(express.json());
app.use(cors());
app.use("/api", (req, res) => {
  res.send("Hello World");
});
app.use("/users", userRoute);
const port = process.env.PORT || 5002;
const URL = process.env.MONGODB_URL;
app.listen(port, () => console.log(`Server is running on port ${port}`));
mongoose
  .connect(URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected!"))
  .catch((err) => console.log("Error connecting to MongoDB", err));
