import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const productTypeSchema = new Schema({
	name: { type: String, required: true },
	uoms: [{ type: String, required: true }],
	defaultDaysToExp: { type: Number, required: false },
}, { timestamps: true });

const ProductType = mongoose.model( 'productType', productTypeSchema );

export default ProductType; 