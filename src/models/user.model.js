import mongoose, { Schema } from 'mongoose'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true
    },
    email: {
      type: String,
      required: true,
      unique: true
    },
    password: {
      type: String,
      required: true
    },
    birthday: {
      type: Date
    },
    role: {
      type: Number,
      default: 0
    }
  },
  { timestamps: true }
)

export default mongoose.model('User', userSchema)
