const mongoose = require('mongoose');
// const offer = require('./offer')
// const { stringify } = require("nodemon/lib/utils")
const pitchSchema = new mongoose.Schema({
    // id: {
    //     type : mongoose.Schema.Types.ObjectId
    //     // required : true
    // },
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
            // id: {
            //     type: mongoose.Schema.Types.ObjectId
            // },
            // investor: {
            //     type:String,
            //     required:true
            // },
            // amount : {
            //     type: Number
            // },
            // equity : {
            //     type: Number,
            //     max:100
            // },
            // comment : {
            //     type:String
            // }
        }],
},
{
    versionKey:false,timestamps:true
});
// pitchSchema.set('timestamps',true);
const pmodel=mongoose.model("pitch",pitchSchema);
module.exports = pmodel;