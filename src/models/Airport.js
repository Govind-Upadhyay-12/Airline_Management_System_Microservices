import mongoose from "mongoose";

const AirPortSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    code: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    cityId: {
      type: String,
      required: true,
    },
    TotalAir: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "NewAirplane",
      },
    ],
  },
  { timestamps: true }
);

const AirPortModel = mongoose.model("New_Airport", AirPortSchema); // Corrected variable name

export default AirPortModel;
