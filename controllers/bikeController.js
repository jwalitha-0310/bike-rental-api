const Bike=require("../models/Bike");

exports.getAvailableBikes=async(req,res,next)=>{
    try{
        const bikes=await Bike.find({
            available:true
        });
        res.status(200).json(bikes);
    }catch(err){
        next(err);
    }
}

exports.getBikes=async(req,res,next)=>{
    try{
        const {type,sort}=req.query;
        let query=Bike.find();
        if(type){
            query=query.where("type").equals(type);
        }
        if (sort==="rentPerDay") {
            query=query.sort({rentPerDay:1});
        }
        const bikes=await query;
        res.status(200).json(bikes);
    }catch(err){
        next(err);
    }
};

exports.getBike=async(req,res,next)=>{
    try{
        const id=req.params.id;
        const bike=await Bike.findById(id);

        if(!bike){
            return res.status(404).json({
                message:"Bike not found"
            });
        }res.status(200).json(bike);
    }catch(err){
            next(err);
     }
};


exports.createBike=async(req,res,next)=>{
    try{
        const {bikeName,rentPerDay,type,available,bookedOn}=req.body;
        if(!bikeName){
            return res.status(400).json({
                message:"Bike name is required"
            });
        }
        if(!rentPerDay){
            return res.status(400).json({
                message:"Rent per day is required"
            });
        }
        if(!type){
            return res.status(400).json({
                message:"Bike type is required"
            });
        }
        
        const bike=await Bike.create({bikeName,rentPerDay,type,available,bookedOn});
        res.status(201).json(bike);
    }catch(err){
        next(err);
    }
};

exports.updateBike=async(req,res,next)=>{
    try{
        const id=req.params.id;
        const bike=await Bike.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                returnDocument:"after",runValidators:true
            });
            if(!bike){
               return res.status(404).json({
                    message: "Bike not found"
                });
            }
        res.status(200).json(bike);
    }catch(err){
        next(err);
    }
}

exports.deleteBike=async(req,res,next)=>{
    try {
        const id=req.params.id;
        const bike=await Bike.findByIdAndDelete(id);
        if (!bike){
            return res.status(404).json({
                message:"Bike not found"
            });
        }
        res.status(200).json({
            message:"Bike deleted successfully"
        });
    } catch (err) {
        next(err);
    }
};