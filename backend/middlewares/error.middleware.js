const errorMiddleware = (err, req, res, next) => {
  console.error(err); // Log the error to the console
  try {
    let error = { ...err };

    error.statusCode = err.statusCode || 500;
    error.message = err.message || "Server Error";

    //  Mongoose bad ObjectId
    if (err.name === "CastError") {
      const message = "Resource not found";
      error = new Error(message);
      error.statusCode = 404;
    }

    // Mongoose duplicate key
    if (err.code === 11000) {
      const message = "Duplicate field value entered";
      error = new Error(message);
      error.statusCode = 400;
    }

    //Mongoose validation error
    if (err.name === "ValidationError") {
      const message = Object.values(err.errors).map((val) => val.message);
      error = new Error(message.join(","));
      error.statusCode = 400;
    }

    res.status(error.statusCode).json({ success: false, error: error.message });
  } catch (error) {
    next(error);
  }
};

export default errorMiddleware;
