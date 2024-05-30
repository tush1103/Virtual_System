import mongoose, { Schema } from 'mongoose'

const voucherSchema = new Schema(
  {
    type: {
      type: String,
      enum: ['discountCash', 'discountPerc', 'firstOrder'],
      required: true
    },
    code: {
      type: String,
      required: true,
      unique: true
    },
    description: {
      type: String,
      required: true
    },
    discountAmount: {
      type: Number,
      default: 0
    },
    discountPercentage: {
      type: Number,
      default: 0
    },
    minimumCartAmount: {
      type: Number,
      default: 0
    },
    inUse: {
      type: Number,
      default: 1
    },
    expirationDate: {
      type: Date,
      required: true
    },
    activeAtDate: {
      type: Date,
      required: true
    }
  },
  { timestamps: true }
)

export default mongoose.model('Voucher', voucherSchema)
