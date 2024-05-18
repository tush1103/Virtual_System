import express from 'express'
import cors from 'cors'
import authRoutes from './routes/authRoutes.js';
const app = express()
app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
  })
)

app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.use('/api/v1/auth', authRoutes)


export {app}