import mongoose from "mongoose";
const Schema = mongoose.Schema;

const storeSchema = new Schema({
    number: Number,
    name: { type: String, required: true},
    shortHand: String,
    address: String,
});

const Store = mongoose.model("store", storeSchema);

export default Store; 