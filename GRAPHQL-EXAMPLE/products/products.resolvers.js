const productModel = require('./products.model');

module.exports = {
    Query: {
        products: () => {
            return productModel.getAllProducts();
        },
        productsByPrice: (_, args) => {
            return productModel.getProductsByPrice(args.min, args.max);
        },
        product: (_, args) => {
            return productModel.getProductByID(args.id);
        }
    }
};


// products: async (parent, args, context, info) => {
//     console.log("Getting the products...");
//     const product = await Promise.resolve(parent.products);
//     return product;
// },