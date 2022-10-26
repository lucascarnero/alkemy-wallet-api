class CustomError {
  constructor(error, status = 500) {
    this.error = error;
    this.status = status;
  }
}

module.exports = CustomError;
