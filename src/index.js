import express from "express";
import bodyParser from "body-parser";
import { PORT } from "./config/serverConfig.js";
import { URI } from "./config/serverConfig.js";
import createAirl from "./routes/CreateAirline.js";
import createAirport from "./routes/CreateAirport.js"
import Service from "./routes/Service.js";
import FlightService from "./routes/FlightService.js";
import BookFlight from "./routes/BookFlight.js";
// import {createChannel} from "./config/message_confiq.js"
import { Worker } from "bullmq";
import { Queue } from "bullmq";



import mongoose from "mongoose";
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/api/use',createAirl)
app.use('/api/use',createAirport);
app.use('/api/use',Service);
app.use('/api/use',FlightService)
app.use('/api/use',BookFlight)
// try {
//   const ampqUrl = "amqp://127.0.0.1:5673";

//   const connection = await amqb.connect(ampqUrl);
//   const channel = await connection.createChannel();
//   channel.assertQueue("email-air", { durable: true });
//   channel.sendToQueue("email-air", Buffer.from(JSON.stringify({})));
  
//   // Rest of your code...
// } catch (error) {
//   console.error('Error connecting to RabbitMQ:', error);
// }





// const emailQueue = new Queue("batch-email-queue");
// async function addJobsToQueue(userDetails){
//     const batchSize = 5;
//     const totalUsers = userDetails.length;
//     let processedCount = 0;
//     while(processedCount < totalUsers){
//         const batch = userDetails.slice(processedCount, processedCount + batchSize);
//         const res = await emailQueue.add("send batch email", { batch })
//         console.log("batch added to queue", res.id);
//         processedCount += batchSize;
//     }
// }

// const mailData = {
//     "subject": "Welcome to roc8 tiny talk",
//     "body": "Hello folks welcome to roc8 tiny talk on bullMQ",
// }

// const userDetails = [
//     { ...mailData, "email": "u1@gmail.com", "name": "u1" },
//     { ...mailData, "email": "u2@gmail.com", "name": "u2" },
//     { ...mailData, "email": "u3@gmail.com", "name": "u3" },
//     { ...mailData, "email": "u4@gmail.com", "name": "u4" },
//     { ...mailData, "email": "u5@gmail.com", "name": "u5" },
//     { ...mailData, "email": "u6@gmail.com", "name": "u6" },
//     { ...mailData, "email": "u7@gmail.com", "name": "u7" },
//     { ...mailData, "email": "u8@gmail.com", "name": "u8" },
//     { ...mailData, "email": "u9@gmail.com", "name": "u9" },
//     { ...mailData, "email": "u10@gmail.com", "name": "u10" },
// ]

// addJobsToQueue(userDetails);
// async function sendEmailHelper(n){
//     return new Promise((res, rej) => setTimeout(() => res(), n * 1000))
// }

// async function sendBatchEmails(job){
//     const { batch } = job.data;
//     batch.map(async (userDetail) => {
//         console.log(`job id: ${job.id}`);
//         console.log(`Sending email to: ${userDetail.email}`);
//         await sendEmailHelper(5);
//         console.log(`Email sent successfully ${userDetail.name}`) 
//     })
// }

// const worker1 = new Worker("batch-email-queue", sendBatchEmails)
// worker1.on('completed', job => {
//     console.log(`${job.id} has completed in worker1!`);
//   });

// const worker2 = new Worker("batch-email-queue", sendBatchEmails)
// worker2.on('completed', job => {
//     console.log(`${job.id} has completed in worker2!`);
// });

mongoose.connect(URI) 
  .then(() => {
    console.log('Connected to mongodb');
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error.message);
  });
  

  
app.listen(PORT, async() => {
 
    console.log("Server is started on port", PORT);
});
