//Error middleware | Next function

const errorMiddleware = (err, req, res, next) => {
  const defaultError = {
    statusCode: 404,
    succes: "failed",
    message: err,
  };

  if (err?.name === "ValidationError") {
    defaultError.statusCode = 404;

    defaultError.message = Object.values(err, errors)
      .map((el) => el.message)
      .join(",");
  }

  //Duplicate error

  if (err.code && err.code === 11000) {
    defaultError.statusCode = 404;
    defaultError.message = `${Object.values(
      err.keyValue
    )} field has to be unique!`;

    res.status(defaultError.statusCode).json({
      succes: defaultError.succes,
      message: defaultError.message,
    });
  }
  next(err);
};

export default errorMiddleware;
