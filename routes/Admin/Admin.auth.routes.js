const express = require("express")

const router = express.Router();

const AdminAuthController = require('../../controller/admin/admin.auth');


router.post('/login',AdminAuthController.login);
router.get('/logout',AdminAuthController.logout);

module.exports = router