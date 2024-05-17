import mongoose,{Schema} from 'mongoose';

const redemptionSchema=new Schema({
    userId:{
        type:Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    voucherId:{
        type:Schema.Types.ObjectId,
        ref:'Voucher',
        required:true
    },
    redeemedAt:{
        type:Date,
        default:Date.now
    }
})

export default mongoose.model('Redemption',redemptionSchema)