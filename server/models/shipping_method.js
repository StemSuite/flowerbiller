import mongoose from "mongoose";
const Schema = mongoose.Schema;

const shippingMethodSchema = new Schema({
    name: { type:String, required: true },
    shortHand: { type:String, required: true, maxLength: 4 },
    arrivalDays: [ Number],    
});

const ShippingMethod = mongoose.model("shippingMethod", shippingMethodSchema);

export default ShippingMethod;