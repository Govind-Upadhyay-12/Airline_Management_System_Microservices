import AirPort from "../models/Airport.js";
import Airplane from "../models/Airplane.js";
import departure_arrival from "../models/departure_arrival.js";

export async function GetQuery(req, res) {
  try {
    const { cityId } = req.body;
    const Find_Airport = await AirPort.find({
      cityId: { $regex: new RegExp(cityId, "i") },
    });
    if (!Find_Airport) {
      return res.status(400).send({ message: "No Airport is here" });
    }
    return res.status(200).send(Find_Airport);
  } catch (error) {
    console.log(error);
    return res.status(500).send({ message: error });
  }
}

export async function CreateTime(req, res) {
  try {
    const { id } = req.params;
    const { departure, arrival } = req.body;
    const find_flight = await Airplane.findById(id);
    const create_Time = await new departure_arrival({
      departure,
      arrival,
    });
    await create_Time.save();
    const time_id = create_Time._id;
    const insert_data = await find_flight.departure_arrival_details.push(
      time_id
    );
    await find_flight.save();
    return res.status(200).send({ message: "Time created" });
  } catch (error) {
    return res.status(500).send({ message: error });
  }
}

export async function Destination(req, res) {
  const { id } = req.params;
  const { departure, arrival } = req.body;

  try {
    const airDetails = await Airplane.findById(id).populate(
      "departure_arrival_details"
    );

    const find = airDetails.departure_arrival_details;
    const result = find.filter(
      (plane) => plane.departure == departure && plane.arrival == arrival
    );
    console.log(result);
    return res.status(200).json({
      airDetails,result
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}

