const CustomError = require("../helpers/customerror");

const errorHandler = (error, req, res, next) => {
  console.log(error);

  if (!(error instanceof CustomError)) {
    if (error.parent?.sqlMessage)
      error = new CustomError(error.parent.sqlMessage, 500);
    else
      error = new CustomError("Error desconocido", 500);
  }

  res.status(error.status).json(error);
};

module.exports = {
  errorHandler,
};
