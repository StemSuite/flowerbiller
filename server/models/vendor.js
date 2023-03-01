import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const vendorSchema = new Schema({
	name: { type: String, required: true },
	shortHand: { type: String, required: true, maxLength: 4 },
	shippingMethods: [{
		name: { type: String, required: true },
		shortHand: { type: String, required: true },
		shippingDays: { type: [Number], required: true },
		daysToArrive: { type: Number, required: true },
	}],
});

const Vendor = mongoose.model( 'vendor', vendorSchema );

export default Vendor;