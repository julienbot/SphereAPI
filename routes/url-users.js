var express = require('express');
var users = express.Router();
var db = require('../models/sp-users');


users.get('/api/users', db.getUsers);
users.get('/api/user/:id', db.getUser);
users.post('/api/user', db.addUser);
users.put('/api/user/:id', db.updateUser);
users.delete('/api/user/:id', db.removeUser);


module.exports = users;
