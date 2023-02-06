import mongoose from "mongoose";
const Schema = mongoose.Schema;

const eventSchema = new Schema({
    store: { type: String, required: true },
    title: { type: String, required: true },
    customer: { type: String, required: true },
    date: { type: Date, required: true },
    fdate: String,
    location: { type: String },
    delivery: { 
        required: {type: Boolean},
        time: {type: String}
    },
    pickUp: { 
        required: {type: Boolean},
        time: {type: String}
    },
    items: [{
        product: { type: String, required: true},
        variety: { type: String, required: true},
        size: String,
        uom: { type: String, required: true},
        quantity: { type: Number, required: true},
    }],
}, {timestamps: true});

const Event = mongoose.model("event", eventSchema);

export default Event;