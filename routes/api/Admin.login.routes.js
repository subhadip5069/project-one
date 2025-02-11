const express = require('express');

const router = express.Router();

const AdminController = require('../../controller/api/admin');

router.post('/signup',AdminController.signup);

router.post('/login',AdminController.login);

module.exports = router;
