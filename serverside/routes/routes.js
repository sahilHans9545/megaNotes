const { Router } = require("express");
const {
  registerUser,
  loginUser,
  getUser,
} = require("../controllers/authentication");
const { Auth } = require("../middlewares/auth");

const router = Router();

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/getUser").get(Auth, getUser);

module.exports = router;
