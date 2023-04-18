import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const vendorSchema = new Schema({
	name: { type: String, required: true },
	shortHand: { type: String, required: true, maxLength: 4, unique: true },
	shippingMethods: [{
		name: { type: String, required: true },
		shortHand: { type: String, required: true },
		shippingDays: { type: [Number], required: true },
		daysToArrive: { type: Number, required: true },
	}],
	boxes: [{
		type: { type: String, required: true },
		FBE: { type: Number, required: true },
		CBF: { type: Number, required: true },
	}]
});

const Vendor = mongoose.model( 'vendor', vendorSchema );

export default Vendor;