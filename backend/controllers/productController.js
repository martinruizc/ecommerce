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

//Delete Product
// DELETE /api/products/:id
//Protected / Admin

export const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id)

  if (product) {
    await product.remove()
    res.json({ message: 'Producto eliminado' })
  } else {
    res.status(404)
    throw new Error('Product not Found')
  }
})

//Create Product
// POST /api/products/
//Protected / Admin

export const createProduct = asyncHandler(async (req, res) => {
  const product = new Product({
    name: 'Construcción',
    price: 0,
    user: req.user._id,
    image: '/images/hoodie.png',
    brand: 'SwimFast',
    description: 'lorem20',
    category: 'Accesorios',
    numReviews: 0,
    countInStock: 0
  })
  const createdProduct = await product.save()
  res.status(201).json(createdProduct)
})

//Update Product
// PUT /api/products/:id
//Protected / Admin

export const updateProduct = asyncHandler(async (req, res) => {
  const { name, price, image, brand, description, category, numReviews, countInStock } = req.body

  const product = await Product.findById(req.params.id)

  if (product) {
    product.name = name
    product.price = price
    product.description = description
    product.image = image
    product.brand = brand
    product.category = category
    product.countInStock = countInStock

    const updatedProduct = await product.save()
    res.status(201).json(updatedProduct)

  } else {
    res.status(404)
    throw new Error('Producto no encontrado')
  }




})