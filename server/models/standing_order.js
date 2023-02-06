import mongoose from "mongoose";
const Schema = mongoose.Schema;

const standingOrderSchema = new Schema({
    venSH: { type: String, required: true },
    shipSH: { type: String, required: true },
    startDate: { type: Date, required: true },
    fstartDate: { type: String },
    endDate: { type: Date },
    fendDate: { type: String },
    shippingDay: { type: Number, required: true },
    daysToArrive: { type: Number, required: true },
    items: [{
        product: { type: String, required: true },
        variety: { type: String, required: true },
        uom: { type: String, required: true },
        size: { type: String, required: true },
        boxCount: { type: Number, required: true },
        boxType: { type: String, required: true },
        qtyPerBox: { type: Number, required: true },
        pricePerUnit: { type: Number, required: true },
        totalQty: { type: Number, required: true },
        totalPrice: { type: Number, required: true },
    }],
}, {timestamps: true})

const StandingOrder = mongoose.model("standingOrder", standingOrderSchema);

export default StandingOrder;