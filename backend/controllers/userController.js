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


// User Update Profile 
// PUT /api/users/profile
export const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id)

  if (user) {
    user.first_name = req.body.first_name || user.first_name
    user.last_name = req.body.last_name || user.last_name
    user.email = req.body.email || user.email
    if (req.body.password) {
      user.password = req.body.password
    }

    const updatedUser = await user.save()

    res.json({
      _id: updatedUser._id,
      first_name: updatedUser.first_name,
      last_name: updatedUser.last_name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
      token: generateToken(updatedUser._id),
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



// GET All User
// GET /api/users
// Proected/Admin

export const getUsers = asyncHandler(async (req, res) => {
  const users = await User.find({})
  res.json(users)

})


// Delete User
// DELETE /api/users/:id
// Proected/Admin

export const deleteUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id)
  if (user) {
    await user.remove()
    res.json({ message: 'Usuario eliminado' })
  } else {
    res.status(404)
    throw new Error('Usuario no encontrado')
  }

})


// GET User by Id
// GET /api/users/:id
// Proected/Admin
export const getUserById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id).select('-password')
  if (user) {
    res.json(user)
  } else {
    res.status(404)
    throw new Error('Usuario no encontrado')
  }
})

// User Update Profile 
// PUT /api/users/:id
// Proected/Admin
export const updateUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id)

  if (user) {
    user.first_name = req.body.first_name || user.first_name
    user.last_name = req.body.last_name || user.last_name
    user.email = req.body.email || user.email
    user.isAdmin = req.body.isAdmin

    const updatedUser = await user.save()

    res.json({
      _id: updatedUser._id,
      first_name: updatedUser.first_name,
      last_name: updatedUser.last_name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
    })

  } else {
    res.status(404)
    throw new Error('User not found')
  }

})
