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
      totalPrice,
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


// Udpate order to Paid
// PUT /api/orders/id/pay
// Protected 

export const updateOrderToPaid = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id)

  if (order) {
    order.isPaid = true
    order.paidAt = Date.now()
    order.paymentResult = {
      id: req.body.id,
      status: req.body.status,
      update_time: req.body.update_time,
      email_address: req.body.payer.email_address,
    }
    const updatedOrder = await order.save()
    res.json(updatedOrder)

  } else {
    res.status(404)
    throw new Error('Orden no encontrada')
  }
})