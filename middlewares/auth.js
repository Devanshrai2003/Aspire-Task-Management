const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET;

function authenticator(req, res, next) {
  const token = req.headers.token;

  if (!token) {
    return res.status(403).json({
      message: "Token not provided, you are not signed in",
    });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);

    if (decoded) {
      req.userId = decoded.id;
      next();
    }
  } catch (error) {
    return res.status(403).json({
      message: "Invalid token",
    });
  }
}

module.exports = {
  authenticator: authenticator,
};
