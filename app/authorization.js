const jwt = require('jsonwebtoken')

const authorization = (req, res, next) => {
  const token = req.cookies.access_token;
  if (!token) {
      return res.sendStatus(403);
  }
  try {
      const data = jwt.verify(token, process.env.JWT_SECRET);
      req.email = data.email;
      req.password = data.password;
      return next();
  } catch {
      return res.sendStatus(403);
  }
};

module.exports = authorization;