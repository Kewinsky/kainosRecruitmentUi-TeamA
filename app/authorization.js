const jwt = require('jsonwebtoken')

const authorization = (req, res, next) => {
  const token = req.cookies.access_token;
  if (!token) {
    return res.redirect("login");
  }
  try {
      const data = jwt.verify(token, process.env.JWT_SECRET);
      req.email = data.email;
      req.password = data.password;
      return next();
  } catch {
      return res.redirect("authorization");
  }
};

module.exports = authorization;