module.exports = app => {
    const userController = require('../controllers/users.controller.js');
    const productsController = require('../controllers/products.controller.js');
    const cartController = require('../controllers/cart.controller.js');
    const orderController = require('../controllers/orders.controller.js');
    const authJWT = require('../middleware/authentication.js');
    let router = require('express').Router();

   /** Users Modules */

    // Register user
    router.post('/users/register', userController.register);

    // Login user
    router.post('/users/login', userController.login);

    // Update user details

    router.put('/users/update/:userId', [authJWT.verifyToken], userController.update);

    /** Products Modules */

    // Add product
    router.post('/products/addproduct', [authJWT.verifyToken], productsController.addProduct);

    // Get All products
    router.get('/products', [authJWT.verifyToken], productsController.getProducts);

    // Get specific product
    router.get('/products/:id', [authJWT.verifyToken], productsController.getProducts);

    /** Carts Modules */

    // Add products to the cart
    router.post('/cart/:cartId', [authJWT.verifyToken], cartController.addProductsToCart);

    // Get products from cart
    router.get('/cart/:cartId', [authJWT.verifyToken], cartController.getProductsFromCart);

    // Delete products from cart
    router.delete('/cart/:cartId/product/:productId', [authJWT.verifyToken], cartController.removeProductFromCart);

    /** Orders Modules */

    router.post('/orders/save-order/:userId', [authJWT.verifyToken], orderController.saveOrder);

    router.get('/orders/get-orders/:userId', [authJWT.verifyToken], orderController.getOrders);


    app.use('/api/v1', router);
}
