import express from 'express'
import { authUser, getUserProfile, registerUser } from '../controllers/userController.js'
import { portect } from '../middleware/authMiddleware.js'

export const router = express.Router();
router.route('/').post(registerUser)
router.post('/login', authUser)
router.route('/profile').get(portect, getUserProfile)


