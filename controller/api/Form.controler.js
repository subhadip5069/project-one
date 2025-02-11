const path = require('path');

const fs = require('fs');
const formRepository = require('../../repository/form.repository');

class FormController {
    CreateForm = async (req, res) => {
        try {
          const { Name, Designation, Uid, Work, Area, ValidityStart, ValidityEnd } = req.body;
          const data = { Name, Designation, Uid, Work, Area, ValidityStart, ValidityEnd };
          const file = req.file;
      
          // Check if Uid already exists
          const existingForm = await formRepository.findByUid(Uid); // Assume findByUid is a method in your repository
          if (existingForm) {
            return res.status(400).json({ message: 'Form with this Uid already exists' });
          }
      
          // Create form if Uid does not exist
          const formCreated = await formRepository.CreateForm({
            ...data,
            photo: file ? file.filename : null,  // Handle the case if file is not uploaded
          });
      
          return res.status(200).json({ message: 'Form created successfully', formCreated });
        } catch (error) {
          console.error(error);
          return res.status(500).json({ message: 'Internal server error' });
        }
      };
      
    GetAllCandidates = async(req,res) => {
        try {
            const candidates = await formRepository.getForm();
            return res.status(200).json({message: 'All Candidates',candidates});
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
}

module.exports = new FormController();