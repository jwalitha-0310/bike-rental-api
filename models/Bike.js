const mongoose=require("mongoose");

const bikeSchema=new mongoose.Schema({
    bikeName:{
        type:String,
        required:true,
        trim:true
    },
    rentPerDay:{
        type:Number,
        required:true,
        min:50,
        max:5000
    },
    type:{
        type:String,
        required:true,
        enum: {
            values: ['scooter', 'bike', 'cycle'],
            message: '{VALUE} is not a valid vehicle type'
            }
    },
    available:{
        type:Boolean,
        default:true
    },
    bookedOn:{
        type:Date,
    }
    
},{
    timestamps:true
});

module.exports=mongoose.model("Bike",bikeSchema);