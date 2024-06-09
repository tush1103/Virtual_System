export const validateVoucher = (req, res, next) => {
  const { total, voucherId } = req.body
  if (!Number.isInteger(total) || total < 0) {
    return res
      .status(400)
      .json({ message: 'Total amount should be a positive integer' })
  }
  if (typeof voucherId !== 'string' || voucherId.length !== 24) {
    return res.status(400).send({ message: 'Invalid voucherId format' })
  }
  next()
}
