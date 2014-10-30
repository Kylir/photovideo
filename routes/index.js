var express = require('express');
var router = express.Router();
var fs = require('fs');
var path = require('path');



/* GET home page. */
router.get('/', function(req, res) {

    //Get the content of the image directory
    var dirName = path.join(__dirname, '..', 'public', 'images', 'thumbnails' );

    console.log('dirName: ' + dirName);

    var files = fs.readdirSync(dirName);

    files.sort(function(a, b) {
        var fullPathA = path.join(__dirname, '..', 'public', 'images', 'thumbnails', a );
        var fullPathB = path.join(__dirname, '..', 'public', 'images', 'thumbnails', b );

        var mtimeA = fs.statSync(fullPathA).mtime.getTime();
        var mtimeB = fs.statSync(fullPathB).mtime.getTime();

        return mtimeB - mtimeA;
    });

    console.log("Files: ", files);
    res.render('index', { images: files });

});

module.exports = router;
