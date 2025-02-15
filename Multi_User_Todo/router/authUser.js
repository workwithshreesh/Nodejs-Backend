const express = require("express");
const { HandleSignin, HandleSingup } = require("../controller/userAuth");
const router = express.Router();

router.post("/singup",HandleSingup)
router.post("/singin",HandleSignin)

module.exports = router