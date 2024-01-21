import express from "express"
import { AddService} from "../controllers/Service.js";
const router=express.Router();
router.post('/addService/:id',AddService);
router.get('/getDetails/:id');

export default router;