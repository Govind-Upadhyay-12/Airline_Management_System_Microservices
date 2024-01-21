// import { connection, connections } from "mongoose";
import NewAir from "../models/Airplane.js";


export async function BookAir(req, res) {
  try {
    const { id, seat, id2 } = req.body;
    const find_Flight = await NewAir.findById(id2);
    console.log(find_Flight);

    if (find_Flight.capacity >= seat) {
      console.log("You can book Seat ");

      const capacity_u = find_Flight.capacity - seat;

      await NewAir.findByIdAndUpdate(id2, { capacity: capacity_u });

      find_Flight.user.push(id);
      await find_Flight.save();

      return res.status(200).json({ message: "Flight booked successfully" });
    } else {
      res.status(200).json({ message: "Seat is filled" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
}

// const emailQueue = new Queue("email-queue", {
//   connection: {
//     host: "redis-5f85693-govindupadhyay85273-7b6d.a.aivencloud.com",
//     port: 25723,
//     username: "default",
//     password: "AVNS_0bdbyXxbc2zf3jqEabO",
//   },
// });  
export async function Book_Ticket(req, res) {
  console.log(req.body);

  try { 
    const { id1, id2, email } = req.body;
    const Find = await NewAir.findById(id2);
    var c = 0;
    const data = Find.user;

    for (let i = 0; i < data.length; i++) {
      if (data[i] == id1) {
        c = 1;
      }
    }

    console.log("haan bhai shi chl raa h");

    if (c == 1) {
    
      // await emailQueue.add({
      //   from: "govindupadhyay85373@gmail.com",
      //   to: email,
      //   subject: "booking flight",
      //   body: "hey ur flight has been booked",
      // });

      return res.status(200).send({ message: "enter to the user_schema" });
    } else {
      return res.status(400).send({ message: "book again" });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).send({ message: error.message });
  }
}