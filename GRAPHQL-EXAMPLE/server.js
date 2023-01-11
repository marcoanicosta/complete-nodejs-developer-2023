const path = require('path');
const express = require('express');

const { loadFilesSync } = require('@graphql-tools/load-files');
const { graphqlHTTP } = require('express-graphql');

const { makeExecutableSchema } = require('@graphql-tools/schema');
const typesArray = loadFilesSync('**/*', {
    extensions: ['graphql'],
  });
const resolversArray = loadFilesSync(path.join(__dirname, '**/*.resolvers.js'));


const schema = makeExecutableSchema ({
    typeDefs: typesArray,
    resolvers: {
        Query: {
            products: async (parent, args, context, info) => {
                console.log("Getting the products...");
                const product = await Promise.resolve(parent.products);
                return product;
            },
            orders: (parent) => {
                console.log("Getting the orders...");
                return parent.orders;
            },
        }
    }
});


const app = express();

app.use('/graphql', graphqlHTTP({
    schema: schema,
    graphiql: true,
}));

app.listen(3000, () => {
    console.log('Running GraphQL server....');
});