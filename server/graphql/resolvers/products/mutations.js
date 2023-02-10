import Product from '../../../models/product.js';
import ProductType from '../../../models/product_type.js';

const productMutations = {

    addProductType: async(_, {productType}) => {
        let newProduct = new ProductType( productType )
        return newProduct.save()
    },

    addProduct: async(_, {product}) => {
        let newProduct = new Product( product )
        return newProduct.save()
    },

    addVariety: async(_, {productID, variety}) => {
        let newVariety = variety;
        return Product.findOneAndUpdate(
            {_id: productID}, 
            {$push: {varieties: newVariety}},
            {returnDocument: 'after'}
        ) 
    }
}

export default productMutations;