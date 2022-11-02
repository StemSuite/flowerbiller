import Product from '../../../models/product.js'

const productQueries = {
    products: async () => {
        return Product.find()
    },
    
    product: async (_, args) => {
        return Product.findById(args.id)
    }
}

export default productQueries;
