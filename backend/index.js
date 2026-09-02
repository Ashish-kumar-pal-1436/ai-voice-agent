
// import express from 'express'
// import dotenv from 'dotenv'
// dotenv.config()
// import cookieParser from 'cookie-parser'
// import cors from 'cors'

// import connectDB from './config/ConnectDB.js'
// import authRouter from './routes/auth.route.js'
// import userRouter from './routes/user.route.js'

// const app = express()
// app.use(cors({
//     origin: "http://localhost:5173",
//     credentials: true
// }))

// app.use(express.json())
// app.use(cookieParser())

// app.get('/', (req, res) =>{
//     res.json("Hello from server")
// })

// app.use("api/auth", authRouter)
// app.use("api/user", userRouter)

// const PORT = process.env.PORT
// app.listen(PORT, () =>{
//      console.log(`server is running on port ${PORT}`)
//     //  connectDB() 
// })

// import express from 'express'
// import dotenv from 'dotenv'
// dotenv.config()

// import cookieParser from 'cookie-parser'
// import cors from 'cors'

// import connectDB from './config/ConnectDB.js'
// import authRouter from './routes/auth.route.js'
// import userRouter from './routes/user.route.js'

// const app = express()

// app.use(cors({
//     origin: "http://localhost:5173",
//     credentials: true
// }))

// app.use(express.json())
// app.use(cookieParser())

// app.get('/', (req, res) => {
//     res.json("Hello from server")
// })

// app.use("/api/auth", authRouter)
// app.use("/api/user", userRouter)

// const PORT = process.env.PORT

// app.listen(PORT, () => {
//     console.log(`server is running on port ${PORT}`)
//     connectDB()
// })

import express from 'express'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'
import cors from 'cors'

import connectDB from './config/ConnectDB.js'
import authRouter from './routes/auth.route.js'
import userRouter from './routes/user.route.js'

dotenv.config()

const app = express()

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}))

app.use(express.json())
app.use(cookieParser())

app.get('/', (req, res) => {
    res.json("Hello from server")
})

app.use("/api/auth", authRouter)
app.use("/api/user", userRouter)

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