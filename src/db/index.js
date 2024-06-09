import mongoose from 'mongoose'
import { DB_NAME } from '../utils/constants.js'

const connectDB = async () => {
  try {
    const connectionInst = await mongoose.connect(
      `${process.env.MONGODB_URI}/${DB_NAME}`
    )
    console.log('MONGODB connected successfully')
  } catch (error) {
    console.log(`MONGODB connection error: ${error}`)
    process.exit(1)
  }
}

export default connectDB
