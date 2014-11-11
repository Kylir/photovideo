/* jshint undef: true, node: true */

var conf = require('../conf');
var path = require('path');
var fs = require('fs');


function contentHandler(storage){

    /**
     * Function to save a photo in the DB
     * @param req
     * @param res
     * @param next
     */
    this.savePhoto = function(req, res, next){

        var body = req.body;

        if( ! isAValidPhotoObject(body) ){
            var err = new Error("Invalid photo parameters.");
            next(err);
        } else if( ! isFilePresent(body) ){
            var err = new Error("Photo file is missing.");
            next(err);
        } else {

            var photo = {};
            photo.name = body.name;
            if (body.legend) {
                photo.legend = body.legend;
            }
            photo.type = "image";
            photo.date = new Date();
            photo.visible = true;

            //Let's retrieve the DB
            var db = storage.getItem(conf.documentName);

            //Save the photo
            db.content.unshift(photo);
            updateDate(db);
            //Set the object to be updated
            storage.setItem(conf.documentName, db);

            res.json(photo);
        }
    };


    /**
     * Function to save a video in the DB
     * @param req
     * @param res
     * @param next
     */
    this.saveVideo = function(req, res, next){

        var body = req.body; //TODO: extract the correct values

        if( ! isAValidVideo(body) ){
            var err = new Error("Invalid video parameters.");
            next(err);
        }

        var video = {};
        video.name = body.name;
        if(body.legend){video.legend = body.legend;}
        video.type = "video";
        video.date = new Date();
        video.visible = true;

        //Let's retrieve the DB
        var db = storage.getItem(conf.documentName);

        //Save the video
        db.content.unshift(video);
        updateDate(db);
        //Set the object to be updated
        storage.setItem(conf.documentName, db);

        res.json(video);

    };

    /**
     * Function to save a news in the DB
     * @param req
     * @param res
     * @param next
     */
    this.saveNews = function(req, res, next){

        var body = req.body; //TODO: extract the correct values

        if( ! isAValidNews(body) ){
            var err = new Error("Invalid news parameters.");
            next(err);
        }

        var news = {};
        news.text = body.text;
        news.date = new Date();

        //Let's retrieve the DB
        var db = storage.getItem(conf.documentName);

        //Save the news
        db.news.unshift(news);
        updateDate(db);
        //Set the object to be updated
        storage.setItem(conf.documentName, db);

        res.json(news);

    };

    /**
     * Function to change the title in the DB
     * @param req
     * @param res
     * @param next
     */
    this.saveTitle = function(req, res, next){

        var body = req.body;

        if( ! isAValidTitle(body) ){
            var err = new Error("Invalid title parameters.");
            next(err);
        }

        //Let's retrieve the DB save and update
        var db = storage.getItem(conf.documentName);
        db.title = body.text;
        updateDate(db);
        storage.setItem(conf.documentName, db);

        res.json({text: body.text});

    };

    this.getSite = function(req, res, next){
        var db = storage.getItem(conf.documentName);
        res.render('site', db, function(err, html){
            if(err) { next(err); }
            res.send(html);
        });
    };

}

module.exports = contentHandler;


/**
 * Function to validate that the object passed has the name parameter.
 * Also validate that the physical files exists
 * @param photo the photo object
 */
function isAValidPhotoObject(photo){
    //TODO: check that name is present, check for the file and the thumbnail

    if( photo.name ) {
        return true
    } else {
        return false;
    }
}

/**
 * Function to validate that the object passed has the name parameter.
 * Also validate that the physical files exists
 * @param photo the photo object
 */
function isFilePresent(photo){
    //check the file is in the directory
    var imagePath = path.join(__dirname, "..", "public", "images", photo.name);

    console.log("Image path is: " + imagePath);

    return fs.existsSync(imagePath);

}

/**
 * Function to validate that the object passed has the name parameter
 * @param video the video object
 */
function isAValidVideo(video){
    if(video.name){ return true; }
    else{ return false; }
}

/**
 * Function to validate that the object passed has the text parameter
 * @param news the news object
 */
function isAValidNews(news){
    if(news.text){ return true; }
    else{ return false; }
}

/**
 * Function to validate that the object passed has the text parameter
 * @param title the title object
 */
function isAValidTitle(title){
    if(title.text){ return true; }
    else{ return false; }
}

/**
 * Function to update the last update field with the current timestamp
 * @param db the object with all the contents and metadata.
 */
function updateDate( db ){
    var now = new Date();
    db.lastUpdate = now;
}