import Product from '../../../models/product.js'
import ProductType from '../../../models/product_type.js'
import Variety from '../../../models/variety.js'

const productQueries = {
    productTypes: async () => {
        return ProductType.find()
    },

    productType: async (_, {id}) => {
        return Product.findById(id)
    },

    products: async () => {
        return Product.find().populate('type')
    },
    
    product: async (_, {id}) => {
        return Product.findById(id)
    },

    varieties: async () => {
       return Variety.find().populate({ path: 'product', populate: {path: 'type'} })
    },

    variety: async (_, {id}) => {
        return Variety.findById(id)
     },

     varietiesByProdID: async (_, {prodID}) => {
        return Variety.find({product: prodID})
     },
}

export default productQueries;