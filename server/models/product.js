import mongoose from "mongoose";
const Schema = mongoose.Schema;

const productSchema = new Schema({
    name: String,
    varieties: [String],
    lens: [String],
    uom: String
});

const Product = mongoose.model("product", productSchema);

export default Product; 