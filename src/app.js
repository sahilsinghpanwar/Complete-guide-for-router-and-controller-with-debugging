import express from "express";


import cors from "cors";
import cookieParser from 'cookie-parser';
const app = express();

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
}))


app.use(express.json({limit: "20kb"}));
app.use(express.urlencoded({extended: true, limit: "20kb"}));
app.use(express.static("Public"));

app.use(cookieParser());



// routes  (video -12)
import userRouter from './routes/user.routes.js'


// routes declaration
// ye humara prefix bn gya h 
app.use("/api/v1/users", userRouter)
// http://localhost:8000/api/v1/users/route(call kon sa krna h)

export default app