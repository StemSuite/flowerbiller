import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const soldItemSchema = new Schema({
	eventID: { type: Schema.Types.ObjectId, ref: 'event', required: false },
	product: { type: String, required: true },
	variety: { type: String, required: false },
	size: { type: String, required: false },
	uom: { type: String, required: true },
	quantity: { type: Number, required: true },
	dateSold: { type: Date, required: true },
	fdate: String,
}, { timestamps: true });

const SoldItem = mongoose.model( 'soldItem', soldItemSchema );

export default SoldItem; 