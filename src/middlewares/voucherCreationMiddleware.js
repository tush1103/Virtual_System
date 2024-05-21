import { createBirthdayGiftVoucher, createCashVoucher, createFirstOrderVoucher, createFreeShippingVoucher, createPercentageVoucher, createWalletPointsVoucher } from "../controllers/generateController.js"

export const voucherCreationMiddleware = (req, res) => {
  const { type } = req.body

  if (!type) {
    return res
      .status(400)
      .send({ success: false, message: 'Voucher type is required' })
  }

  if (type == 'discountCash') {
    return createCashVoucher(req, res)
  } else if (type == 'discountPerc') {
    return createPercentageVoucher(req, res)
  } else if (type == 'walletPoints') {
    return createWalletPointsVoucher(req, res)
  } else if (type == 'firstOrder') {
    return createFirstOrderVoucher(req, res)
  } else if (type == 'birthdayGift') {
    return createBirthdayGiftVoucher(req, res)
  } else if (type == 'freeshippingVoucher') {
    return createFreeShippingVoucher(req, res)
  } else {
    return res
      .status(400)
      .send({ success: false, message: 'Invalid voucher type' })
  }
}

