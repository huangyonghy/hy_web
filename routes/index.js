var express = require('express');
var router = express.Router();
var fs = require("fs");
var path = require("path");

var pool = require('../lib/connect_db');

/* GET home page. */
router.get('/', function (req, res, next) {
    getFiles(function (music_files, image_files, articles) {
        res.render('index', {title: "Huangyong's WebHome", user: req.user,
            image_files:image_files, music_files: music_files, articles:articles});
    });
});

router.post('/', function (req, res, next) {
    console.log(req.body);
    var result = {hello: "hello Back"};
    res.send(JSON.stringify(result));
});

function getFiles(fn) {
    fs.readdir(path.join(__dirname, '../public/music/'), function (err, files) {
        if (err) {
            next(err);
        }
        var musicFiles = [];
        files.forEach(function (file) {
            if (file.slice(-4) == ".mp3") {
                musicFiles.push(file.slice(0, -4));
            }
        });
        fs.readdir(path.join(__dirname, '../public/images/'), function (err, files) {
            if (err) {
                next(err);
            }
            var imagesFiles = [];
            files.forEach(function (file) {
                if (file.slice(-4) == ".jpg" || file.slice(-4) == ".png") {
                    imagesFiles.push(file);
                }
            });
            pool.getDiary(function(err, articles) {
                fn(musicFiles, imagesFiles, articles);
            });
        });
    });
}

router.get('/game', function (req, res, next) {
    res.sendFile(path.join(__dirname, "../public/htmls/game.html"));
});

module.exports = router;
