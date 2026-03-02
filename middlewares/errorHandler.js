const logger = require("../config/logger");

const errorHandler = (err, req, res, next) => {

  console.error("SERVER ERROR:", err);

  res.status(err.status || 500).json({
    success: false,
    message: err.message || "Internal Server Error"
  });
};

module.exports = errorHandler;