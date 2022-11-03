const User = require('../models/users.model.js');

exports.register = (req, res) => {
    if(!req.body.name){
        res.status(400).send({
            message: 'User name is required'
        });
        return;
    }
    if(!req.body.password){
        res.status(400).send({
            message: 'User password is required'
        });
        return;
    }
    if(!req.body.email){
        res.status(400).send({
            message: 'User email is required'
        });
        return;
    }

    const user = new User({
        name: req.body.name,
        password: req.body.password,
        email: req.body.email
    });

    User.register(user, (err, result) => {
        console.log(err);
        if(err) {
            res.status(500).send({message: err.message || 'Something went wrong while creating user'});
            return;
        }
        res.send(result);
        return;
    });

    //res.send('In user regisetr API controller');
}

exports.login = (req, res) => {
    if(!req.body){
        res.status(400).send({message: 'Email and password required'});
        return;
    }

    if(!req.body.email){
        res.status(400).send({message: 'Email is required'});
        return;
    }

    if(!req.body.password){
        res.status(400).send({message: 'Password required'});
        return;
    }

    const user = new User({
        email: req.body.email,
        password: req.body.password
    });

    User.login(user, (err, result) => {
        if(err) {
            res.status(500).send({message: err.message || 'Error while logging in. Please try again'});
            return;
        }
        res.send(result);
        return;
    });
}

exports.update = (req, res) => {
    const userId =  req.params.userId;
    const {name, password} = req.body;
    if(!name || !password) {
        res.status(400).send({message: 'Bad request'});
        return;
    }

    User.update(userId, name, password, (err, result) => {
        if(err) {
            res.status(500).send(err);
            return;
        }
        res.send(result);
        return;
    });
}