/**
 * Created by Jbottesi on 11/02/2017.
 */


var express = require('express');
var authroute = express.Router();
//var users = require('../controllers/credentials');
var jwt = require('jsonwebtoken');
var cfg = require("../config/config.js");
var db = require('../pg-sphere');


function logUser(req, res, next) {
    if (req.body.login && req.body.password) {
        var login = req.body.login;
        var password = req.body.password;
        console.log(login, password);
        db.one('select * from sp_users where login = $1', login)
            .then(function(data) {
                if (data.password === password) {
                    var payload = {
                        id: data.user_id
                    };
                    var token = jwt.sign(payload, cfg.jwtSecret, { expiresIn: 60 * 60 });
                    res.json({
                        token: token
                    });
                }
            });
    } else {
        res.sendStatus(401);
    }
};


module.exports = {
    logUser:logUser
};