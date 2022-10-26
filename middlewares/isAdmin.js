const CustomError = require("../helpers/customerror");

const { ROLE_ADMIN_ID } = process.env;

const isAdmin = (req, res, next) => {
  try {
    const { roleId } = req.user;

    if (roleId != ROLE_ADMIN_ID) throw new CustomError("No autorizado", 403);

    next();
  } catch (error) {
    next(error);
  }
};

module.exports = {
  isAdmin,
};
