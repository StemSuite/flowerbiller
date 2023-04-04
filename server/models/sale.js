import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const SaleSchema = new Schema({
	store: { type: String, required: true },
	eventID: { type: Schema.Types.ObjectId, ref: 'event', required: false },
	dateSold: { type: Date, required: true },
	fdate: String,
	item: {
		product: { type: String, required: true },
		variety: { type: String, required: false },
		size: { type: String, required: false },
		uom: { type: String, required: true },
		quantity: { type: Number, required: true },
	},
	filledFrom: { type: Schema.Types.ObjectId, ref: 'purchase', required: false },
}, { timestamps: true });

const Sale = mongoose.model( 'sale', SaleSchema );

export default Sale; 