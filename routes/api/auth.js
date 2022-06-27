const express = require("express");
const router = express.Router();
const { validateRequest } = require("../../middlewares/validateRequest");
const { registerUser, loginUser } = require("../../controllers/auth");
const { schemaRegister, schemaLogin } = require("../../models/user");

router.post("/signup", validateRequest(schemaRegister), registerUser);
router.post("/login", validateRequest(schemaLogin), loginUser);

module.exports = router;
