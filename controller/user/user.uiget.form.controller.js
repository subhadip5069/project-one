const formSchema = require("../../model/formSchema");
const formRepository = require("../../repository/form.repository");



class UiGetFormController {
    userGetForm = async (req, res) => {
        try {
            const user = req.user;
            const candidate = await formRepository.findByUid();
            res.render("Ui/index", {
                title: "index page",
                candidate,
                user,
            });
        } catch (error) {
            return res.redirect("/user/");
        }
    };
     searchCandidate = async (req, res) => {
            try {
                const user = req.user;
              const uid = req.query.uid;
              if (!uid) {
                return res.render('Ui/index', { candidate: undefined });
              }
          
              const candidate = await formSchema.findOne({ Uid: uid });
              res.render('Ui/index', { candidate ,user });
            } catch (error) {
              console.error(error);
              res.status(500).send('An error occurred while searching for the candidate.');
            }
          };
}
module.exports = new UiGetFormController();