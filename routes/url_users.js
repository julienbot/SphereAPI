var express = require('express');
var users = express.Router();
var query = require('../models/sp_users');
var auth = require("../controllers/auth.js")();

users.use(auth.initialize());

users.get('/api/users',auth.authenticate(), query.getUsers);
users.get('/api/user/:id',auth.authenticate(), query.getUser);
users.post('/api/user',auth.authenticate(), query.addUser);
users.put('/api/user/:id',auth.authenticate(), query.updateUser);
users.delete('/api/user/:id',auth.authenticate(), query.removeUser);

module.exports = users;
