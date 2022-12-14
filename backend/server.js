import path from 'path'
import express from 'express'
import dotenv from 'dotenv'
import colors from 'colors'
import { connectDB } from './config/db.js'
import { errorHandler, notFound } from './middleware/errorMiddleware.js'
import { router as productRoutes } from './routes/productRoutes.js'
import { router as userRoutes } from './routes/userRoutes.js'
import { router as orderRoutes } from './routes/orderRoutes.js'
import { router as uploadRoutes } from './routes/uploadRoutes.js'
dotenv.config()


connectDB()


const app = express()


app.use(express.json())

app.get('/', (req, res) => {
  res.send('API is running')
})

app.use('/api/products', productRoutes)
app.use('/api/users', userRoutes)
app.use('/api/orders', orderRoutes)
app.use('/api/upload', uploadRoutes)

app.get('/api/config/paypal', (req, res) => res.send(process.env.PAYPAL_CLIENT_ID))


const __dirname = path.resolve()
app.use('/uploads', express.static(path.join(__dirname, 'uploads')))


app.use(notFound)
app.use(errorHandler)



const PORT = process.env.PORT || 5000

app.listen(PORT,
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold))