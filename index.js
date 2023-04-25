import express from 'express';
import dotenv from 'dotenv';
import router from './routes/route.js';
import connectDB from './config/db.js';
import multer from 'multer';
const app = express();
dotenv.config()


//connect db
connectDB()


//middlewares
app.use(express.json());
app.use(multer().any())
app.use("/api/v1",router)


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is Running on Port ${PORT}`)
})