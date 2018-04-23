'use strict';

const
    login = require('./login.service'),
    news = require('./news.service'),
    cognitive = require("./cognitive.service");

module.exports = function (app) {

    /*Login*/
    app.post('/signin', login.signin);
    app.post('/signout', login.signout);

    /*News*/
    app.get('/news', news.getNews);
    app.post('/news', news.createNews);
    app.put('/news', news.updateNews);
    app.delete('/news', news.deleteNews);

    /*Cognitivie*/
    app.post("/cognitive/sentiment", cognitive.sentiment);
    app.post("/cognitive/keyphrases", cognitive.keyphrases);
};