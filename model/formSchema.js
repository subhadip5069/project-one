const mongoose = require('mongoose');

const formSchema = new mongoose.Schema({
    Name:{
        type: String,
        required: true
    },
    Designation:{
        type: String,
        required: true
    },
    Uid:{
        type: String,
        required: true
    },
    Work:{
        type: String,
        required: true
    },
    Area:{
        type: String,
        required: true
    },
    ValidityStart:{
        type: String,
        required: true
    },
    ValidityEnd:{
        type: String,
        required: true
    },
    photo:{
        type: String,
        required: true
    },
    Email:{
        type: String,
       
    },
},{
    timestamps: true,
    versionKey: false
});

module.exports = mongoose.model('Form', formSchema);