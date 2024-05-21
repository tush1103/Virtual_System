import vouchersModel from '../models/vouchers.model.js'
import userModel from '../models/user.model.js'
import moment from 'moment'
import redemptionModel from '../models/redemption.model.js'

export const eligibilityController = async (req, res) => {
  try {
    const { total, quantity, purchaseDate } = req.body
    const user = userModel.findById(req.user._id)
    if (!user) {
      return res.send(404).send({ message: 'User not found' })
    }
    const isBirthday =
      moment(user.birthday).month() === moment(purchaseDate).month()

    const vouchers = await vouchersModel.find()
    console.log(vouchers)
    const eligibleVouchers = []
    vouchers.map(async voucher => {
      if (total >= voucher.minimumCartAmount && voucher.discountPercentage!==0) {
        const percentageVoucher = await vouchersModel.findOne({
          type: 'discountPerc' 
        })
        if (percentageVoucher) {
          eligibleVouchers.push(percentageVoucher)
        }
        const selectedVoucher = new redemptionModel({
          userId: req.user._id,
          voucherId: percentageVoucher?._id,
          redeemedAt: purchaseDate
        })
        selectedVoucher.save()
      }
      if (total >= voucher.minimumCartAmount && voucher.discountAmount!==0) {
        const cashVoucher = await vouchersModel.findOne({
          type: 'discountCash'
        })
        if (cashVoucher) {
          eligibleVouchers.push(cashVoucher)
        }
        const selectedVoucher = new redemptionModel({
          userId: req.user._id,
          voucherId: cashVoucher._id,
          redeemedAt: purchaseDate
        })
        selectedVoucher.save()
      }
      res.status(200).send({ eligibleVouchers })
    })
  } catch (e) {
    console.log(e)
  }
}
