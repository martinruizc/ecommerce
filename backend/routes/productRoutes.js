import express from 'express'
import { getProducts, getProductsById } from '../controllers/productController.js'

export const router = express.Router();

router.route('/').get(getProducts)
router.route('/:id').get(getProductsById)

