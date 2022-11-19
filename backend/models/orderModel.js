import mongoose, { model, mongo } from 'mongoose'

const orderSchema = mongoose.Schema({

  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  },

  orderItems: [
    {
      name: { type: String, required: true },
      qty: { type: Number, required: true },
      image: { type: String, required: true },
      price: { type: Number, required: true },
      product: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Product'
      }
    }
  ],

  shippingAddress: {
    address: { type: String, required: true },
    addressDetail: { type: String, required: false },
    city: { type: String, required: true },
    neighboorhood: { type: String, required: false },
    country: { type: String, required: true }
  },

  paymentMethod: {
    type: String, required: true,
    required: false
  },

  paymentResult: {
    id: { type: String },
    status: { type: String },
    update_time: { type: String },
    email_address: { type: String },
  },

  taxPrice: {
    type: Number,
    required: true
  },

  shippingPrice: {
    type: Number,
    required: true,
    default: 0.0
  },

  totalPrice: {
    type: Number,
    required: true,
    default: 0.0
  },

  itemsPrice: {
    type: Number,
    required: true,
    default: 0.0,
  },

  isPaid: {
    type: Boolean,
    required: true,
    default: false,
  },

  paidAt: {
    type: Date
  },

  isDelivered: {
    type: Boolean,
    required: true,
    default: false
  },

  deliverdAt: {
    type: Date
  },

},
  {
    timestamps: true
  }
)


export const Order = mongoose.model('Order', orderSchema)