import AirPort from "../models/Airport.js";
import NewAir from "../models/Airplane.js";
import client from "../redisClient/redisClient.js";
export async function CreateAirport(req, res) {
  try {
    const { name, code, address, cityId } = req.body;

    const existingAirport = await AirPort.findOne({ code });
    if (existingAirport) {
      return res
        .status(400)
        .send({ message: "Airport with the given code already exists" });
    }

    const newAirport = new AirPort({
      name,
      code,
      address,
      cityId,
    });

    await newAirport.save();

    return res
      .status(201)
      .send({ message: "Airport created", airport: newAirport });
  } catch (error) {
    console.error(error);

    if (error.name === "ValidationError") {
      return res
        .status(400)
        .send({ message: "Validation error", error: error.errors });
    }

    return res
      .status(500)
      .send({ message: "Internal Server Error", error: error.message });
  }
}
export async function GetAirport(req, res) {
  try {
    const All_Airport = await AirPort.find({});
    return res.status(200).send(All_Airport);
  } catch (error) {
    console.log(error);
    return res.status(500).send({ message: error });
  }
}
export async function GetSingle(req, res) {
  try {
    let GetAir;
    const { id } = req.params;
    const cachedData=await client.get(`air-${id}`);
    if(cachedData){
      return res.status(200).json(cachedData);
    }
     GetAir = await AirPort.findById(id);
    
    if (!GetAir) {
      return res.status(400).send({ message: "there is no airline" });
    }
    await client.set(`air-${id}`,GetAir);
    return res.status(200).json(GetAir);
  } catch (error) {
    console.log(error);
    return res.status(500).send({ message: error });
  }
}
export async function CreateAirplaneNew(req, res) {
  const { id } = req.params;
  console.log(id);

  try {
    const { name, modelNo, capacity } = req.body;

    const createNew = new NewAir({
      name,
      modelNo,
      capacity,
    });

    await createNew.save();
    console.log("Airplane created");

    const newId = createNew._id;

    const airport = await AirPort.findById(id);

    if (!airport) {
      return res.status(404).send({ message: "Airport not found" });
    }

    airport.TotalAir.push(newId);
    await airport.save();

    console.log("Airport entry updated");

    return res
      .status(200)
      .send({ message: "Airplane and Airport entry created successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).send({ message: error });
  }
}
export async function GetAll(req, res) { 
  try {
    const { id } = req.params;
    console.log(id);
    console.log("aara h");

    const airport = await AirPort.findById(id).populate("TotalAir");

    if (!airport) {
      return res.status(404).send({ message: 'Airport not found' });
    }

    return res.status(200).send(airport);
  } catch (error) {
    console.error(error);
    return res.status(500).send({ message: 'Internal Server Error' });
  }
}
