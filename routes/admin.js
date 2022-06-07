const express = require('express');
const router = express.Router();
const Admin = require("../admin/admin")

router.route("/login").post(Admin.Login)
router.route("/register").post(Admin.Register)
module.exports = router