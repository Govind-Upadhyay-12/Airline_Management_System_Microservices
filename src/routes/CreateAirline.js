import express from "express";
const router=express.Router();
import { createAirplane,getAirplane,GetSingle,DeleteAirline} from "../controllers/CreateAirl.js";

router.post('/createAirplane',createAirplane);
router.get('/Allairlines',getAirplane);
router.get('/find/:id',GetSingle)
router.post('/delete/:id',DeleteAirline)
export default router;