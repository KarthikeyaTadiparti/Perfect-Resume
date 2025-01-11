const express = require("express");
const { signupValidation, loginValidation } = require("../middleware/authValidation");
const { signup, login } = require("../controllers/authController");
const router = express.Router();


router.post("/login", loginValidation, login);
router.post("/signup", signupValidation, signup);

module.exports = router;
