import voucherModel from '../models/vouchers.model.js'

export const createVoucher = async (req, res) => {
  try {
    const {
      code,
      discountAmount,
      discountPercentage,
      activeAtDate,
      description,
      minimumCartAmount,
      expirationDate,
      type,
      inUse
    } = req.body
    if (!code || !description || !expirationDate) {
      return res.status(404).send({
        success: false,
        message: 'code, description, expirationDate are required'
      })
    }
    if (type == 'discountCash' || type == 'discountPerc') {
      if (!minimumCartAmount) {
        return res
          .status(404)
          .send({ success: false, message: 'minimumCartAmount is required' })
      }
    }
    const newVoucher = new voucherModel({
      code,
      type,
      discountAmount,
      discountPercentage,
      description,
      expirationDate,
      minimumCartAmount,
      inUse,
      activeAtDate: activeAtDate,
    })
    await newVoucher.save()
    return res.status(201).send({
      success: true,
      message: 'voucher created successfully',
      voucher: newVoucher
    })
  } catch (error) {
    return res
      .status(500)
      .send({ success: false, message: 'Error creating voucher', error: error })
  }
}
