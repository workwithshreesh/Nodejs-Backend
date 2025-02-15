const express = require("express");
const {GetAllUser, DeleteBulkUser} = require("../controller/admin");

const router = express.Router();

router.get("/get-all-user",GetAllUser);
router.delete("/delete-bulk-user", DeleteBulkUser)

module.exports = router;