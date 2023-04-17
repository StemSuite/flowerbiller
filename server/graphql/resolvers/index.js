import { productQueries, productMutations } from './products/index.js';
import { purchasesQueries, purchasesMutations } from './purchases/index.js';
import { standingOrderQueries, standingOrderMutations } from './standing_orders/index.js';
import { shippingMethodQueries, shippingMethodMutations } from './shipping_methods/index.js';
import { vendorQueries, vendorMutations } from './vendors/index.js';
import { storeQueries, storeMutations } from './stores/index.js';
import { eventMutations, eventQueries } from './events/index.js';
import { shipmentQueries }  from './shipments/index.js';
import { saleMutations, saleQueries } from './sales/index.js';
import { preBookMutations, preBookQueries } from './prebooks/index.js';
import { billMutations, billQueries } from './bills/index.js';
import { boxMutations, boxtQueries } from './boxes/index.js';

const resolvers = {
	Query: {
		...productQueries,
		...purchasesQueries,
		...standingOrderQueries,
		...shippingMethodQueries,
		...vendorQueries,
		...storeQueries,
		...eventQueries,
		...shipmentQueries,
		...saleQueries,
		... preBookQueries,
		... billQueries,
		... boxtQueries
	},
	Mutation: {
		...productMutations,
		...purchasesMutations,
		...standingOrderMutations,
		...shippingMethodMutations,
		...vendorMutations,
		...storeMutations,
		...eventMutations,
		...saleMutations,
		... preBookMutations,
		... billMutations,
		... boxMutations
	}
};

export default resolvers;