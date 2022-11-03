import express from 'express'
import asyncHandler from 'express-async-handler'
import { Product } from '../models/productModel.js'

export const router = express.Router();


// Fetch all Products
// GET /api/products
router.get('/', asyncHandler(async (req, res) => {
  const products = await Product.find({})
  res.json(products)
}))


//Fetch an unique product
// GET /api/products/:id
router.get('/:id', asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id)

  if (product) {
    res.json(product)
  } else {
    res.status(404)
    throw new Error('Product not Found')
  }

}))