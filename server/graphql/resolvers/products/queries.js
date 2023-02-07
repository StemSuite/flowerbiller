import Product from '../../../models/product.js'
import ProductType from '../../../models/product_type.js'

const productQueries = {
    productTypes: async () => {
        return ProductType.find()
    },

    productType: async (_, {id}) => {
        return Product.findById(id)
    },

    products: async () => {
        return Product.find().sort({ name: 1})
    },
    
    product: async (_, {id}) => {
        return Product.findById(id)
    },

    varieties: async () => {
        return Product.aggregate([
            { $unwind: {
                    path: "$varieties",
                }
            },
             { $project: {
                    _id: "$varieties._id", 
                    product: "$name",
                    variety: "$varieties.name",
                    colors: "$varieties.colors",
                    tags: "$varieties.tags"
                }
            },
            { $sort : { product : 1, variety: 1 }}
        ])
    }

}

export default productQueries;