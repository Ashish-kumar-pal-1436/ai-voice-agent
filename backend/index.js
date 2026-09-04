
import express from 'express'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'
import cors from 'cors'

import connectDB from './config/ConnectDB.js'
import authRouter from './routes/auth.route.js'
import userRouter from './routes/user.route.js'
import assistantRouter from './routes/assistant.route.js'

dotenv.config()

const app = express()

const privateCors = 
 cors({

    origin: [
        "http://localhost:5173"
    ], 
    credentials: true
 })

 const publicCors = 
  cors({
     origin: "*"
  })

app.use(express.json())
app.use(cookieParser())

app.get('/', (req, res) => {
    res.json("Hello from server")
})

app.use("/api/auth", privateCors, authRouter)
app.use("/api/user", privateCors, userRouter)
app.use("/api/assistant", publicCors, assistantRouter)

const PORT = process.env.PORT || 8000

const startServer = async () => {
    try {
        await connectDB()

        app.listen(PORT, () => {
            console.log(` Server is running on port ${PORT}`)
        })
    } catch (error) {
        console.error(" Database connection failed:", error)
        process.exit(1)
    }
}

startServer()