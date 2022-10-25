const jwt = require("jsonwebtoken");
const { TOKEN_SECRET, TOKEN_EXPIRES_IN } = process.env;

const generateToken = ({ userId, roleId }) => {
  return jwt.sign({ data: { userId, roleId } }, TOKEN_SECRET, {
    expiresIn: Number(TOKEN_EXPIRES_IN),
  });
};

const verifyToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (token == null) return res.sendStatus(401);

  console.log(token);

  jwt.verify(token, TOKEN_SECRET, (error, decoded) => {
    if (error) return res.sendStatus(403);
    req.user = decoded.data;

    next();
  });
};
module.exports = {
  generateToken,
  verifyToken,
};
