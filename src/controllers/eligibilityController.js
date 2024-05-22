import vouchersModel from '../models/vouchers.model.js'
import userModel from '../models/user.model.js'
import moment from 'moment'
import redemptionModel from '../models/redemption.model.js'

export const eligibilityController = async (req, res) => {
  try {
    const { total, quantity, purchaseDate } = req.body
    const user = await userModel.findById(req.user._id)
    if (!user) {
      return res.send(404).send({ message: 'User not found' })
    }
    const vouchers = await vouchersModel.find()
    console.log(vouchers)
    const applicableVouchers = []
    vouchers.map(async voucher => {
      if (
        total >= voucher.minimumCartAmount &&
        voucher.discountPercentage > 0
      ) {
        const percentageVoucher = await vouchersModel.findOne({
          type: 'discountPerc'
        })
        if (percentageVoucher) {
          console.log(`perc yes ${voucher.minimumCartAmount}`)
          applicableVouchers.push(percentageVoucher)
          const selectedVoucher = await new redemptionModel({
            userId: req.user._id,
            voucherId: percentageVoucher?._id,
            redeemedAt: purchaseDate
          })
          await selectedVoucher.save()
        }
      } else {
        console.log('no perc ')
      }
      if (total >= voucher.minimumCartAmount && voucher.discountAmount > 0) {
        const cashVoucher = await vouchersModel.findOne({
          type: 'discountCash'
        })
        if (cashVoucher) {
          console.log(`cash yes ${voucher.minimumCartAmount}`)
          applicableVouchers.push(cashVoucher)
          const selectedVoucher = await new redemptionModel({
            userId: req.user._id,
            voucherId: cashVoucher._id,
            redeemedAt: purchaseDate
          })
          await selectedVoucher.save()
        }
      } else {
        console.log('no cash')
      }
      const isBirthday =
        moment(user.birthday).month() === moment(purchaseDate).month()
      if (isBirthday) {
        const birthdayVoucher = await vouchersModel.findOne({
          type: 'birthdayGift'
        })
        if (birthdayVoucher) {
          applicableVouchers.push(birthdayVoucher)
          user.walletCash += 500
          const selectedVoucher = await new redemptionModel({
            userId: req.user._id,
            voucherId: birthdayVoucher._id,
            redeemedAt: purchaseDate
          })
          selectedVoucher.save()
        }
      }
      if (quantity > voucher.quantity) {
        const pointVoucher = await vouchersModel.findOne({
          type: 'walletPoints'
        })
        if (pointVoucher) {
          applicableVouchers.push(pointVoucher)
          user.walletPoints += 1000
          const selectedVoucher = await new redemptionModel({
            userId: req.user._id,
            voucherId: pointVoucher._id,
            redeemedAt: purchaseDate
          })
          await selectedVoucher.save()
        }
      }
    })
    return res.status(200).send({ applicableVouchers })
  } catch (e) {
    return res.status(500).send({ error: e })
  }
}
