/**
 * Created by Jbottesi on 06/02/2017.
 */

var express = require('express');
var produit_info = express.Router();
var db = require('../models/sp_produits_infos');


produit_info.get('/api/produits', db.getProduitsInfos);
produit_info.get('/api/produit/:id', db.getProduitInfo);
produit_info.post('/api/produit', db.addProduitInfo);
produit_info.put('/api/produit/:id', db.updateProduitInfo);
produit_info.delete('/api/produit/:id', db.removeProduitInfo);


module.exports = produit_info;