'use strict';

const
    express = require('express'),
    bodyParser = require('body-parser'),
    app = express(),
    cors = require('cors'),
    port = process.env.PORT || 3030;

var azureTable = require('azure-table-node');

this.init = function () {
    azureTable.setDefaultClient({
        accountUrl: 'http://mexicolaboratoriab9eb.table.core.windows.net/',
        accountName: 'mexicolaboratoriab9eb',
        accountKey: 'Gqq+zKesSodXqQWv++4SiTRY3ekChxR+Ay+G0lErNh6cG9qFo1IVMsUEG0sSB9MhcWxyaSrQp8pISM4j/pGNPA=='
    });
    var defaultClient = azureTable.getDefaultClient();
    defaultClient.createTable("postfeed", function (err, data) {
        if (err) {
            console.log(err);
        }
    });
    
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