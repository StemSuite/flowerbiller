import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const billSchema = new Schema({
	store: { type: String, required: true },
	date: { type: Date, required: true },
	fdate: String,
	markUpPercent:{ type: Number, required: true },
}, { timestamps: true });

const Bill = mongoose.model( 'bill', billSchema );

export default Bill;