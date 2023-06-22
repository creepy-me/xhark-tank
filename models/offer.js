const mongoose=require("mongoose");
const offerSchema = new mongoose.Schema({
    investor: {
        type:String,
        required:true
    },
    amount : {
        type: Number,
        required:true
    },
    equity : {
        type: Number,
        min:0,
        max:100,
        required:true
    },
    comment : {
        type:String
    },
},
{
    versionKey:false,timestamps:true
});

module.exports=mongoose.model("offer",offerSchema);