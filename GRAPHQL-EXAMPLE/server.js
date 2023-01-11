const path = require('path');
const express = require('express');

const { loadFilesSync } = require('@graphql-tools/load-files');
const { graphqlHTTP } = require('express-graphql');

const { makeExecutableSchema } = require('@graphql-tools/schema');

const typesArray = loadFilesSync(path.join(__dirname, '**/*.graphql'));
// const typesArray = loadFilesSync('**/*', {
//     extensions: ['graphql'],
//     resolvers: {
//         Query: {
//             products: (parent, args, context, info) => {
//                 console.log("Getting the products...");
//                 return parent.products;
//             },
//             orders: (parent) => {
//                 console.log("Getting the orders...");
//                 return parent.orders;
//             },
//         }
//     }
//   });
//const { makeExecutableSchema } = loadFilesSync( '@graphql-tools/schema'));


const schema = makeExecutableSchema ({
    typeDefs: typesArray
});

const root = {
    products: require('./products/products.model'),
    orders: require('./orders/orders.model'),
}

const app = express();

app.use('/graphql', graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true,
}));

app.listen(3000, () => {
    console.log('Running GraphQL server....');
});