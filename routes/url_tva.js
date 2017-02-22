/**
 * Created by Jbottesi on 06/02/2017.
 */

var express = require('express');
var tva_produits = express.Router();
var db = require('../models/sp_tva');


tva_produits.get('/api/tva_produits', db.getTva_produits);
tva_produits.get('/api/tva_produit/:id', db.getTva_produit);
tva_produits.post('/api/tva_produit', db.addTva_produit);
tva_produits.put('/api/tva_produit/:id', db.updateTva_produit);
tva_produits.delete('/api/tva_produit/:id', db.removeTva_produit);


module.exports = tva_produits;
