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
      Object.keys(user) === Object.keys(newData) ||
      user.id === newData.id ||
      user.name === newData.name ||
      user.contact === newData.contact ||
      user.address === newData.address ||
      user.photoUrl === newData.photoUrl
  );

  // console.log(validation);

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

// update user
module.exports.updateRandomUser = (req, res) => {
  const givenData = req.body;

  const singleUser = userInfo.findIndex((user) => user.id == givenData.id);
  const properties = Object.keys(givenData);

  for (let property of properties) {
    userInfo[singleUser][property] = givenData[property];
  }

  fs.writeFile("data.json", JSON.stringify(userInfo), (err) => {
    if (err) {
      res.send("Failed to update!");
    } else {
      res.send(JSON.stringify(userInfo));
    }
  });
};

// updtae a random user
// module.exports.updateRandomUser = (req, res) => {
//   let { id, gender, name, contact, address, photoUrl } = req.body;

//   console.log(userInfo.length);

//   if (id < 1 || id > userInfo.length) {
//     res.send(`There is no ${id} id of users!`);
//     return;
//   }

//   const singleUser = userInfo.find((user) => user.id === id);

//   if (!id || !gender || !name || !contact || !address || !photoUrl) {
//     res.send("You must update all field of information");
//     return;
//   } else {
//     (singleUser.gender = gender),
//       (singleUser.name = name),
//       (singleUser.contact = contact),
//       (singleUser.address = address),
//       (singleUser.photoUrl = photoUrl);
//   }

//   console.log(singleUser);

//   fs.writeFile("data.json", JSON.stringify(userInfo), (err) => {
//     if (err) {
//       console.log("Data didn't add to json file");
//       return;
//     }

//     res.send(JSON.stringify(userInfo));
//   });
// };
