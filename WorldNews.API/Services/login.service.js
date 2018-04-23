'use strict';

function signin(req, res) {
    console.log('POST - /api/signin');
    res.send("OK");
}

function signout(req, res) {
    console.log('POST - /api/signout');
    res.send("OK");
}

this.signin = signin;
this.signout = signout;

module.exports = this;