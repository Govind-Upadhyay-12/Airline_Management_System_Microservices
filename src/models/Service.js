import mongoose from "mongoose";

const Service = mongoose.Schema({
  departureTime: {
    type: String,
    required: true,
  },
  arrivalTime: {
    type: String,
    required: true,
  },
  price:{
   type:Number,
   required:true
  },
   totalSeat:{
    type:Number,

   },
   remainingSeat:{
    type:Number,
   }

}, { timestamps: true });

const Service_Air = mongoose.model("Service", Service); // Corrected variable name

export default Service_Air;
