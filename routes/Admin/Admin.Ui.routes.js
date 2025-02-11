const express = require("express")

const router = express.Router();

const AdminUiController = require('../../controller/admin/admin.ui.controller');
const authMiddleware = require("../../middleware/auth.middleware");

router.get('/home',authMiddleware,AdminUiController.index);
router.get('/',AdminUiController.login);
router.get('/registration',authMiddleware,AdminUiController.registration);
router.get('/update/:id',authMiddleware,AdminUiController.update);
router.get('/allCandidates',authMiddleware,AdminUiController.Allcandidates);
router.get('/search',authMiddleware,AdminUiController.searchCandidate);


module.exports = router;