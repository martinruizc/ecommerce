import asyncHandler from 'express-async-handler'
import { User } from '../models/userModel.js'
import { generateToken } from '../utils/genareToken.js'



// Authentication
// POST /api/userls/login

export const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body

  const user = await User.findOne({ email })

  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      first_name: user.first_name,
      last_name: user.last_name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user._id)
    })
  } else {
    res.status(401)
    throw new Error('Correo o contraseña incorrecta')
  }

})


// User Profile
// POST /api/users/profile

export const getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id)

  if (user) {
    res.json({
      _id: user._id,
      first_name: user.first_name,
      last_name: user.last_name,
      email: user.email,
      isAdmin: user.isAdmin,
    })

  } else {
    res.status(404)
    throw new Error('User not found')
  }

})

// User Register user
// POST /api/users/

export const registerUser = asyncHandler(async (req, res) => {
  const { first_name, last_name, email, password } = req.body
  const userExists = await User.findOne({ email })

  if (userExists) {
    res.status(404)
    throw new Error('Correo en uso')
  }

  const user = await User.create({
    first_name,
    last_name,
    email,
    password

  })

  if (user) {
    res.status(201).json({
      _id: user._id,
      first_name: user.first_name,
      last_name: user.last_name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user._id)
    })


  } else {
    res.status(404)
    throw new Error('User not found')
  }

})