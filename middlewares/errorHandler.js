const CustomError = require("../helpers/customerror");

const errorHandler = (error, req, res, next) => {
  if (!(error instanceof CustomError)) {
    error = new CustomError("Error desconocido", 500);
  }

  res.status(error.status).json(error);
};

module.exports = {
  errorHandler,
};
