const bcrypt = require("bcrypt");
const { generateToken } = require("../helpers/auth");
const { User } = require("../models");

const login = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({
    where: {
      email,
    },
  });

  if (!user) return res.sendStatus(401);

  bcrypt.compare(password, user.password, function (error, result) {
    if (error || !result) return res.sendStatus(401);

    const { id, roleId } = user;
    const accessToken = generateToken({ userId: id, roleId });
    return res.status(200).json({ accessToken });
  });
};

const me = async (req, res) => {
  const { userId } = req.user;

  const user = await User.findByPk(userId);

  if (!user) return res.sendStatus(404);

  return res.status(200).json(user);
};

module.exports = {
  login,
  me,
};
