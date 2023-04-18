import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const shipmentSchema = new Schema({
	shipSH: { type: String, required: true },
	shippingDate: { type: Date, required: true },
	fshippingDate: String,
	arrivalDate: { type: Date, required: true },
	farrivalDate: String,
	itemCount: { type: Number, required: true },
	FBE: { type: Number, required: false },
	CBF: { type: Number, required: false },
	boxCharge: { type: Number, required: true },
	pricePerCBF: { type: Number, required: true },
	fuelCharge: { type: Number, required: true },
	cbfPrice: { type: Number, required: true },
	fuelPrice: { type: Number, required: true },
}, { timestamps: true });

const Shipment = mongoose.model( 'shipment', shipmentSchema );

export default Shipment;