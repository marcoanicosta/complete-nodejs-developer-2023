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
    },
    Mutation: {
        addNewProduct: (_, args) => {
            return productModel.addNewProduct(args.id, args.description, args.price);
        }
    }
};


// products: async (parent, args, context, info) => {
//     console.log("Getting the products...");
//     const product = await Promise.resolve(parent.products);
//     return product;
// },