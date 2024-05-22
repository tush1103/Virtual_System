import mongoose, { Schema } from "mongoose";

const voucherSchema=new Schema({
    type:{
        type:String,
        enum:['discountCash','discountPerc','walletPoints','firstOrder','birthdayGift',],
        required:true
    },
    code:{
        type:String,
        required:true,
        unique:true
    },
    description:{
        type:String,
        required:true
    },
    discountAmount:{
        type:Number,
        default:0
    },
    discountPercentage:{
        type:Number,
        default:0
    },
    minimumCartAmount:{
        type:Number,
        default:0
    },
    walletPoint:{
        type:Number,
        default:0
    },
    walletCash:{
        type:Number,
        default:0
    },
    quantity:{
        type:Number,
        default:0
    },
    createdAt:{
        type:Date,
        default:Date.now
    },
    expirationDate:{
        type:Date,
        required:true
    },
    isActive:{
        type:Boolean,
        default:true
    }

})

export default mongoose.model('Voucher',voucherSchema);