const sqlConnection = require('../models/db.js');
const Products = {};

Products.getProducts = (productId, resultCallback) => {
  let idClause = '';
  if(productId) {
   idClause = `and p.id=${productId}`;
  }
  sqlConnection.query(`SELECT p.id,p.title,
  p.description,p.price,
  GROUP_CONCAT(i.img_src SEPARATOR '|') AS images
  FROM products  AS p, 
  product_images AS i
  WHERE FIND_IN_SET(i.product_id, p.id) != 0 ${idClause} GROUP BY p.id;`, (err, result) => {
     if(err){
        resultCallback(err, null);
        return;
     }
     resultCallback(null, result);
     return;
  })
}

Products.addProduct = (title, description, price, resultCallback) => {
 const insertQry = `insert into products (title, description, price) values(?, ? , ?)`;
 sqlConnection.query(insertQry, [title, description, price], (err, result) => {
   if(err) {
      resultCallback(err, null);
      return;
   } 
   resultCallback(null, result);
   return;
 });
}

module.exports = Products;