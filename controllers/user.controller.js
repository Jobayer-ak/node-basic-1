const userInfo = require("../data.json");

module.exports.getAllUser = (req, res) => {
  const { limit } = req.query;
  //   console.log(limit);
  res.send(userInfo.slice(0, limit));
  //   res.send(userInfo);
};
