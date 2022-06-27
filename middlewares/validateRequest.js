const createError = require("../errors");

const validateRequest = (schema, message) => {
  return (req, res, next) => {
    const { error } = schema.validate(req.body);
    if (error) {
      next(createError(400, message));
    }
    next();
  };
};

module.exports = {
  validateRequest,
};
