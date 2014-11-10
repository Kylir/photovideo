/* jshint undef: true, node: true */

var loki = require('lokijs');

//Create the instance of the loki object
exports.db = new loki('db.json');
exports.collection = exports.db.addCollection('documents');
exports.main = exports.collection.find({name: "main"});

/**
 * Function to add a new photo in the DB.
 * @param data the data passed by the user to create a new photo.
 * Should have at least a file name.
 * Can have the optional legend.
 * The date and type are set by the function.
 */
exports.saveNewPhoto = function( data ){

    console.log("Saving a photo.");

    var doc = {};

    doc.type = "image";
    doc.visible = true;
    doc.date = new Date();
    doc.name = data.name;
    if( data.legend ) { doc.legend = data.legend; }

    //retrieve the main doc
    exports.main.content.push(doc);

};


/**
 * Function to initialise the main document (will recreate if it exist).
 */
exports.initDb = function(){



};
