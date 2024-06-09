import orderModel from '../models/order.model.js'
import vouchersModel from '../models/vouchers.model.js'

export const placeOrderController = async (req, res) => {
  try {
    const { total, voucherId } = req.body

    const voucher = await vouchersModel.findById(voucherId)
    if(!voucher){
      return res.status(404).send({message:"Voucher not found"})
    }
    let newTotal = 0

    //check for existing voucher
    const existingVoucher = await orderModel
      .find({ appliedVoucher: voucherId, userId: req.user._id })
      .countDocuments()

    if (existingVoucher >= voucher.inUse) {
      return res
        .status(400)
        .send({ success: false, message: 'Voucher already applied' })
    }

    //check if voucher is valid or not
    if (voucher.type == 'discountPerc') {
      if (total < voucher.minimumCartAmount) {
        return res.send({ success: false, message: 'voucher not valid' })
      }
      newTotal = total - total * (voucher.discountPercentage / 100)
    } else if (voucher.type == 'discountCash') {
      if (total < voucher.minimumCartAmount) {
        return res.send({ success: false, message: 'voucher not valid' })
      }
      newTotal = total - voucher.discountAmount
    } else if (voucher.type == 'firstOrder') {
      const firstOrder = await orderModel.findOne({ userId: req.user._id })
      if (!firstOrder) {
        newTotal = total - voucher.discountAmount
      } else {
        return res
          .status(400)
          .send({ success: false, message: 'This is not your first order' })
      }
    } else {
      return res
        .status(400)
        .send({ success: false, message: 'Invalid voucher' })
    }
    const order = new orderModel({
      userId: req.user._id,
      appliedVoucher: voucherId,
      total: newTotal,
      redeemedAt: Date.now()
    })
    await order.save()
    return res.status(200).send({
      success: true,
      message: 'Order placed successfully',
      totalBeforeVoucher: total,
      totalAfterVoucher: newTotal,
      voucher
    })
  } catch (error) {
    return res
      .status(500)
      .send({ success: false, message: 'Error placing order', error: error })
  }
}
