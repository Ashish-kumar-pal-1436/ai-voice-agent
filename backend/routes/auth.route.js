import express from 'express'
import {googleAuth, logOut} from '../controllers/auth.controller.js'

const authRouter = express.Router()

authRouter.post('/google', (req, res) =>{
    console.log("helo")
})

authRouter.get('/logout', logOut)

export default authRouter