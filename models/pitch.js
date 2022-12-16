const mongoose = require('mongoose');
// const { stringify } = require("nodemon/lib/utils")
const pitchSchema = new mongoose.Schema({
    entrepreneur: {
        type:String,
        required : true
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
        type: Number,
        max : 100
    },
    offers : [{
            id: {
                type: mongoose.Schema.Types.ObjectId
            },
            investor: {
                type:String,
                required:true
            },
            amount : {
                type: Number
            },
            equity : {
                type: Number,
                max:100
            },
            comment : {
                type:String
            }
        }]
});
pitchSchema.set('timestamps',true);
const pmodel=mongoose.model("pitch",pitchSchema);
module.exports = pmodel;