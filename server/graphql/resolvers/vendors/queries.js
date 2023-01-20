import Vendor from '../../../models/vendor.js'

const vendorQueries = {
    vendors: async () => {
        return Vendor.find()
                .populate('shippingMethods')
    },
    
    vendor: async (_, args) => {
        return Vendor.findById(args.id)
                .populate('shippingMethods')
    }
}

export default vendorQueries;