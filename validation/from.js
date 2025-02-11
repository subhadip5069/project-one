const joi = require('joi');

const formSchema = joi.object({
    Name: joi.string().required(),
    Designation: joi.string().required(),
    Uid: joi.string().required(),
    Work: joi.string().required(),
    Area: joi.string().required(),
    Validity: joi.string().required(),
    photo: joi.string().required()
});

module.exports = formSchema;