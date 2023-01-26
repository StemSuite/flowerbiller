import { productQueries, productMutations } from "./products/index.js";
import {purchaseQueries, purchaseMutations }from "./purchases/index.js";
import { standingOrderQueries, standingOrderMutations } from "./standing_orders/index.js";
import { shippingMethodQueries, shippingMethodMutations } from "./shipping_methods/index.js";
import { vendorQueries, vendorMutations } from "./vendors/index.js";
import { storeQueries, storeMutations } from "./stores/index.js";
import { eventMutations, eventQueries } from "./events/index.js";

const resolvers = {
    Query: {
        ...productQueries,
        ...purchaseQueries,
        ...standingOrderQueries,
        ...shippingMethodQueries,
        ...vendorQueries,
        ...storeQueries,
        ...eventQueries
    },
    Mutation: {
        ...productMutations,
        ...purchaseMutations,
        ...standingOrderMutations,
        ...shippingMethodMutations,
        ...vendorMutations,
        ...storeMutations,
        ...eventMutations
    }
}

export default resolvers;