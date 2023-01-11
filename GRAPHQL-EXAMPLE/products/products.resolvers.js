const productModel = require('./product.model');

module.exports = {
    Query: {
        products: () => {
            return productModel.getAllProducts();
        }
    }
}


// products: async (parent, args, context, info) => {
//     console.log("Getting the products...");
//     const product = await Promise.resolve(parent.products);
//     return product;
// },