import mongoose from "mongoose";
const Schema = mongoose.Schema;

const productSchema = new Schema({
    type: { type: Schema.Types.ObjectId, ref: "productType", required: true },
    name: {type: String, required: true},
    uom: {type: String, required: true},
    sizes: [String],
}, {timestamps: true});

const Product = mongoose.model("product", productSchema);

export default Product; 