import Product from '../../../models/product.js';

const productMutations = {
    addProduct: async(_, {product}) => {
        let newProduct = new Product( product )
        return newProduct.save()
    }
}

export default productMutations;