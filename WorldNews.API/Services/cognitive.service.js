'use strict';

var request = require("request");

var cognitiveServicesKey = "58ceed7e08524031bb087ae1292b5344";
var keyphrasesUrl = "https://southcentralus.api.cognitive.microsoft.com/text/analytics/v2.0/keyPhrases";
var sentimentUrl = "https://southcentralus.api.cognitive.microsoft.com/text/analytics/v2.0/sentiment";
 
function sentiment(requestt, response) {
    console.log('POST - /api/cognitive/sentiment');

    request.post({
        headers:{
            "Ocp-Apim-Subscription-Key": cognitiveServicesKey,
            "Content-Type": "application/json",
        },
        method: "POST",
        json: true,
        body: requestt.body,
        url: sentimentUrl
    }, function(err, res, body){
        if (err) {
            response.statusCode = res.statusCode;
            response.statusText = err;
        }
        response.send(body);
    });
}

function keyphrases(requestt, response) {
    console.log('POST - /api/cognitive/keyphrases');

    request.post({
        headers:{
            "Ocp-Apim-Subscription-Key": cognitiveServicesKey,
            "Content-Type": "application/json",
        },
        method: "POST",
        json: true,
        body: requestt.body,
        url: keyphrasesUrl
    }, function(err, res, body){
        if (err) {
            response.statusCode = res.statusCode;
            response.statusText = err;
        }
        response.send(body);
    });
}

this.sentiment = sentiment;
this.keyphrases = keyphrases;

module.exports = this;