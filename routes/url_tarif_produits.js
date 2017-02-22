/**
 * Created by Jbottesi on 06/02/2017.
 */


var express = require('express');
var tarif_produits = express.Router();
var db = require('../models/sp_tarif_produits');


tarif_produits.get('/api/produits/tarifs', db.getTarif_produits);
tarif_produits.get('/api/produit/:id/tarifs/', db.getTarifs_produit);
tarif_produits.post('/api/produit/tarif', db.addTarif_produit);
tarif_produits.put('/api/produit/tarif/:id', db.updateTarif_produit);
tarif_produits.delete('/api/produit/tarif/:id', db.removeTarif_produit);


module.exports = tarif_produits;