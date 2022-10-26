const bcrypt = require("bcrypt");
const { generateToken } = require("../helpers/auth");
const { User } = require("../models");
const CustomError = require("../helpers/customerror");

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({
      where: {
        email,
      },
    });

    if (!user) throw new CustomError("No autorizado", 401);

    bcrypt.compare(password, user.password, function (error, result) {
      if (error || !result) throw new CustomError("No autorizado", 401);

      const { id, roleId } = user;
      const accessToken = generateToken({ userId: id, roleId });
      return res.status(200).json({ accessToken });
    });
  } catch (error) {
    next(error);
  }
};

const me = async (req, res, next) => {
  try {
    const { userId } = req.user;

    const user = await User.findByPk(userId);

    if (!user) throw new CustomError("No encontrado", 404);

    return res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  login,
  me,
};
