import express from 'express';
import { loginController, registerContoller } from '../controllers/authContoller.js';
const router=express.Router();


router.post('/register',registerContoller);
router.post('/login',loginController);
// router.get('./eligibleVouchers',requiresSignIn,eligibleController)
// router.post('./generateVouchers',requiresSignIn,isAdmin,generateController)
// router.get('./vouchersController',requiresSignIn,vouchersController)

export default router