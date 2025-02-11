const express = require('express');
const router = express.Router();
const FormController = require('../../controller/api/Form.controler');
const upload  = require('../../multer/user.multer');

router.post('/createForm',upload.single("photo"),FormController.CreateForm);
router.get('/getAllCandidates',FormController.GetAllCandidates);
router.get('/candidate/:uid', FormController.getCandidateByUid);

module.exports = router;