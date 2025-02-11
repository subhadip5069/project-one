const path = require('path');

const fs = require('fs');
const formRepository = require('../../repository/form.repository');
const sendAdminNotificationEmail = require('../../mailer/admin/admin.mailer');

class FormController {
    GnaratedForm = async (req, res) => {
        try {
          const { Name, Designation, Uid, Work, Area, ValidityStart, ValidityEnd } = req.body;
          const data = { Name, Designation, Uid, Work, Area, ValidityStart, ValidityEnd };
          const file = req.file;
      
          // Check if Uid already exists
          const existingForm = await formRepository.findByUid(Uid); // Assume findByUid is a method in your repository
          if (existingForm) {
            return res.redirect('/admin/allCandidates');
          }
          console.log(existingForm);
      
          // Create form if Uid does not exist
          const formCreated = await formRepository.CreateForm({
            ...data,
            photo: file ? file.filename : null,  // Handle the case if file is not uploaded
          });

          console.log(formCreated);

          if (formCreated) {
            return res.redirect('/admin/allCandidates');
          }else{
            res.status(400).json({ message: 'Form creation failed' });
          }
      
          return res.redirect('/admin/allCandidates');
        } catch (error) {
          console.error(error);
          return res.redirect('/admin/registration');

        }
      };
      
    GetAllCandidates = async(req,res) => {
        try {
            const candidates = await formRepository.getForm();
            return res.redirect('/admin/');
        } catch (error) {
            console.log(error);
        }
    }

     getCandidateByUid =async(req, res) =>{
        const { uid } = req.params;
        const { page = 1, limit = 10 } = req.query;  // Pagination parameters
    
        try {
          const result = await formRepository.findByUidWithPagination(uid, parseInt(page), parseInt(limit));
          if (result.data.length === 0) {
            return res.status(404).json({ message: 'Candidate not found' });
          }
          res.status(200).json(result);
        } catch (error) {
          res.status(500).json({ message: 'Error retrieving candidate', error: error.message });
        }
    }

    UpdateCandidateForm = async (req, res) => {
      try {
        const { id } = req.params;
        const { Name, Designation, Uid, Work, Area, ValidityStart, ValidityEnd } = req.body;
        const data = { Name, Designation, Uid, Work, Area, ValidityStart, ValidityEnd };
        const file = req.file; // New uploaded file
    
        // Find the existing form by ID
        const existingForm = await formRepository.getFormById(id);
    
        // Delete the old image if a new image is uploaded
        if (file) {
          const oldImagePath = path.join(__dirname, '../uploads/', existingForm.photo); // Adjust the path as needed
          if (fs.existsSync(oldImagePath)) {
            fs.unlinkSync(oldImagePath); // Delete the old image
          }
        }
    
        // Update the form with new data and new image (if uploaded)
        const updatedForm = await formRepository.updateForm(id, {
          ...data,
          photo: file ? file.filename : existingForm.photo, // Use new image if available; otherwise, keep the old one
        });
    
        if (updatedForm) {
          console.log('Form updated successfully:', updatedForm);
    
          // Send email to admin after successful update
          await sendAdminNotificationEmail(updatedForm);
    
          return res.redirect('/admin/allCandidates');
        } else {
          return res.status(400).json({ message: 'Form update failed' });
        }
        
      } catch (error) {
        console.error(error);
        return res.redirect('/admin/registration');
      }
    };

    deleteCandidate = async (req, res) => {
      try {
        const { id } = req.params;
        const deletedForm = await formRepository.deleteForm(id);
        // with delete image
        const oldImagePath = path.join(__dirname, '../uploads/', deletedForm.photo); // Adjust the path as needed
        if (fs.existsSync(oldImagePath)) {
          fs.unlinkSync(oldImagePath); // Delete the old image
        }
        if (deletedForm) {
          return res.redirect('/admin/allCandidates');
        } else {
          return res.status(400).json({ message: 'Form deletion failed' });
        }
      } catch (error) {
        console.error(error);
        return res.redirect('/admin/registration');
      }
    };
    
}

module.exports = new FormController();