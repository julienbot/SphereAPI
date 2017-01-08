var express = require('express');
var router = express.Router();
var db = require('../models/sp-users');


router.get('/api/users', db.getUsers);
router.get('/api/user/:id', db.getUser);
router.post('/api/user', db.addUser);
router.put('/api/user/:id', db.updateUser);
router.delete('/api/user/:id', db.removeUser);


module.exports = router;
