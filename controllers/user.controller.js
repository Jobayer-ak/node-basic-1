// const userInfo = require("../data.json");
const fs = require("fs");

// get all user
module.exports.getAllUser = (req, res) => {
  fs.readFile("data.json", (err, data) => {
    if (err) {
      return console.log(err.message);
    }
    const userData = JSON.parse(data);

    // showing limited data
    const { limit } = req.query;
    const limitedData = userData.slice(0, limit);
    res.send(limitedData);
  });
};

// get random user
module.exports.getRandomUser = (req, res) => {
  fs.readFile("data.json", (err, data) => {
    if (err) {
      return console.log(err.message);
    }
    const userData = JSON.parse(data);
    const id = Math.floor(Math.random() * 9) + 1;
    const randomUser = userData.filter((user) => user.id === id);
    res.send(randomUser);
  });
};
