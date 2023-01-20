import mongoose from "mongoose";
const Schema = mongoose.Schema;

const shippingMethodSchema = new Schema({
    name: { type: String, required: true },
    shortHand: { type: String, required: true, maxLength: 4 },
    shippingDays: { type: [{type: Number, min: 0, max: 6 }], required: true },
    daysToArrive: { type: Number, required: true },
});

const ShippingMethod = mongoose.model("shippingMethod", shippingMethodSchema);

export default ShippingMethod;