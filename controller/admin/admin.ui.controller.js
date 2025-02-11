const formSchema = require("../../model/formSchema");
const formRepository = require("../../repository/form.repository");



class AdminUiController {
    index = async ( req,res) =>{

        const user = req.user;
        const candidate = await formRepository.getForm();

        res.render("Admin/home",{
            title:"index page"
            ,candidate
            ,user

        })
      
    }
    Allcandidates = async (req,res) => {
        try {
            const user = req.user;
        const candidates = await formRepository.getForm();
        res.render("Admin/allCandidates",{
            title:"All candidates"
            ,candidates,
            user
        })}
        catch (error) {
            return res.redirect('/admin/');
        }
    }
    login = async (req,res) => {
        res.render("Admin/index",{
            title:"login page"
        })
    }
    registration = async (req,res) => {
        const user = req.user;
        res.render("Admin/registration",{
            title:"registration page",
            user
        })
    }
    update = async (req,res) => {
        const user = req.user;
        const {id} = req.params;
        const candidate = await formRepository.getFormById(id);
        res.render("Admin/update",{
            title:"update page",
            candidate,
            user
        })
    }
    searchCandidate = async (req, res) => {
        try {
            const user = req.user;
          const uid = req.query.uid;
          if (!uid) {
            return res.render('Admin/index', { candidate: undefined });
          }
      
          const candidate = await formSchema.findOne({ Uid: uid });
          res.render('Admin/home', { candidate ,user });
        } catch (error) {
          console.error(error);
          res.status(500).send('An error occurred while searching for the candidate.');
        }
      };
}

module.exports = new AdminUiController;