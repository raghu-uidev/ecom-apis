const jwt = require('jsonwebtoken');
const authConfig = require('../configs/auth.config.js');

verifyToken = (req, res, next) => {
   const authHeader = req.headers['x-authorization'];
   const token = authHeader && authHeader.split(' ')[1];
   console.log(token);
   if(!authHeader){
    res.status(403).send({
     message: 'No authorization token found'
    });
    return;
   }

   jwt.verify(token, authConfig.secretKey, (err, decodedData) => {
     if(err) {
        res.status(401).send({
         message: 'Unauthorized user.'
        });
        return;
     } else {
        next();
        return;
     }
   });
}

const authJWT = {
    verifyToken: verifyToken
}

module.exports = authJWT;