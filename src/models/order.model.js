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
  purchaseDate: {
    type: Date,
    default: Date.now
  }
})

export default mongoose.model('Order', orderSchema)
