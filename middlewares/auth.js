const createError = require("../errors");
const { authenticateUser } = require("../services/auth.service");

const auth = async (req, res, next) => {
  const { authorization = "" } = req.headers;
  const [bearer, token] = authorization.split(" ");

  if (bearer !== "Bearer" || !token) {
    next(createError(401, "Not authorized"));
  }

  const user = await authenticateUser(token);
  if (!user || !user.token) {
    next(createError(401, "Not authorized"));
  }
  req.user = user;

  next();
};

// const author = (subscription) => {
//   return (req, res, next) => {
//     if (req.user.subscription !== subscription) {
//       next({ status: 403, message: "Forbidden" });
//     }
//     next();
//   };
// };

module.exports = { auth };
