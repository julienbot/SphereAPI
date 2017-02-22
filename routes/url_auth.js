/**
 * Created by Jbottesi on 11/02/2017.
 */

var express = require('express');
var authroute = express.Router();
var db = require('../controllers/authlogon');

authroute.post('/authtoken', db.logUser);


module.exports = authroute;
