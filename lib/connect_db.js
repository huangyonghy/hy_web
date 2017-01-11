/**
 * Created by huangyong on 12/8/16.
 */
var config = {
    pg_connectStr: "postgres://postgres:moke@127.0.0.1/huheren"
};

var http = require('http');
var Pool = require('pg').Pool;

var config = {
    host: 'localhost',
    user: 'huangyong',
    password: 'huangyong123',
    database: 'exampledb',
};

// create the pool somewhere globally so its lifetime
// lasts for as long as your app is running
var pool = new Pool(config);

pool.getUserList = function(fn){
    var users = {};
    this.query('select * from user_table' , function (err, result) {
        if (err) {
            users = {};
        }
        else {
            if (result.rowCount > 0) {
                for (var i =0; i<result.rowCount; i++ ) {
                    var sqlName = result.rows[i].name;
                    var sqlPasswd = result.rows[i].passwd;
                    users[sqlName] = sqlPasswd;
                }
            }
        }
        fn(err, users);
    });
}

pool.getUserNameFromId = function(_id, fn){
    var name = '';
    this.query('select * from user_table where _id=($1)', [_id], function (err, result) {
        if (!err) {
            name = result.rows[0].name;
        }
        fn(err, name);
    });
}

pool.addDiary = function(name, title, content, fn){
    var now = new Date();
    this.query('INSERT INTO diary (user_name, title, content, date, timeString) VALUES ($1, $2, $3, $4, $5)', [name, title, content, now, now.toString()], function (err) {
        fn(err);
    });
};

pool.getDiary = function(fn){
    this.query('select * from diary', function (err, result) {
        if (!err) {
            fn(err, result.rows);
        }
    });
};

pool.getDiaryContentByDate = function(date, fn){
    this.query('select * from diary where timeString=($1)', [new Date(date).toString()], function (err, result) {
        if (!err) {
            fn(err, result.rows[0]);
        }
        else {
            fn(err);
        }
    });
};

module.exports = pool;
//pool.query('INSERT INTO visit (date) VALUES ($1)', [new Date()], function (err) {
//    if (err) return onError(err);
//
//    // get the total number of visits today (including the current visit)
//    pool.query('SELECT COUNT(date) AS count FROM visit', function (err, result) {
//        // handle an error from the query
//        if (err) return onError(err);
//        res.writeHead(200, {'content-type': 'text/plain'});
//        res.end('You are visitor number ' + result.rows[0].count);
//    });
//});

//
//pool.query('CREATE TABLE IF NOT EXISTS visit (date timestamptz)').then(function () {
//    console.log('server is listening on 3001')
//});