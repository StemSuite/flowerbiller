import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const eventSchema = new Schema({
	store: { type: String, required: true },
	title: { type: String, required: true },
	customer: { type: String, required: true },
	date: { type: Date, required: true },
	fdate: String,
	location: { type: String },
	itemCount: { type: Number, required: true }
}, { timestamps: true });

const Event = mongoose.model( 'event', eventSchema );

export default Event;