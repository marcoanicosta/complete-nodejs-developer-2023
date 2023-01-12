const orderModel = require('./orders.model');

module.exports = {
    Query: {
        orders: () => {
            return orderModel.getAllOrders();
        }
    }
};



// (parent) => {
//     console.log("Getting the orders...");
//     return parent.orders;
// },