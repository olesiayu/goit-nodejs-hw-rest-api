const express = require("express");
const router = express.Router();
const { validateRequest } = require("../../middlewares/validateRequest");
const {
  registerUser,
  loginUser,
  logoutUser,
  currentUser,
} = require("../../controllers/auth");
const { schemaRegister, schemaLogin } = require("../../models/user");
const { auth } = require("../../middlewares/auth");

router.post("/signup", validateRequest(schemaRegister), registerUser);
router.post("/login", validateRequest(schemaLogin), loginUser);
router.post("/logout", auth, logoutUser);
router.get("/current", auth, currentUser);
module.exports = router;
