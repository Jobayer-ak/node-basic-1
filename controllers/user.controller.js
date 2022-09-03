const userInfo = require("../data.json");
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
    const id = Math.floor(Math.random() * userInfo.length) + 1;
    const randomUser = userData.filter((user) => user.id === id);
    res.send(randomUser);
  });
};

// save new user
module.exports.saveNewUser = (req, res) => {
  const data = fs.readFileSync("data.json");
  const myObject = JSON.parse(data);
  const newData = req.body;
  // validating req.body data

  const validation = myObject.find(
    (user) =>
      user.id === newData.id ||
      user.name === newData.name ||
      user.contact === newData.contact ||
      user.address === newData.address ||
      user.photoUrl === newData.photoUrl ||
      Object.keys(user) === Object.keys(newData)
  );

  // const exisitingKeys = Object.keys(myObject);
  // console.log(exisitingKeys);

  console.log(validation);
  if (validation) {
    res.send("Data exists in json file");
  } else {
    myObject.push(newData);
    const newData2 = JSON.stringify(myObject);

    fs.writeFile("data.json", newData2, (err) => {
      if (err) {
        console.log(err.message);
        return;
      }

      res.send("Successfully added data to json file!");
    });
  }
};
