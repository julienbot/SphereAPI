/**
 * Created by Jbottesi on 08/01/2017.
 */
var express = require('express');
var agences = express.Router();
var db = require('../models/sp_agences');


agences.get('/api/agences', db.getAgences);
agences.get('/api/agence/:id', db.getAgence);
agences.post('/api/agence', db.addAgence);
agences.put('/api/agence/:id', db.updateAgence);
agences.delete('/api/agence/:id', db.removeAgence);


module.exports = agences;