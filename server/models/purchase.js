import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const purchaseSchema = new Schema({
	shipment: { type: Schema.Types.ObjectId, ref: 'shipment', required: true },
	standingOrder: { type: Schema.Types.ObjectId, required: false },
	standingOrderItem: { type: Schema.Types.ObjectId, required: false },
	preBook: { type: Schema.Types.ObjectId, required: false },
	vendor: { type: String, required: true },
	shippingDate: { type: Date, required: true },
	arrivalDate: { type: Date, required: true },
	expirationDate: { type: Date, required: false },
	inventory: { type: Number, required: true },
	box: [{
		type: { type: String, required: true },
		perOfFB: { type: Number, required: true },
		CBF: { type: Number, required: true },
	}],
	landedPrice: { type: Number, required: false },
	item: { 
		product: { type: String, required: true },
		variety: { type: String, required: false },
		uom: { type: String, required: true },
		size: { type: String, required: false },
		boxCount: { type: Number, required: true },
		boxType: { type: String, required: true },
		qtyPerBox: { type: Number, required: true },
		pricePerUnit: { type: Number, required: false },
		totalQty: { type: Number, required: true },
		totalPrice: { type: Number, required: false },
	}
}, { timestamps: true });

const Purchase = mongoose.model( 'purchase', purchaseSchema );

export default Purchase;