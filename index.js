const express = require("express");
const cors = require("cors");
const dbConnect = require("./utils/dbConnect");
require("dotenv").configure;

const app = express();
const PORT = 5000;

// middleware
app.use(cors());
app.use(express.json());

// database connection
dbConnect();

// not found
app.all("*", (req, res) => {
  res.send("Not Found!");
});

app.listen(PORT, () => {
  console.log(`App is running on ${PORT}`);
});
