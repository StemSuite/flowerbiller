import Product from '../../../models/product.js';
import ProductType from '../../../models/product_type.js';
import Variety from '../../../models/variety.js';

const productMutations = {

    addProductType: async(_, {productType}) => {
        let newProduct = new ProductType( productType )
        return newProduct.save()
    },

    addProduct: async(_, {product}) => {
        let newProduct = new Product( product )
        return newProduct.save()
    },

    addVariety: async(_, {variety}) => {
        let newVariety = new Variety (variety)
        return newVariety.save()
    }
}

export default productMutations;