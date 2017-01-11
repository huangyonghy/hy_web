var express = require('express');
var router = express.Router();

var fs = require("fs");
var path = require("path");
const crypto = require('crypto');

var pool = require('../lib/connect_db');

router.get('/', function (req, res, next) {
    res.render('login', {title: 'Hy-Web', register: true, action:'/register'});
});

router.post('/', function (req, res, next) {
    var name = req.body['name'];
    var passwd = req.body['passwd'];

    const hmac = crypto.createHmac('sha256', 'a secret');
    hmac.update(passwd);
    passwd = hmac.digest('hex');

    pool.query('select * from user_table where name=\'' + name + '\'', function (err, result) {
        if (err) {
            return next(err);
        }
        else {
            if (result.rowCount == 0) {
                insertUser(name, passwd, next);
                return res.redirect('/');
            }
            else {
                var error = new Error('User already exists!');
                return next(error);
            }
        }
        res.redirect('/register');
    });
});


function insertUser(name, passwd, next) {
    pool.query('INSERT INTO user_table (name, passwd) VALUES ($1, $2)', [name, passwd], function (err) {
        if (err) next(err);
    });
}

module.exports = router;
