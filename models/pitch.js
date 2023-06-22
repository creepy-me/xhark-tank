const mongoose = require('mongoose');
const pitchSchema = new mongoose.Schema({

    entrepreneur: {
        type:String,
        required : true
        // required:true
    },

    pitchTitle : {
        type:String,
        required:true
    },
    
    pitchIdea : {
        type:String,
        required:true
    },
    
    askAmount : {
        type: Number,
        required:true
    },
    
    equity : {
        type: Number,
        max : 100,
        min:0,
        required:true
    },
    offers : [{
            type:mongoose.Schema.Types.ObjectId,
            ref : 'offer'
        }],
},
{
    versionKey:false,timestamps:true
});
// pitchSchema.set('timestamps',true);
const pmodel=mongoose.model("pitch",pitchSchema);
module.exports = pmodel;