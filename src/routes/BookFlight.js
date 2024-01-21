import express from "express";
const router = express.Router();
import { BookAir,Book_Ticket } from "../controllers/BookAir.js";

router.post('/bookFlight',BookAir);
router.post('/confirm',Book_Ticket);
 

export default router;
