const { verifyToken } = require("../helpers/auth");

const isAuthenticated = (req, res, next) => {
  verifyToken(req, res, next);
};

module.exports = {
  isAuthenticated,
};
