const mongoose=require("mongoose");
// const { stringify } = require("nodemon/lib/utils");
const offerSchema = new mongoose.Schema({
    investor: {
        type:String
    },
    amount : {
        type: Number
    },
    equity : {
        type: Number
    },
    comment : {
        type:String
    }
});

module.exports=mongoose.model("offer",offerSchema);