import vouchersModel from '../models/vouchers.model.js'
import userModel from '../models/user.model.js'
import orderModel from '../models/order.model.js'

export const eligibilityController = async (req, res) => {
  try {
    const { total } = req.body
    const user = await userModel.findById(req.user._id)
    if (!user) {
      return res.send(404).send({ message: 'User not found' })
    }

    const vouchers = await vouchersModel.find({
      activeAtDate: {
        $lte: new Date()
      },
      expirationDate: {
        $gte: new Date()
      },
      minimumCartAmount: {
        $lte: total
      },
      type:{
        $ne:"firstOrder"
      }
    })

    const isFirstOrderVoucherValid=await orderModel.findOne({userId: req.user._id})
    console.log(isFirstOrderVoucherValid);
    if(!isFirstOrderVoucherValid){
      const firstOrderVoucher=await vouchersModel.findOne({type: "firstOrder"})
      console.log(firstOrderVoucher);
      vouchers.push(firstOrderVoucher)
    }

    return res.status(200).send({ vouchers })
  } catch (e) {
    return res.status(500).send({ error: e })
  }
}