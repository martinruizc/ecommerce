import express from 'express'
import { authUser } from '../controllers/userController.js'

export const router = express.Router();

router.post('/login', authUser)

