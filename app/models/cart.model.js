const sqlConnection = require('../models/db.js');
const Cart = {};

Cart.addProductToCart = (cartId, productData, resultCallback) => {
   
    productData.forEach((product, index) => {
        const {productId, quantity} = product;
        const insertQry = `INSERT into cart (cart_id, product_id, quantity) VALUES(?, ?, ?) ON DUPLICATE KEY UPDATE quantity = ${quantity}`;
        sqlConnection.query(insertQry, [cartId, productId, quantity], (err, result) => {
            if(err) {
               resultCallback(err, null);
               return;
            } else {
                if(index === productData.length-1) {
                    resultCallback(null, {message: 'products added to cart successfully'});
                    return;
                }
            }
       });
    });
}

Cart.getProductsFromCart = (cartId, resultCallback) => {
    const selectQry = `SELECT p.id, p.title,p.description,p.price,c.quantity FROM products  AS p, cart AS c WHERE FIND_IN_SET(c.product_id, p.id) != 0  and c.cart_id='${cartId}'`;
    sqlConnection.query(selectQry, (err, result) => {
        if(err) {
           resultCallback(err, null);
           return;
        }
        resultCallback(null, result);
        return;
    });
}

Cart.removeProductFromCart = (cartId, productId, resultCallback) => {
    const deleteQry = `delete from cart as c where c.cart_id='${cartId}' and c.product_id='${productId}'`;
    sqlConnection.query(deleteQry, (err, result) => {
        if(err) {
            resultCallback(err, null);
            return;
        }
        resultCallback(null, result);
        return;
    });
}

module.exports = Cart;