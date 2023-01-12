const productModel = require('./products.model');

module.exports = {
    Query: {
        products: () => {
            return productModel.getAllProducts();
        },
        productsByPrice: (_, args) => {
            return productsModel.productByPrice(args.min, args.max);
        }
    }
}


// products: async (parent, args, context, info) => {
//     console.log("Getting the products...");
//     const product = await Promise.resolve(parent.products);
//     return product;
// },