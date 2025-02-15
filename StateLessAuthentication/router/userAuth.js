const express = require("express");
const {HandleSignup, HandleLogin} = require("../constroller/userAuth")

const router = express.Router();

router.post("/signup",HandleSignup);
router.post("/signin",HandleLogin)


module.exports = router