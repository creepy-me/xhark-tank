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
//create a pitch
app.post("/pitches",async(req,res)=>{
    try{
        const {entrepreneur,pitchTitle,pitchIdea,askAmount,equity} = req.body;
        const newPitch = await Pitch.create({
            entrepreneur:entrepreneur,
            pitchTitle:pitchTitle,
            pitchIdea:pitchIdea,
            askAmount:askAmount,
            equity:equity
        });
        // const newPitch = await new Pitch(req.body);
        await newPitch.save();
        res.status(201).json({id : newPitch._id})
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
        // const saveOffer = await newOffer.save();
        await pitch.updateOne({$push:{offers: newOffer}});
        res.status(201).json({id:newOffer._id});
        }
    }catch(err){
        res.status(400).json();
    }
});

//get all pitches in reverse  chronological order
app.get("/pitches",async(req,res)=>{
    try{
        // const getall = await Pitch.find({ _id: { $in: ids }});
        const sort = { "createdAt": -1 };
        const pitch = await Pitch.find().sort(sort);//db.products.find().sort({"created_at": 1})
        res.status(200).json(pitch);
        // let items = await User.find({ _id: { $in: ids }})
    }catch(err){
        res.status(400).json();
    }
});


//get pitch by id
app.get("/pitches/:id",async(req,res)=>{
    try{
        const pitch = await Pitch.findById(req.params.id);
        var rs={
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
