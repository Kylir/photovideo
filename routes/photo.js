/* jshint undef: true, node: true */

var router = require('express').Router();
var db = require('../db/persistence');

/**
 * Function to send a new path to a photo.
 * POST /photo/
 *
 */
router.post('/', function(req, res) {

    //Read the parameter from the body
    var data = req.body;

    //Validate the data passed
    if( ! isValid(data) ){
        var err = new Error('Invalid data passed.');
        throw err;
    }

    //update the document
    db.saveNewPhoto( data );

    res.json({code: "ok"});
});


/**
 * Validation function to check that we do have all the required parameters
 *
 * TODO: Check that the file and the minified version exist in the image directory.
 *
 */
function isValid( data ){
    return ( data && data.name );
}

module.exports = router;