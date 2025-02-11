const express = require('express');

const router = express.Router();

const UserController = require('../../controller/user/user.uiget.form.controller');

router.get('/',UserController.userGetForm);
router.get('/scearch',UserController.searchCandidate);

module.exports = router;
