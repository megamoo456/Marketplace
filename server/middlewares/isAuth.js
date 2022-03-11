const User = require('mongoose').model('User');
const roles = require("../models/Roles");





module.exports = function (roles) {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ message: "You should sign in first!" });
    }

    // Get the last part from a authorization header string like "bearer token-value"
    const token = req.headers.authorization.split(" ")[1];

    // Decode the token using a secret key-phrase
    return jwt.verify(token, config.jwtSecret, (err, decoded) => {
      // 401 not unauthorized
      if (err) return res.status(401).end();

      const userId = decoded.sub;

      // Check if user exists
      return User.findById(userId, (err2, user) => {
        if (err2 || !user) return res.status(401).end();

        if (roles) {
          if (roles.indexOf(user.role) > -1) return next();
          else return res.status(401).end();
        }

        return next();
      });
    });
  };
};
