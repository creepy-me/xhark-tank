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
        // const {entrepreneur,pitchTitle,pitchIdea,askAmount,equity} = req.body;
        // const newPitch = await Pitch.create({
        //     entrepreneur:entrepreneur,
        //     pitchTitle:pitchTitle,
        //     pitchIdea:pitchIdea,
        //     askAmount:askAmount,
        //     equity:equity
        // });
        const  newPitch = new Pitch(req.body);
        // if(newPitch.find({entrepreneur:{$exists:true},pitchTitle:{$exists:true},pitchIdea:{$exists:true},askAmount:{$exists:true},equity:{$exists:true}})!=NULL)
        // {
            await newPitch.save();
            res.status(201).json({id : newPitch._id});
        // }
        // else
        //     res.status(400).json();
        // const newPitch = await new Pitch(req.body);

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
        // var rs={
        //     investor:req.params.investor,
        //     amount:req.params.amount,
        //     equity:req.params.equity,
        //     comment:pitch.comment
        // };
        // if(newOffer.find({investor:{$exists:true}},{amount:{$exists:true}},{equity:{$exists:true}},{comment:{$exists:true}}))
        // {
            await Pitch.findByIdAndUpdate(req.params.id,{"$push":{"offers": newOffer}});
            res.status(201).json({id:newOffer.id});
        // }
        // else
        // {
        //     res.status(400).json();
        // }
        // const saveOffer = await newOffer.save();
        
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
        const pitches = await Pitch.find().sort(sort).populate('offers');//db.products.find().sort({"created_at": 1})
        // pitch.forEach(ptch => res.status(200).json(ptch));
        // pitches = pitches.map(function(pitch) {
        //     pitch.id  = pitch._id,
        //     pitch.entrepreneur = pitch.entrepreneur,
        //     pitch.pitchTitle= pitch.pitchTitle,
        //     pitch.pitchIdea=pitch.pitchIdea,
        //     pitch.askAmount=pitch.askAmount,
        //     pitch.equity=pitch.equity,
        //     pitch.offers=pitch.offers
        // })
        res.status(200).json(pitches);
        // let items = await User.find({ _id: { $in: ids }})
    }catch(err){
        res.status(400).json();
    }
});


//get pitch by id
app.get("/pitches/:id",async(req,res)=>{
    try{
        const pitch = await Pitch.findById(req.params.id).populate('offers');
        if(!pitch)
            res.status(404).json();
        // pitch.populate("offers")
        // .then(
        //     pitch=>{
        //         res.status(200).json(pitch);
        //     }
        // );
        const rs={
            id:pitch._id,
            entrepreneur:pitch.entrepreneur,
            pitchTitle:pitch.pitchTitle,
            pitchIdea:pitch.pitchIdea,
            askAmount:pitch.askAmount,
            equity:pitch.equity,
            offers:pitch.offers
        };
        // ,{id:1,entrepreneur:1,pitchTitle:1,pitchIdea:1,askAmount:1,equity:1,offers:1}
        res.status(200).json(rs);
    }catch(err){
        res.status(404).json();
    }
});

app.listen(port,()=>{
    console.log("Server is up on port " + port);
})
