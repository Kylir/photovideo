/* jshint undef: true, node: true */

var Content = require('./content');

module.exports = exports = function(app, storage) {

    //Define the handlers
    var contentHandler = new Content(storage);

    //Define the route(s) for the contents
    app.post('/photo/', contentHandler.savePhoto);
    app.post('/video/', contentHandler.saveVideo);
    app.post('/news/', contentHandler.saveNews);
    app.post('/title/', contentHandler.saveTitle);

    app.get('/site/', contentHandler.getSite);



};
