const sqlConnection = require('../models/db.js');
const Orders = {};

Orders.saveOrders = (userId, productsData, requestCallback) => {
    const insertQry = `insert into orders (user_id, product_id, quantity)  values(?, ?, ?)`;
    productsData.forEach((product, index) => {
        const {productId, quantity} = product;
        sqlConnection.query(insertQry, [userId, productId, quantity], (err, result) => {
            if(err) {
                requestCallback(err, null);
                return;
            }
            if(index === productsData.length -1) {
                requestCallback(null, result);
                return;
            }
        });
    });
}

Orders.getOrders = (userId, requestCallback) => {
    const selectQry = `select p.id, p.title, p.description, p.price, o.quantity from products as p, orders as o where find_in_set(p.id, o.product_id) !=0 and o.user_id= '${userId}'`;
    sqlConnection.query(selectQry, (err, result) => {
        if(err) {
            requestCallback(err, null);
            return;
        }
        requestCallback(null, result);
        return;
    });
}

module.exports = Orders;