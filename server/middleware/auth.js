const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
  try {
    // Get token from headers
    const token = req.header("Authorization");

    // Check if token exists
    if (!token) {
      return res.status(401).json({
        message: "No token, authorization denied",
      });
    }

    // Verify token
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET
    );

    // Attach user data
    req.user = decoded;

    next();

  } catch (err) {
    res.status(401).json({
      message: "Token is not valid",
    });
  }
};

module.exports = auth;