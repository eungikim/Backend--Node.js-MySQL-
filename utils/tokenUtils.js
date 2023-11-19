const jwt = require("jsonwebtoken");

exports.createJWT = (payload) => {
  const token = jwt.sign(payload, "moty-secure");
  return token;
};

exports.verifyJWT = (token) => {
  const decoded = jwt.verify(token, "moty-secure");
  return decoded;
};
