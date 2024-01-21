import NewAir from "../models/Airplane.js";
import Service_Air from "../models/Service.js";
export async function AddService(req, res) {
  try {
    const { departureTime, arrivalTime, price, totaSeat, remainingSeat } =
      req.body;
    const { id } = req.params;
    const newOne = await new Service_Air({
      departureTime,
      arrivalTime,
      price,
      totaSeat,
      remainingSeat,
    });
    await newOne.save();
    const new_One_id = await newOne._id;
    const find = await NewAir.findById(id);
    await find.services.push(new_One_id);
    await find.save();
    return res.status(200).send({ message: "services added to the db" });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ message: error });
  }
}
