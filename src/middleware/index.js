const joi = require('../lib/joi');
const jwt = require('../lib/jwt');

function hasRole(...role) {
  const checkToken = async (req, res, next) => {
    const token = req.header('Authorization');
    if (!token) {
      return res.status(401).json({
        status: 'error',
        message: 'no token, authorization denied',
      });
    }
    try {
      const decoded = jwt.verify(token);
      if (!role.includes(decoded.user.role)) {
        return res.status(403).json({
          status: 'error',
          message: 'your role is not permitted access',
        });
      }
      req.user = decoded.user;
      next();
      return 'success';
    } catch (err) {
      return res.status(401).json({
        status: 'error',
        message: err.message,
      });
    }
  };
  return checkToken;
}

function validate(type, schema) {
  const checkBody = async (req, res, next) => {
    try {
      await joi(schema, type === 'body' ? req.body : req.query);
      next();
    } catch (err) {
      res.status(400).json({
        status: 'error',
        message: err.message,
      });
    }
  };
  return checkBody;
}

module.exports = {
  validate,
  hasRole,
};
