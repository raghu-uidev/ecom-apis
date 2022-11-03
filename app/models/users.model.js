const sqlConnection = require('../models/db.js');
const bcrypt = require('bcrypt');
const uuid = require('uuid');
const jwt = require('jsonwebtoken');
const authConfig = require('../configs/auth.config.js');
const { password } = require('../configs/db.config.js');

const User = function(user) {
    this.name = user.name;
    this.password = user.password;
    this.email = user.email;
}

User.register = (newUser, resultCallback) => {
    const name = newUser.name;
    const email = newUser.email;
    const password = newUser.password;
    const userId = uuid.v4();
    const cartId = uuid.v4();
    const saltRounds = 10;
    const userInsertQry = `INSERT INTO users (user_name, email, password, user_id, cart_id) VALUES(?, ?, ?, ?, ?)`

    sqlConnection.query(`select * from users where email='${email}'`, (err, result) => {
        if(err) {
            resultCallback(err, null);
            return;
        }
        if(result && result.length > 0) {
            resultCallback({message: 'User already existed with this email'}, null);
            return;
        }
        
        bcrypt.hash(password, saltRounds, (err, encryptedPassword) => {
            if(err) {
                resultCallback(err, null);
                return;
            } else {
                sqlConnection.query(userInsertQry, [name, email, encryptedPassword, userId, cartId], (err, result) => {
                    if(err) {
                        resultCallback(err, null);
                        return;
                    }
                    resultCallback(null, {message: 'User created successfully'});
                    return;
                });
            }
        });


     
    })
}


User.login = (user, resultCallback) => {
    const email = user.email;
    const password = user.password;
    const userQuery = `select * from users where email='${email}'`;
    sqlConnection.query(userQuery, (err, result) => {
        if(err){
            resultCallback(err, null);
        }
        if(result && result.length > 0) {
            const encryptedPassword = result[0].password;
            const userId = result[0].user_id;
            const cartId = result[0].cart_id;
            // Authentication
            const token = jwt.sign({id: userId}, authConfig.secretKey, {expiresIn: '2h'});
            let userData = {
                userId: userId,
                cartId: cartId,
                token: token
            };
            bcrypt.compare(password, encryptedPassword, (err, isPasswordMatched) => {
                if(err){
                    resultCallback(err, null);
                    return;
                }
                if(isPasswordMatched) {
                    resultCallback(null, userData);
                    return;
                } else {
                    resultCallback({message: 'User password is invalid or not matched'}, null);
                    return;
                }
            });  
        } else {
            resultCallback({message: 'No user exist with this email and password'}, null);
        }
    })
}


User.update = (userId, userName, password, resultCallback) => {
    const saltRounds = 10;
    bcrypt.hash(password, saltRounds, (err, encryptedPassword) => {
        if(err) {
            resultCallback(err, null);
            return;
        } else {
            const updateQry = `update users set user_name='${userName}', password='${encryptedPassword}' where user_id= '${userId}';`;
            sqlConnection.query(updateQry, (err, result) => {
                if(err) {
                    resultCallback(err, null);
                    return;
                }
                resultCallback(null, {message: 'User updated successfully'});
                return;
            });
        }
    });
}
module.exports = User;