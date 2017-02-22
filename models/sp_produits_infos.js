/**
 * Created by Jbottesi on 06/02/2017.
 */


var db = require('../pg-sphere');

/* Retourne la liste de tout les entêtes produit  */
function getProduitsInfos(req, res, next) {
    db.any('select * from sp_produits')
        .then(function (data) {
            res.status(200)
                .json({
                    status: 'success',
                    data: data
                });
        })
        .catch(function (err) {
            return next(err);
        });
}

function getProduitInfo(req, res, next) {
    var pupID = parseInt(req.params.id);
    db.one('select * from sp_produits where id_produit = $1', pupID)
        .then(function (data) {
            res.status(200)
                .json({
                    status: 'success',
                    data: data
                });
        })
        .catch(function (err) {
            return next(err);
        });
}

function addProduitInfo(req, res, next) {
    req.body.age = parseInt(req.body.age);
    db.none('insert into sp_produits(name, short_description, long_description, family_id)' +
        'values(${name}, ${short_description}, ${long_description}, ${family_id})',
        req.body)
        .then(function () {
            res.status(200)
                .json({
                    status: 'success'
                });
        })
        .catch(function (err) {
            return next(err);
        });
}

function updateProduitInfo(req, res, next) {
    db.none('update sp_produits set name=$1, short_description=$2, long_description=$3, family_id=$4 where id_produit=$5',
        [req.body.name, req.body.short_description, req.body.long_description, req.body.family_id, parseInt(req.params.id)])
        .then(function () {
            res.status(200)
                .json({
                    status: 'success'
                });
        })
        .catch(function (err) {
            return next(err);
        });
}

function removeProduitInfo(req, res, next) {
    var produitID = parseInt(req.params.id);
    db.result('delete from sp_produits where id_produit = $1', produitID)
        .then(function (result) {
            res.status(200)
                .json({
                    status: 'success'
                });
        })
        .catch(function (err) {
            return next(err);
        });
}


module.exports = {
    getProduitsInfos: getProduitsInfos,
    getProduitInfo: getProduitInfo,
    addProduitInfo: addProduitInfo,
    updateProduitInfo: updateProduitInfo,
    removeProduitInfo: removeProduitInfo
};
