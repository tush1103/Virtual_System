import voucherModel from '../models/vouchers.model.js'

export const createCashVoucher = async (req, res) => {
  try {
    const {
      code,
      discountAmount,
      description,
      minimumCartAmount,
      expirationDate
    } = req.body

    if (!code || !discountAmount || !minimumOrderValue || !expirationDate) {
      return res.status(400).send({
        success: false,
        message:
          'Code,discountValue,minimumOrderValue,expirationDate are required'
      })
    }
    const newVoucher = new voucherModel({
      code,
      type: 'discountCash',
      discountAmount,
      description,
      expirationDate,
      minimumCartAmount,
      createdAt: new Date()
    })

    await newVoucher.save()

    res.status(201).send({
      success: true,
      message: 'Cash voucher created successfully',
      voucher: newVoucher
    })
  } catch (err) {
    console.log('Error creating voucher', err)
    res.status(500).send({
      success: false,
      message: 'Error creating cash voucher',
      error: err
    })
  }
}

export const createPercentageVoucher = async (req, res) => {
  try {
    const {
      code,
      discountPercentage,
      description,
      minimumCartAmount,
      expirationDate
    } = req.body
    if (!code || !discountPercentage || !minimumOrderValue || !expirationDate) {
      return res.status(400).send({
        success: false,
        message:
          'Code,discountPercentage,minimumOrderValue,expirationDate are required'
      })
    }
    const newVoucher = new voucherModel({
      code,
      type: 'discountPerc',
      discountPercentage,
      description,
      expirationDate,
      minimumCartAmount,
      createdAt: new Date()
    })

    await newVoucher.save()

    res.status(201).send({
      success: true,
      message: 'Percent voucher created successfully',
      voucher: newVoucher
    })
  } catch (err) {
    console.log('Error creating voucher', err)
    res.status(500).send({
      success: false,
      message: 'Error creating percentage voucher',
      error: err
    })
  }
}
