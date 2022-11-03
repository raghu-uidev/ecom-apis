const productsModel = require('../models/products.model.js');

exports.getProducts = (req, res) => {
  const productId = req.params.id;
  productsModel.getProducts(productId, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Error in getting products"
      });
    else {
      data.forEach(product => {
        product.images = product.images.split('|');
      });
      res.send(data);
    }
  });
};

exports.addProduct = (req, res) => {
  console.log(req.body);
  const {title, description, price} = req.body;
  if(!title || !description || !price) {
    res.status(400).send({
      message: 'Bad request'
    });
    return;
  }

  productsModel.addProduct(title, description, price, (err, data) => {
    if(err) {
      res.status(500).send({
        message: 'Unable to add product'
      });
      return;
    }
    res.send({message: 'New product added successfully'});
  });

}

