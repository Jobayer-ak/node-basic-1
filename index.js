const express = require("express");
const cors = require("cors");
const dbConnect = require("./utils/dbConnect");
require("dotenv").configure;
const userInfo = require("./data.json");
const usersRoutes = require("./routes/v1/users.route");
const fs = require("fs");

const app = express();
const PORT = 5000;

// middleware
app.use(cors());
app.use(express.json());

// database connection
dbConnect();

// Api
// get all user api
app.use("/api/v1", usersRoutes);

// not found
app.all("*", (req, res) => {
  res.send("Not Found!");
});

app.listen(PORT, () => {
  console.log(`App is running on ${PORT}`);
});

console.log(typeof userInfo);
