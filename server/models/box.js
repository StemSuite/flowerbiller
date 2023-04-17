import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const boxSchema = new Schema({
	type: { type: String, required: true, unique: true },
	perOfFB: { type: Number, required: true },
	CBF: { type: Number, required: true },
});

const Box = mongoose.model( 'box', boxSchema );

export default Box;