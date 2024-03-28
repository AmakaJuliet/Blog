const jwt = require("jsonwebtoken");

function verifyAuth(req, res, next) {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.json({
        message: "access_token missing",
        success: false,
      });
    }

    const token = authHeader.split(" ")[1];

    const isValidAccessToken = jwt.verify(token, process.env.JWT_SECRET);

    if (!isValidAccessToken) {
      return res.json({
        message: "invalid or expired access_token",
        success: false,
      });
    }

    req.user = isValidAccessToken;
    next();
  } catch (error) {
    if (error instanceof jwt.JsonWebTokenError) {
      return res.status(401).json({
        message: "Invalid access_token",
        success: false,
        error: error.message,
      });
    } else if (error instanceof jwt.NotBeforeError) {
      return res.status(401).json({
        message: "Token not yet valid",
        success: false,
        error: error.message,
      });
    } else if (error instanceof jwt.TokenExpiredError) {
      return res.status(401).json({
        message: "Token expired",
        success: false,
        error: error.message,
      });
    } else {
      return res.status(500).json({
        message: "Internal Server Error",
        success: false,
        error: error.message,
      });
    }
  }
}

module.exports = verifyAuth;
