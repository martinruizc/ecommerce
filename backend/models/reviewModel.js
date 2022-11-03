import mongoose from 'mongoose'

export const reviewSchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },

  raiting: {
    type: Number,
    requiered: true
  },

  comment: {
    type: String,
    required: true
  }

}, {
  timestamps: true
})