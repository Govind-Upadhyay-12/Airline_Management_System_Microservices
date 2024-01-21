// import { json } from "body-parser";
import NewAir from "../models/Airplane.js";
import client from "../redisClient/redisClient.js";
export async function createAirplane(req, res) {
  console.log(req.body);
  try {
    const { name, modelNo, capacity } = req.body;
    const NewAirlines = await new NewAir({
      name,
      modelNo,
      capacity,
    });
    await NewAirlines.save();
    await client.del(`all-airplane-data`);
    return res.status(200).send({ message: "Airline Created" });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ message: error });
  }
}

export async function getAirplane(req, res) {
  console.log(req.body);

  try {
    const cachedData = await client.get(`all-airplane-data`);

    if (cachedData) {
      return res.status(200).json(JSON.parse(cachedData));
    }

    const allAirlines = await NewAir.find({});

    await client.set(`all-airplane-data`, JSON.stringify(allAirlines));
    await client.expire(`all-airplane-data`, 1600);

    return res.status(200).json({ allAirlines });
  } catch (error) {
    console.error(error);
    return res.status(500).send({ message: error.message });
  }
}

export async function GetSingle(req, res) {
  try {
    const cachedData = await client.get(`air-${id}`);
    if (cachedData) {
      return res.status(200).json(json.parse(cachedData));
    }
    const { id } = req.params;
    const Find_Airline = await NewAir.findById(id);
    if (Find_Airline) {
      await client.set(`air-${id}`, JSON.stringify(Find_Airline));
      return res.status(200).json(Find_Airline);
    } else {
      return res.status(400).send({ message: "Airline not exist " });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).send({ message: error });
  }
}
export async function DeleteAirline(req, res) {
  const { id } = req.params;
  console.log(id);
  try {
    const Delete_Air = await NewAir.findById(id);
    if (Delete_Air) {
      await Delete_Air.deleteOne();
      return res.status(200).send({ message: "Airline deleted" });
    } else {
      return res.status(400).send({ message: "Airline does not exist" });
    }
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .send({ message: error.message || "Internal Server Error" });
  }
}
