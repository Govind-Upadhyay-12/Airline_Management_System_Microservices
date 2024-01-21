import mongoose from "mongoose";
const NewAirplane = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  modelNo: {
    type: String,
    required: true,
  },
  capacity: {
    type: Number,
    required: true,
  },
  user:[
    {
     type:mongoose.Schema.ObjectId,
     ref:"User_Schema"
    } 
  ],
  services:[
    {
      type:mongoose.Schema.ObjectId,
      ref:"Services",
    }
  ],
  departure_arrival_details:[
    {
      type:mongoose.Schema.ObjectId,
      ref:"travel"
    }
  ]
},{timestamps:true});
const NewAir = mongoose.model("NewAirplane", NewAirplane);
export default NewAir;
