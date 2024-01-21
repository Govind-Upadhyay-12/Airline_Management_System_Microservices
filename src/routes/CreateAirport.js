import express from "express"
import { CreateAirport,GetAirport,GetSingle,CreateAirplaneNew,GetAll } from "../controllers/CreateAirport.js";
const router=express.Router();
router.post('/createAirport',CreateAirport)
router.get('/getAirline',GetAirport);
router.get('/getSingle/:id',GetSingle)
router.post('/totalAir/:id',CreateAirplaneNew)
router.get('/GetAll/:id',GetAll)
export default router