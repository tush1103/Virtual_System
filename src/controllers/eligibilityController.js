import vouchersModel from '../models/vouchers.model.js'
import userModel from '../models/user.model.js'
import orderModel from '../models/order.model.js'
import mongoose from 'mongoose'
export const eligibilityController = async (req, res) => {
  try {
    const { total } = req.body
    const user = await userModel.findById(req.user._id)
    if (!user) {
      return res.send(404).send({ message: 'User not found' })
    }

    const isFirstOrderVoucherValid = await orderModel.findOne({
      userId: req.user._id
    })

    let query = {
      activeAtDate: { $lte: new Date() },
      expirationDate: { $gte: new Date() },
      minimumCartAmount: { $lte: total }
    }

    if (isFirstOrderVoucherValid) {
      query['type'] = { $ne: 'firstOrder' }
    }

    const vouchers = await vouchersModel.aggregate([
      {
        $match: query
      },
      {
        $lookup: {
          from: 'orders',
          localField: '_id',
          foreignField: 'appliedVoucher',
          pipeline: [
            {
              $match: {
                userId: new mongoose.Types.ObjectId(req.user._id)
              }
            }
          ],
          as: 'ordersData'
        }
      },
      {
        $addFields: {
          size: {
            $size: '$ordersData'
          }
        }
      },
      {
        $match: {
          $expr: {
            $lt: ['$size', '$inUse']
          }
        }
      }
    ])

    return res.status(200).send({ vouchers })
  } catch (e) {
    console.log(e)
    return res.status(500).send({ error: e })
  }
}
