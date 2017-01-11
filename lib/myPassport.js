/**
 * Created by huangyong on 12/23/16.
 */
var crypto = require('crypto');
var myPassport = require('passport');
var pool = require('./connect_db');

module.exports = myPassport;

var Strategy = require('passport-local').Strategy;

//define passport strategy
myPassport.use(new Strategy(
    function (username, password, cb) {
        var hmac = crypto.createHmac('sha256', 'a secret');
        hmac.update(password);
        password = hmac.digest('hex');
        pool.query('select * from user_table where name=\'' + username + '\'', function (err, result) {
            if (err) {
                return cb(err);
            }
            if (result.rowCount == 0) {
                return cb(null, false);
            }
            var sqlPasswd = result.rows[0].passwd;
            if (sqlPasswd != password) {
                return cb(null, false);
            }
            return cb(null, result.rows[0]);
        });
    }));

myPassport.serializeUser(function (user, cb) {
    cb(null, user._id);
});

myPassport.deserializeUser(function (_id, cb) {
    pool.query('select _id from user_table where _id=\'' + _id + '\'', function (err, result) {
        if (err) {
            return cb(err);
        }
        if (result.rowCount == 0) {
            return cb(null, false);
        }
        return cb(null, result.rows[0]);
    });
});
