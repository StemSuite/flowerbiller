import mongoose from "mongoose";
const Schema = mongoose.Schema;

const varietySchema = new Schema({
    product: {type: Schema.Types.ObjectId, ref: "product", required: true},
    name: {type: String, required: true},
    colors: [String],
    tags: [String],
}, {timestamps: true});

const Variety = mongoose.model("variety", varietySchema);

export default Variety; 