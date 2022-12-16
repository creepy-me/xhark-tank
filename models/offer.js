const mongoose=require("mongoose");
// const { stringify } = require("nodemon/lib/utils");
const offerSchema = new mongoose.Schema({
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
});

module.exports=mongoose.model("offer",offerSchema);