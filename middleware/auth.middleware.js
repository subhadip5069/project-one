const jwt = require('jsonwebtoken');


const authMiddleware = (req, res, next) => {
  const token = req.cookies.token; // Assuming you're storing the token in cookies

  if (!token) {
    return res.redirect('/admin/'); // Redirect to the login page if no token
  }

  try {
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    req.user = decoded; // Attach user info to the request object
    res.locals.user = decoded; // Attach it to res.locals for global access in EJS
    next();
  } catch (error) {
    return res.redirect('/admin/'); // Redirect if token is invalid or expired
  }
};

module.exports = authMiddleware;
