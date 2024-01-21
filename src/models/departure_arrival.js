import mongoose from "mongoose";

const Departure_Arrival = mongoose.Schema({
    departure:{
        type:String,
        required:true,
    },
    arrival:{
    type:String,
    required:true,
    }
 
}, { timestamps: true });

const Travel_Departure = mongoose.model("travel", Departure_Arrival); // Corrected variable name

export default Travel_Departure;
