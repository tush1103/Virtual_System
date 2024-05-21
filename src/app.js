import express from 'express'
import cors from 'cors'
import authRoutes from './routes/authRoutes.js'
import cookieParser from 'cookie-parser'
const app = express()
app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
  })
)

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())

app.use('/api/v1/auth', authRoutes)

export { app }
