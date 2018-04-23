'use strict';
var fs = require('fs');

function createNews(req, res) {
    console.log('POST - /api/createNews');
}

function getNews(req, res) {
    console.log('GET - /api/getNews');
    res.send(readFile("tweets.json"));    
}

function updateNews(req, res) {
    console.log('POST - /api/updateNews');
}

function deleteNews(req, res) {
    console.log('POST - /api/deleteNews');
}

function readFile(fileName) {
    return JSON.parse(fs.readFileSync(fileName, 'utf8'));
}

this.createNews = createNews;
this.getNews = getNews;
this.updateNews = updateNews;
this.deleteNews = deleteNews;

module.exports = this;