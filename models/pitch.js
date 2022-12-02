const mongoose = require('mongoose');
// const { stringify } = require("nodemon/lib/utils")
const pitchSchema = new mongoose.Schema({
    entrepreneur: {
        type:String
        // required:true
    },

    pitchTitle : {
        type:String
    },
    
    pitchIdea : {
        type:String
    },
    
    askAmount : {
        type: Number
    },
    
    equity : {
        type: Number
    },
    offers : {
        type: Array,
        default: []
    }
});
pitchSchema.set('timestamps',true);
const pmodel=mongoose.model("pitch",pitchSchema);
module.exports = pmodel;