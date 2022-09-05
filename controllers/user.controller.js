const userInfo = require("../data.json");
const fs = require("fs");
const { resolveSoa } = require("dns");

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
  const myObject = userInfo;
  const newData = req.body;

  // validating req.body data
  const validation = myObject.find(
    (user) =>
      Object.keys(user) === Object.keys(newData) ||
      user.id === newData.id ||
      user.name === newData.name ||
      user.contact === newData.contact
    // user.address === newData.address ||
    // user.photoUrl === newData.photoUrl
  );

  if (validation) {
    res.send("Your provided data exists!");
    return;
  } else {
    myObject.push(newData);
    const newData2 = JSON.stringify(myObject);

    fs.writeFile("data.json", newData2, (err) => {
      if (err) {
        res.send("Failed to save user information!");
        return;
      }

      res.send("Successfully saved!");
    });
  }
};

// update user
module.exports.updateRandomUser = (req, res) => {
  const givenData = req?.body;

  console.log(Object.keys(givenData).length);

  if (!givenData || Object.keys(givenData).length < 2 || !givenData.id) {
    res.send(
      "You must provide 2 properties with value. id should be included!"
    );
    return;
  }

  if (isNaN(givenData.id)) {
    res.send("id value should be a number!");
    return;
  }

  if (givenData.id > userInfo.length) {
    res.send("Your provided id doen't exist!");
    return;
  }

  // console.log(givenData);

  // if (Object.keys(givenData).toString() !== "id") {
  //   res.send(
  //     "You have to provide 'id' as object property and number as value!"
  //   );
  //   return;
  // }

  // if (isNaN(givenData.id)) {
  //   res.send("Your property value is not a number");
  //   return;
  // }

  const singleUser = userInfo.findIndex((user) => user.id == givenData.id);
  const properties = Object.keys(givenData);

  for (let property of properties) {
    userInfo[singleUser][property] = givenData[property];
  }

  fs.writeFile("data.json", JSON.stringify(userInfo), (err) => {
    if (err) {
      res.send("Failed to update!");
      return;
    } else {
      res.send("Successfully updated");
    }
  });
};

// update multiple user
module.exports.updateMultipleInfo = (req, res) => {
  const updateUsers = req.body;

  for (let updateUser of updateUsers) {
    let userIndex = userInfo.findIndex((obj) => obj.id == updateUser.id);

    const properties = Object.keys(updateUser);

    for (let property of properties) {
      userInfo[userIndex][property] = updateUser[property];
    }

    for (let property in userInfo[userIndex]) {
      userInfo[userIndex][property] == givend[property];
    }
  }

  fs.writeFile("data.json", JSON.stringify(userInfo), (err) => {
    if (err) {
      res.send("Failed to update multiple information!");
      return;
    } else {
      res.send("Multiple users infos are updated");
    }
  });
};

//delete user
module.exports.deleteUser = (req, res) => {
  const givenId = req.body;
  // const objLength = Object.keys(givenId).length;

  // provided object property name checking whether it is id or not
  if (Object.keys(givenId).toString() !== "id") {
    res.send("You have to provide 'id' as object property number as value!");
    return;
  }

  if (isNaN(givenId.id)) {
    res.send("Your property value is not a number");
    return;
  }

  const foundUser = userInfo.find((user) => user.id == Number(givenId.id));

  if (!foundUser) {
    res.send("Id didn't match");
    return;
  } else {
    const objIndex = userInfo.findIndex(
      (user) => user.id == Number(givenId.id)
    );

    userInfo.splice(objIndex, 1);

    fs.writeFile("data.json", JSON.stringify(userInfo), (err) => {
      if (err) {
        res.send("Failed to delete!");
      } else {
        res.send("Succuessfully deleted!");
      }
    });
  }
};
