'use strict';

const
    express = require('express'),
    bodyParser = require('body-parser'),
    app = express(),
    port = process.env.PORT || 3030;    

this.init = function () {
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));

    require("./Services/worldnews.api.js")(app);
    app.listen(port);
    console.log(port);
};

this.init();