import express from 'express';
import { loginController, registerContoller } from '../controllers/authContoller.js';
import { voucherCreationMiddleware } from '../middlewares/voucherCreationMiddleware.js';
import { isAdmin, requireSignIn } from '../middlewares/authMiddleware.js';
const router=express.Router();


router.post('/register',registerContoller);
router.post('/login',loginController);
router.post('./eligibleVouchers',requireSignIn,eligibilityController)
router.post('./generateVouchers',requireSignIn,isAdmin,voucherCreationMiddleware)

export default router