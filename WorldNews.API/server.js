'use strict';

const
    express = require('express'),
    bodyParser = require('body-parser'),
    app = express(),
    cors = require('cors'),
    port = process.env.PORT || 3030;    

this.init = function () {
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(cors());
     
    app.use(function (req, res, next) {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization, Ocp-Apim-Subscription-Key");
        res.header("Access-Control-Expose-Headers", "Traking");
        next();
    });

    require("./Services/worldnews.api.js")(app);
    app.listen(port);
    console.log(port);
};

this.init();