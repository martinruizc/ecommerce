import express from 'express'
import { createProduct, deleteProduct, getProducts, getProductsById, updateProduct } from '../controllers/productController.js'
import { protect, admin } from '../middleware/authMiddleware.js'

export const router = express.Router();

router.route('/').get(getProducts).post(protect, admin, createProduct)
router.route('/:id').get(getProductsById).delete(protect, admin, deleteProduct).put(protect, admin, updateProduct)

