import express from "express"
import AirPort from "../models/Airport.js"
import { GetQuery,Destination, CreateTime } from "../controllers/FlightService.js";
const router=express.Router();
router.post('/getQuery',GetQuery);
router.post('/destination/:id',Destination)
router.post('/createTime/:id',CreateTime)
export default router;