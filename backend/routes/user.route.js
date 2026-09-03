
import express from 'express'
import { isAuth } from '../middleware/isAuth.js'
import { getCurrentUser, saveAssitant } from '../controllers/user.controller.js'

const userRouter = express.Router()

userRouter.get('/current-user', isAuth, getCurrentUser)
userRouter.post('/save-assitant', isAuth , saveAssitant)

export default userRouter