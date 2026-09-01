
import express from 'express'
import { isAuth } from '../middleware/isAuth'
import { getCurrentUser } from '../controllers/user.controller'

const userRouter = express.Router()

userRouter.get('/current-user', isAuth, getCurrentUser)

export default userRouter