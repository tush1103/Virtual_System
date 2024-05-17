import mongoose, { Schema } from "mongoose";

const voucherSchema=new Schema({
    type:{
        type:String,
        enum:['discount','walletPoints','walletCash','firstOrder','birthdayGift'],
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
    triggeredProduct:{
        type:Schema.Types.ObjectId,
        ref:'Product'
    },
    additionalFreeProduct:{
        type:Schema.Types.ObjectId,
        ref:'Product'
    },
    firstOrder:{
        type:Number,
        default:0
    },
    birthdayGiftProduct:{
        type:Schema.Types.ObjectId,
        ref:'Product'
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