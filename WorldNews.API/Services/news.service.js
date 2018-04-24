'use strict';

const uuidv4 = require('uuid/v4');
var fs = require('fs');
var azureTable = require('azure-table-node');
var postFeedTableName = "postfeed";
var moment = require('moment');

function createNews(req, res) {
    console.log('POST - /api/createNews');
    
    if (!validateNewsPost(req.body, res)) {
        return res.send("Invalid request");
    }

    var defaultClient = azureTable.getDefaultClient();
    try {
        var id = uuidv4();
        var partitionKey = "posts";
        var now = moment();

        var postRequest = req.body;
        postRequest.id = id;
        postRequest.date = now.format();
        var dataEntity = {
            PartitionKey: partitionKey,
            RowKey: id,
            Date: now.toDate(),
            User: postRequest.user,
            Sentiment: (postRequest.metaData || {}).sentiment,
            Data: JSON.stringify(postRequest)
        };
        defaultClient.insertEntity(postFeedTableName, dataEntity, function (err, data) {
            if (err) {
                res.statusCode = 500;
                res.statusText = err;
            }
            res.send(postRequest);
        });
    }
    catch (e) {
        console.log(e);
    }
}

function validateNewsPost(req, res) {

    if (req.user == null || req.user == "") {
        return res.send("Invalid user name");
    }
    if (req.text == null || req.text == "") {
        return res.send("Invalid post text");
    }
    if (req.metaData == null) {
        return res.send("Invalid post metadata");
    }
    if (req.metaData.keyphrases.length <= 0) {
        return res.send("Invalid metadata keyphrases");
    }
    if (req.metaData.sentiment == null) {
        return res.send("Invalid metadata sentiment");
    }

    return true;
}

function getNews(req, res) {
    console.log('GET - /api/getNews');
    var defaultClient = azureTable.getDefaultClient();
    defaultClient.queryEntities(postFeedTableName, {
        query: azureTable.Query.create('PartitionKey', '==', 'posts')
    }, function (err, data, continuation) {
        // err is null
        // data contains the array of objects (entities)
        // continuation is undefined or two element array to be passed to next query
        if (err) {
            res.statusCode = 500;
            res.statusText = err;
            res.send(data);
        }
        else {
            var posts = data.map(entity => JSON.parse(entity.Data));
            res.send(posts);
        }
    });    
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