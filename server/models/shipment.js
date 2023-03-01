import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const shipmentSchema = new Schema({
	shipSH: { type: String, required: true },
	shippingDate: { type: Date, required: true },
	fshippingDate: String,
	arrivalDate: { type: Date, required: true },
	farrivalDate: String,
	itemCount: { type: Number, required: true },
	boxCharge: { type: Number, required: false },
	cubicFeet: { type: Number, required: false },
	pricePerCF: { type: Number, required: false },
}, { timestamps: true });

const Shipment = mongoose.model( 'shipment', shipmentSchema );

export default Shipment;