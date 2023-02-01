import mongoose from "mongoose";
const Schema = mongoose.Schema;

const eventSchema = new Schema({
    store: {type: Schema.Types.ObjectId, ref: "store", required: true },
    title: { type: String, required: true },
    customer: { type: String, required: true },
    location: { type: String },
    date: { type: Date, required: true },
    items: [{
        variety: { type: Schema.Types.ObjectId, ref: "variety" }, 
        size: String,
        uom: String,
        quantity: Number
    }],
}, {timestamps: true});

const Event = mongoose.model("event", eventSchema);

export default Event; 