var express = require('express');
var router = express.Router();

var fs = require("fs");
var path = require("path");
const crypto = require('crypto');

var pool = require('../lib/connect_db');
var passport = require('../lib/myPassport');

router.get('/', function(req, res, next) {
    res.render('login', {title: 'Hy-Web', register: false, action:'/login'});
});

//router.post('/',
//    passport.authenticate('local', { failureRedirect: '/login' }),
//    function(req, res) {
//        res.redirect('/');
//    });

router.post('/',
    passport.authenticate('local', { successRedirect: '/',
        failureRedirect: '/login' }));

module.exports = router;
