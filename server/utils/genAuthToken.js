const jwt = require("jsonwebtoken");

const createToken = (_id) => {
  const jwtKey = process.env.JWT_SECRET;
  return jwt.sign({ _id }, jwtKey, {
    expiresIn: "3d",
  });
};
module.exports = createToken;
