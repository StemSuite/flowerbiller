import mongoose from "mongoose";
const Schema = mongoose.Schema;

const purchaseSchema = new Schema({
    ven: String,
    prod: String,
    len: String,
    uom: String,
    var: String,
    boxCount: Number,
    boxType: String,
    qtyPerBox: Number,
    pricePerUnit: Number,
    totalQty: Number,
    totalPrice: Number,
});

const Purchase = mongoose.model("purchase", purchaseSchema);

export default Purchase;