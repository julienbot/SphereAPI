/**
 * Created by Jbottesi on 06/02/2017.
 */

var db = require('../pg-sphere');

// add query functions
function getTva_produits(req, res, next) {
    db.any('select * from sp_tva_produits')
        .then(function (data) {
            res.status(200)
                .json({
                    status: 'success',
                    data: data,
                    message: 'Retrieved ALL TVA Produits'
                });
        })
        .catch(function (err) {
            return next(err);
        });
}

function getTva_produit(req, res, next) {
    var pupID = parseInt(req.params.id);
    db.one('select * from sp_tva_produits where id_tva_produit = $1', pupID)
        .then(function (data) {
            res.status(200)
                .json({
                    status: 'success',
                    data: data,
                    message: 'Retrieved ONE TVA'
                });
        })
        .catch(function (err) {
            return next(err);
        });
}

function addTva_produit(req, res, next) {
    req.body.age = parseInt(req.body.age);
    db.none('insert into sp_tva_produits(taux, cpt_achat, cpt_vente)' +
        'values(${taux}, ${cpt_achat}, ${cpt_vente})',
        req.body)
        .then(function () {
            res.status(200)
                .json({
                    status: 'success',
                    message: 'Inserted one tva produit'
                });
        })
        .catch(function (err) {
            return next(err);
        });
}

function updateTva_produit(req, res, next) {
    db.none('update sp_tva_produits set taux=$1, cpt_achat=$2, cpt_vente=$3 where id_tva_produit=$4',
        [req.body.taux, req.body.cpt_achat, req.body.cpt_vente, parseInt(req.params.id)])
        .then(function () {
            res.status(200)
                .json({
                    status: 'success',
                    message: 'Updated TVA'
                });
        })
        .catch(function (err) {
            return next(err);
        });
}

function removeTva_produit(req, res, next) {
    var produitID = parseInt(req.params.id);
    db.result('delete from sp_tva_produits where id_tva_produit = $1', produitID)
        .then(function (result) {
            res.status(200)
                .json({
                    status: 'success',
                    message: 'Removed '+ result.rowCount + ' TVA'
                });
        })
        .catch(function (err) {
            return next(err);
        });
}


module.exports = {
    getTva_produits: getTva_produits,
    getTva_produit: getTva_produit,
    addTva_produit: addTva_produit,
    updateTva_produit: updateTva_produit,
    removeTva_produit: removeTva_produit
};
