import mongoose, { model } from 'mongoose'

const userSchema = mongoose.Schema({

  first_name: {
    type: String,
    required: true
  },

  last_name: {
    type: String,
    required: true
  },

  email: {
    type: String,
    required: true,
    unique: true
  },

  password: {
    type: String,
    require: true,
  },

  isAdmin: {
    type: Boolean,
    require: true,
    default: false
  }
}, {
  timestamps: true
})


export const User = mongoose.model('User', userSchema)