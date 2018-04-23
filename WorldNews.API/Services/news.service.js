'use strict';

const uuidv4 = require('uuid/v4');
var fs = require('fs');
var moment = require('moment');
function createNews(req, res) {
    console.log('POST - /api/createNews');
    
    if (!validateNewsPost(req.body, res)) {
        return res.send("Invalid request");
    }
    var fileName = "postfeed.json";    
    try {
        var contents = fs.readFileSync(fileName).toString();       
        if (contents != null || contents != "") {
            var filedata = JSON.parse(contents);
            var postRequest = req.body;
            postRequest.id = uuidv4();
            postRequest.date = moment().format(); 

            filedata.push(req.body);

            fs.writeFileSync(fileName, JSON.stringify(filedata), 'utf8', function () {
                if (err) {
                    return console.log(err);
                }
                return res.send(req.body);
            });
            return res.send(req.body);
        }
    }
    catch (e) {
        var newList = [];
        var postRequest = req.body;        
        postRequest.id = uuidv4();
        postRequest.timeUTC = moment().format(); 
        newList.push = postRequest;

        fs.writeFileSync(fileName, JSON.stringify(newList), { flag: 'wx', encoding: 'utf8' }, function (err, data) {
            return res.send(data);
        })
        return res.send(newList);;
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
    var fileName = "postfeed.json";    
    res.send(readFile(fileName));    
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