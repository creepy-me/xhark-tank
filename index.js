const express = require("express")
const app = express()
const port = process.env.port || 8081;
const mongoose=require("mongoose");
mongoose.connect('mongodb://localhost:27017/xhark-tank', {useNewUrlParser: true},()=>{
    console.log("connected!!");
});
const Pitch = require("./models/pitch");
const Offer = require("./models/offer");
app.use(express.json());
mongoose.set('toJSON', {
    virtuals: true,
    transform: (doc, converted) => {
      delete converted._id;
      delete converted.__v;
      delete converted.createdAt;
      delete converted.updatedAt;
    }
  });
//create a pitch
app.post("/pitches",async(req,res)=>{
    try{
        const  newPitch = new Pitch(req.body);
            await newPitch.save();
            res.status(201).json({id : newPitch._id});
    }catch(err){
        res.status(400).json();
    }
});


//create counter offer
app.post("/pitches/:id/makeoffer",async(req,res)=>{
    try{
        const pitch = await Pitch.findById(req.params.id);
        if(!pitch)
            res.status(404).json();
        else{
        const newOffer = new Offer(req.body);
        await newOffer.save();
            await Pitch.findByIdAndUpdate(req.params.id,{"$push":{"offers": newOffer}});
            res.status(201).json({id:newOffer.id});
        }
    }catch(err){
        res.status(400).json();
    }
});

//get all pitches in reverse  chronological order
app.get("/pitches",async(req,res)=>{
    try{
        const sort = { "createdAt": -1 };
        const pitches = await Pitch.find().sort(sort).populate('offers',{id:1,investor:1,amount:1,equity:1,comment:1});
        res.status(200).json(pitches);
    }catch(err){
        res.status(400).json();
    }
});


//get pitch by id
app.get("/pitches/:id",async(req,res)=>{
    try{
        const pitch = await Pitch.findById(req.params.id).populate('offers',{id:1,investor:1,amount:1,equity:1,comment:1});
        if(!pitch)
            res.status(404).json();
        const rs={
            id:pitch._id,
            entrepreneur:pitch.entrepreneur,
            pitchTitle:pitch.pitchTitle,
            pitchIdea:pitch.pitchIdea,
            askAmount:pitch.askAmount,
            equity:pitch.equity,
            offers:pitch.offers
        };
        res.status(200).json(rs);
    }catch(err){
        res.status(404).json();
    }
});

app.listen(port,()=>{
    console.log("Server is up on port " + port);
})
