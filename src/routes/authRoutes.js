import express from 'express'
import {
  loginController,
  registerContoller
} from '../controllers/authContoller.js'
import { createVoucher } from '../controllers/generateController.js'
import { isAdmin, requireSignIn } from '../middlewares/authMiddleware.js'
import { eligibilityController } from '../controllers/eligibilityController.js'
import { placeOrderController } from '../controllers/placeOrderController.js';
const router = express.Router()

router.post('/register', registerContoller)
router.post('/login', loginController)
router.post('/eligibleVouchers', requireSignIn, eligibilityController)
router.post(
  '/generateVouchers',
  requireSignIn,
  isAdmin,
  createVoucher
)
router.post('/placeOrder',requireSignIn,placeOrderController)

export default router
