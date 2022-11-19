import asyncHandler from 'express-async-handler'
import { Order } from '../models/orderModel.js'



// Create an order
// POST /api/orders
// Protected 

export const addOrderItems = asyncHandler(async (req, res) => {

  const { orderItems, shippingAddress, paymentMethod, itemsPrice, shippingPrice, totalPrice, taxPrice } = req.body

  if (orderItems && orderItems.length === 0) {
    res.status(400)
    throw new Error('No items en la orden')
    return
  } else {
    const order = new Order({
      orderItems,
      user: req.user._id,
      shippingAddress,
      paymentMethod,
      itemsPrice,
      shippingPrice,
      taxPrice,
      totalPrice
    })

    const createdOrder = await order.save()
    res.status(201).json(createdOrder)
  }
})


// Get order by ID
// GET /api/orders/id 
// Protected 

export const getOrderById = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id).populate('user', 'first_name last_name email')

  if (order) {
    res.json(order)
  } else {
    res.status(404)
    throw new Error('Orden no encontrada')
  }
})