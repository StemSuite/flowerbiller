import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const productSchema = new Schema({
	type: { type: Schema.Types.ObjectId, ref: 'productType', required: true },
	name: { type: String, required: true, unique: true },
	uom: { type: String, required: true },
	sizes: [String],
	daysToExp: { type: Number, required: false },
	varieties: [{
		name: { type: String, required: true },
		colors: [String],
		tags: [String],
	}]
}, { timestamps: true });

const Product = mongoose.model( 'product', productSchema );

export default Product; 