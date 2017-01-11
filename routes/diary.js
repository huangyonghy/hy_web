var express = require('express');
var router = express.Router();
var url = require('url');
var querystring = require('querystring');

var pool = require('../lib/connect_db');
var passport = require('../lib/myPassport');

router.get('/add', require('connect-ensure-login').ensureLoggedIn(), function(req, res, next) {
    pool.getUserNameFromId(req.user._id, function(err, name){
        if (err) {
            res.redirect('/');
        }
        else {
            res.render('diary_add', {users: name});
        }
    });
});

router.post('/add', function(req, res, next) {
    //console.log(req.body.name, req.body.title, req.body.content);
    pool.addDiary(req.body.name, req.body.title, req.body.content, function(err) {
       if (err) {
           res.redirect('/diary/add');
       }
        else {
           res.redirect('/');
       }

    });
});

router.get('/', function(req, res, next) {
    var date = querystring.parse(url.parse(req.url).query)['date'];
    pool.getDiaryContentByDate(date, function(err, result) {
        if (err) {
            next(err);
        }
        else {
            result.date = result.date.toDateString();
            res.render('diary_content', {diary: result});
        }
    })
});

module.exports = router;
