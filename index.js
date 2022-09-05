const express = require("express");
const cors = require("cors");
const dbConnect = require("./utils/dbConnect");
require("dotenv").configure;
const userInfo = require("./data.json");
const usersRoutes = require("./routes/v1/users.route");
const fs = require("fs");

const app = express();
const port = process.env.PORT || 3000;

// middleware
app.use(cors());
app.use(express.json());

// database connection
dbConnect();

// Api
app.use("/api/v1", usersRoutes);

// not found
app.all("*", (req, res) => {
  res.send("Not Found!");
});

app.listen(port, () => {
  console.log(`App is running on ${port}`);
});
