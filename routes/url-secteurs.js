/**
 * Created by Jbottesi on 08/01/2017.
 */
var express = require('express');
var secteurs = express.Router();
var db = require('../models/sp-secteurs');


secteurs.get('/api/secteurs', db.getSecteurs);
secteurs.get('/api/secteur/:id', db.getSecteur);
secteurs.post('/api/secteur', db.addSecteur);
secteurs.put('/api/secteur/:id', db.updateSecteur);
secteurs.delete('/api/secteur/:id', db.removeSecteur);


module.exports = secteurs;
