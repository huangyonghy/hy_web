/**
 * Created by huangyong on 1/12/16.
 */
var express = require('express');
var router = express.Router();

var fs = require("fs");
var path = require("path");
var util = require('util');

var multiparty = require('multiparty');

/* GET music page. */
router.get('/mp3', function(req, res, next) {
    var name = req.query.name;
    //console.log(req.query)
    var mp3 = path.join(__dirname, '../public', "/music/"+name+".mp3");
    var stat = fs.statSync(mp3);

    res.writeHead(200, {
        'Content-Type': 'audio/mp3',
        'Content-Length': stat.size
    })

    var readableStream = fs.createReadStream(mp3);
    readableStream.pipe(res);
});

/* Post upload music page. */
router.post('/upload_music', function (req, res, next) {
    var form = new multiparty.Form({uploadDir: path.join(__dirname, '../public/music/')});
    form.parse(req, function (err, fields, files) {
        var filesTmp = JSON.stringify(files, null, 2);
        if (err) {
            //console.log('parse error: ' + err);
            next(err);
        }
        else {
            //console.log('parse files: ' + filesTmp);
            var inputFile = files.inputFile[0];
            var uploadedPath = inputFile.path;
            var dstPath = path.join(__dirname, '../public/music/') + inputFile.originalFilename;
            fs.rename(uploadedPath, dstPath, function (err) {
                if (err) {
                    //console.log('rename error: ' + err);
                    //next(err);
                } else {
                    //console.log('rename ok');
                    //res.redirect('/');
                }
                res.redirect('/');
            });
        }
    });
});

/* Post upload image page. */
router.post('/upload_image', function (req, res, next) {
    var form = new multiparty.Form({uploadDir: path.join(__dirname, '../public/images/')});
    form.parse(req, function (err, fields, files) {
        var filesTmp = JSON.stringify(files, null, 2);
        if (err) {
            //console.log('parse error: ' + err);
            next(err);
        }
        else {
            //console.log('parse files: ' + filesTmp);
            var inputFile = files.inputFile[0];
            var uploadedPath = inputFile.path;
            var dstPath = path.join(__dirname, '../public/images/') + inputFile.originalFilename;
            fs.rename(uploadedPath, dstPath, function (err) {
                if (err) {
                    //console.log('rename error: ' + err);
                    //next(err);
                } else {
                    //console.log('rename ok');
                    //res.redirect('/');
                }
                res.redirect('/');
            });
        }
    });
});


router.get('/MV', function(req, res, next) {
    var name = req.query.name;
    var mp4 = path.join(__dirname, '../public', "/MV/"+name+".flv");
    var stat = fs.statSync(mp4);

    res.writeHead(200, {
        'Content-Type': 'video/mp4',
        'Content-Length': stat.size
    })

    var readableStream = fs.createReadStream(mp4);
    readableStream.pipe(res);
});

router.get('/books', function(req, res, next) {
    var name = req.query.name;
    console.log(req.query)
    var book = path.join(__dirname, '../public', "/books/"+name);
    var stat = fs.statSync(book);

    var readableStream = fs.createReadStream(book);
    readableStream.pipe(res);
});

module.exports = router;
