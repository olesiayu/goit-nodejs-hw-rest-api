const createError = require("../errors");

const validateRequest = (schema) => {
  return (req, res, next) => {
    const { error } = schema.validate(req.body);
    if (error) {
      next(createError(400, "Ошибка от Joi или другой библиотеки валидации"));
    }
    next();
  };
};

module.exports = {
  validateRequest,
};
