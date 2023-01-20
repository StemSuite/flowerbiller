import { productQueries, productMutations } from "./products/index.js";
import {purchaseQueries, purchaseMutations }from "./purchases/index.js";
import { standingOrderQueries, standingOrderMutations } from "./standOrders/index.js";
import { shippingMethodQueries, shippingMethodMutations } from "./shipping_methods/index.js";
import { vendorQueries, vendorMutations } from "./vendors/index.js";
import {storeQueries, storeMutations } from "./stores/index.js";

const resolvers = {
    Query: {
        ...productQueries,
        ...purchaseQueries,
        ...standingOrderQueries,
        ...shippingMethodQueries,
        ...vendorQueries,
        ...storeQueries
    },
    Mutation: {
        ...productMutations,
        ...purchaseMutations,
        ...standingOrderMutations,
        ...shippingMethodMutations,
        ...vendorMutations,
        ...storeMutations
    }
}

export default resolvers;