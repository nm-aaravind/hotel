import express from 'express'
import cors from 'cors'
import "dotenv/config"
import mongoose from 'mongoose'
import userRouter from './routes/user.js'
import hotelRouter from "./routes/hotel.js"
import cookieParser from 'cookie-parser'
import searchRouter from "./routes/search.js"
import bodyParser from 'body-parser'
try {
    await mongoose.connect(process.env.MONGOOSE_CONNECTION_STRING)
    console.log("Connected to db")
} catch (error) {
    console.log(error)
}

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors(
    {
        credentials: true,
        preflightContinue: true,
        methods: 'GET,POST,PUT,PATCH,DELETE,OPTIONS',
        origin: process.env.FRONTEND_URL
    }
));
app.use(cookieParser())
app.use("/api/users", userRouter)
app.use("/api/hotels", hotelRouter)
app.use("/api", searchRouter)

app.listen(process.env.PORT, () => {
    console.log("Hello from express", process.env.PORT)
})

app.get("/", async (req, res) => {
    res.send("Server is running")
})

export default app