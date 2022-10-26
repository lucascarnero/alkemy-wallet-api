const jwt = require("jsonwebtoken");
const { TOKEN_SECRET, TOKEN_EXPIRES_IN } = process.env;
const CustomError = require("../helpers/customerror");

const generateToken = ({ userId, roleId }) => {
  return jwt.sign({ data: { userId, roleId } }, TOKEN_SECRET, {
    expiresIn: Number(TOKEN_EXPIRES_IN),
  });
};

const verifyToken = (req, res, next) => {
  try {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    if (token == null) throw new CustomError("Sin acceso", 401);

    jwt.verify(token, TOKEN_SECRET, (error, decoded) => {
      if (error) throw new CustomError("Prohibido", 403);
      req.user = decoded.data;

      next();
    });
  } catch (error) {
    next(error);
  }
};
module.exports = {
  generateToken,
  verifyToken,
};
