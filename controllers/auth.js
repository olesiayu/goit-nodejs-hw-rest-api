const authService = require("../services/auth.service");

const registerUser = async (req, res, next) => {
  try {
    const user = await authService.registerUser(req.body);
    res.json({
      email: user.email,
      subscription: user.subscription,
      id: user._id,
    });
  } catch (e) {
    next(e);
  }
};

//ПЕРЕВІРИТИ ЮЗЕРА ЧИ ПОКАЗУЄ
const loginUser = async (req, res, next) => {
  try {
    const { token, email, subscription } = await authService.loginUser(
      req.body
    );
    res.json({ token, user: { email, subscription } });
  } catch (e) {
    next(e);
  }
};

module.exports = {
  registerUser,
  loginUser,
};
