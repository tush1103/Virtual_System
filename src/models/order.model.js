import mongoose from "mongoose"

const orderSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  total: {
    type: Number,
    required: true
  },
  appliedVoucher: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Voucher'
  },
  quantity:{
    type:Number,
    default:1
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  status: {
    type: String,
    enum: ['Pending', 'Processing', 'Completed', 'Cancelled'],
    default: 'Pending'
  }
})

export default mongoose.model('Order', orderSchema)
