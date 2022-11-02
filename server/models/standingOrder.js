import mongoose from "mongoose";
const Schema = mongoose.Schema;

const standingOrderSchema = new Schema({
    vendor: { type: Schema.Types.ObjectId, ref: "vendor" },
    startDate: Date,
    endDate: Date,
    arrivalDay: Number,
    items: [{
        prod: String,
        len: String,
        var: String,
        uom: String,
        boxCount: Number,
        boxType: String,
        qtyPerBox: Number,
        pricePerUnit: Number,
        totalQty: Number,
        totalPrice: Number,
    }],
}, {timestamps: true})

const StandingOrder = mongoose.model("standingOrder", standingOrderSchema);

export default StandingOrder;