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
        return sortFileByDate(a,b);
    });

    console.log("Files: ", files);

    res.render('index', { title: "The list", images: files }, function(err, html){

        console.log(html);

    });

});

module.exports = router;



//Utils to sort the files
function sortFileByDate( file1, file2 ) {
    //TODO: add some constants for the directory path
    var fullPathA = path.join(__dirname, '..', 'public', 'images', 'thumbnails', file1 );
    var fullPathB = path.join(__dirname, '..', 'public', 'images', 'thumbnails', file2 );

    var mtimeA = fs.statSync(fullPathA).mtime.getTime();
    var mtimeB = fs.statSync(fullPathB).mtime.getTime();

    return mtimeB - mtimeA;
}