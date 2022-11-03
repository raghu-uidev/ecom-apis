const Orders = require('../models/orders.model.js');

exports.saveOrder = (req, res) => {
    const userId = req.params.userId;
    const productData = req.body.products;
    if(!req.body || !productData) {
        res.status(400).send('Bad Request');
        return;
    }
    productData.forEach((product, index) => {
        if(!product.productId || !product.quantity) {
                res.status(400).send({
                    message: `product id or product quantity missing at ${index+1} item`
                });
                return;
        }
    });

    Orders.saveOrders(userId, productData, (err, result) => {
        if(err) {
            res.status(500).send({
                message: 'Unable to save the orders'
            });
            return;
        }
        res.send({message: 'Orders saved successfully'});
        return;
    });

}

exports.getOrders = (req, res) => {
    const userId = req.params.userId;
    Orders.getOrders(userId, (err, result) => {
        if(err) {
            res.status(500).send({
                message: 'Unable to get the orders for this user'
            });
            return;
        }
        res.send({
            orders: result
        });
        return;
    })
}