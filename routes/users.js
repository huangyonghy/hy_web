var express = require('express');
var router = express.Router();

var pool = require('../lib/connect_db');
var passport = require('../lib/myPassport');

/* GET users listing. */
router.get('/', require('connect-ensure-login').ensureLoggedIn(), function(req, res, next) {
    pool.getUserList(function(err, users){
        if (err) {
            res.redirect('/');
        }
        else {
            res.render('userList', {users: users});
        }
    });
});


module.exports = router;
