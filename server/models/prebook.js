import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const preBookSchema = new Schema({
	vendor: { 
		name: { type: String, required: true },
		shortHand: { type: String, required: true }
	},
	venSH: String,
	shippingMethod: {
		name: { type: String, required: true },
		shortHand: { type: String, required: true }
	},
	shipSH: String,
	shippingDate: { type: Date, required: true },
	fshippingDate: { type: String },
	arrivalDate: { type: Date, required: true },
	itemCount: { type: Number, required: true }
}, { timestamps: true });

const PreBook = mongoose.model( 'preBook', preBookSchema );

export default PreBook;