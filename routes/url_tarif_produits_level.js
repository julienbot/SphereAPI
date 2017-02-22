/**
 * Created by Jbottesi on 06/02/2017.
 */

var express = require('express');
var tarif_produit_level = express.Router();
var db = require('../models/sp_tarif_produits_level');


tarif_produit_level.get('/api/produit/tarifs/:lvl', db.getTarifs1);
tarif_produit_level.get('/api/produit/:id/tarif/:lvl', db.getTarif1);

module.exports = tarif_produit_level;
