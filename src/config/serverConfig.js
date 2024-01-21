import dotenv from "dotenv";
dotenv.config();
export const PORT = process.env.PORT;
export const URI = "mongodb://localhost:27017/airlines";
