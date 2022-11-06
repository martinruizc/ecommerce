import asyncHandler from 'express-async-handler'
import { Product } from '../models/productModel.js'



// Fetch all Products
// GET /api/products
export const getProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({})
  res.json(products)
})

//Fetch an unique product
// GET /api/products/:id

export const getProductsById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id)

  if (product) {
    res.json(product)
  } else {
    res.status(404)
    throw new Error('Product not Found')
  }
})