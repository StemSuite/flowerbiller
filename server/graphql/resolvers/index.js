import { productQueries, productMutations } from "./products/index.js";
import { standingOrderQueries, standingOrderMutations } from "./standing_orders/index.js";
import { shippingMethodQueries, shippingMethodMutations } from "./shipping_methods/index.js";
import { vendorQueries, vendorMutations } from "./vendors/index.js";
import { storeQueries, storeMutations } from "./stores/index.js";
import { eventMutations, eventQueries } from "./events/index.js";
import { shipmentQueries }  from "./shipments/index.js"

const resolvers = {
    Query: {
        ...productQueries,
        ...standingOrderQueries,
        ...shippingMethodQueries,
        ...vendorQueries,
        ...storeQueries,
        ...eventQueries,
        ...shipmentQueries
    },
    Mutation: {
        ...productMutations,
        ...standingOrderMutations,
        ...shippingMethodMutations,
        ...vendorMutations,
        ...storeMutations,
        ...eventMutations
    }
}

export default resolvers;