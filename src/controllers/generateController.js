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

    if (!code || !discountAmount || !minimumCartAmount || !expirationDate) {
      return res.status(400).send({
        success: false,
        message:
          'Code,discountValue,minimumCartAmount,expirationDate are required'
      })
    }
    const newVoucher = new voucherModel({
      code,
      type: 'discountCash',
      discountAmount,
      description,
      expirationDate,
      minimumCartAmount,
      createdAt: Date.now(),
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
    if (!code || !discountPercentage || !minimumCartAmount || !expirationDate) {
      return res.status(400).send({
        success: false,
        message:
          'Code,discountPercentage,minimumCartAmount,expirationDate are required'
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

export const createWalletPointsVoucher = async (req, res) => {
  try {
    const { code, walletPoints, description, expirationDate } = req.body
    if (!code || !walletPoints || !description || !expirationDate) {
      return res.status(400).send({
        success: false,
        message: 'Code,walletPoints,description,expirationDate are required'
      })
    }
    const newVoucher = new voucherModel({
      code,
      type: 'walletPoints',
      walletPoints,
      description,
      expirationDate,
      createdAt: new Date()
    })

    await newVoucher.save()

    res.status(201).send({
      success: true,
      message: 'walletPoint voucher created successfully',
      voucher: newVoucher
    })
  } catch (err) {
    console.log('Error creating voucher', err)
    res.status(500).send({
      success: false,
      message: 'Error creating walletPoint voucher',
      error: err
    })
  }
}

export const createFirstOrderVoucher = async (req, res) => {
  try {
    const { code, walletPoints, description, expirationDate } = req.body
    if (!code || !walletPoints || !description || !expirationDate) {
      return res.status(400).send({
        success: false,
        message: 'Code,walletPoints,description,expirationDate are required'
      })
    }
    const newVoucher = new voucherModel({
      code,
      type: 'firstOrder',
      walletPoints,
      description,
      expirationDate,
      createdAt: new Date()
    })

    await newVoucher.save()

    res.status(201).send({
      success: true,
      message: 'firstOrder voucher created successfully',
      voucher: newVoucher
    })
  } catch (err) {
    console.log('Error creating voucher', err)
    res.status(500).send({
      success: false,
      message: 'Error creating firstOrder voucher',
      error: err
    })
  }
}

export const createBirthdayGiftVoucher = async (req, res) => {
  try {
    const { code, walletCash, description, expirationDate } = req.body
    if (!code || !walletCash || !description || !expirationDate) {
      return res.status(400).send({
        success: false,
        message: 'Code,walletCash,description,expirationDate are required'
      })
    }
    const newVoucher = new voucherModel({
      code,
      type: 'birthdayGift',
      walletCash,
      description,
      expirationDate,
      createdAt: new Date()
    })

    await newVoucher.save()

    res.status(201).send({
      success: true,
      message: 'birthdayGift voucher created successfully',
      voucher: newVoucher
    })
  } catch (err) {
    console.log('Error creating voucher', err)
    res.status(500).send({
      success: false,
      message: 'Error creating birthdayGift voucher',
      error: err
    })
  }
}

export const createFreeShippingVoucher = async (req, res) => {
  try {
    const { code, description, expirationDate} = req.body
    if (!code || !description || !expirationDate) {
      return res.status(400).send({
        success: false,
        message: 'Code,description,expirationDate are required'
      })
    }
    const newVoucher = new voucherModel({
      code,
      type: 'freeShipping',
      description,
      expirationDate,
      createdAt: new Date()
    })

    await newVoucher.save()

    res.status(201).send({
      success: true,
      message: 'freeShipping voucher created successfully',
      voucher: newVoucher
    })
  } catch (err) {
    console.log('Error creating voucher', err)
    res.status(500).send({
      success: false,
      message: 'Error creating freeShipping voucher',
      error: err
    })
  }
}
