import ShippingMethod from '../../../models/shipping_method.js'

const shippingMethodQueries = {
    shippingMethods: async () => {
        return ShippingMethod.find()
    },

    shippingMethod: async (_, args) => {
        return ShippingMethod.findById(args.id)
    }
}

export default shippingMethodQueries;