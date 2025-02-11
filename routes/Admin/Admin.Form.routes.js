const express = require("express"); 

const router = express.Router();

const AdminFormController = require('../../controller/admin/admin.form');
const upload = require("../../multer/user.multer");
const authMiddleware = require("../../middleware/auth.middleware");

router.post('/registrationform',upload.single("photo"),AdminFormController.GnaratedForm);
router.post('/update/:id',upload.single("photo"),AdminFormController.UpdateCandidateForm);
router.get('/delete/:id', authMiddleware,AdminFormController.deleteCandidate);

module.exports = router;