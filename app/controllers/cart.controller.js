const Cart = require('../models/cart.model.js');

exports.addProductsToCart = (req, res) => {
    const cartId = req.params.cartId;
    const productData = req.body.products;
    if(!productData || productData.length === 0) {
        res.status(400).send({
            message: 'product details missing'
        });
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

   

    Cart.addProductToCart(cartId, productData, (err, result) => {
        if(err) {
            res.status(500).send({
                message: 'unable to add product to cart'
            });
            return;
        } else {
            res.send(result.message);
            return;
        }
    });
    
}

exports.getProductsFromCart = (req, res) => {
    const cartId = req.params.cartId;
    Cart.getProductsFromCart(cartId, (err, result) => {
        if(err) {
            res.status(500).send(err);
            return;
        }
        res.send(result);
        return;
    });
}

exports.removeProductFromCart = (req, res) => {
    const {cartId, productId} = req.params;
    Cart.removeProductFromCart(cartId, productId, (err, result) => {
        if(err) {
            res.status(500).send(err);
            return;
        }
        res.send({message: `Product with id ${productId} is removed from cart successfully`});
        return;
    });
}