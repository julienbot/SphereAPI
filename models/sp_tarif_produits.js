/**
 * Created by Jbottesi on 06/02/2017.
 */

var db = require('../pg-sphere');

// add query functions
function getTarif_produits(req, res, next) {
    db.any('select * from sp_tarif_produits')
        .then(function (data) {
            res.status(200)
                .json({
                    status: 'success',
                    data: data,
                    message: 'Retrieved ALL Tarifs Produits'
                });
        })
        .catch(function (err) {
            return next(err);
        });
}

function getTarifs_produit(req, res, next) {
    var pupID = parseInt(req.params.id);
    db.any('select * from sp_tarif_produits where produit_id = $1', pupID)
        .then(function (data) {
            res.status(200)
                .json({
                    status: 'success',
                    data: data,
                    message: 'Retrieved ALL Tarifs for ONE produit'
                });
        })
        .catch(function (err) {
            return next(err);
        });
}

function addTarif_produit(req, res, next) {
    req.body.age = parseInt(req.body.age);
    db.none('insert into sp_tarif_produits(level_tarif, coef, pv_ht, pv_ttc, tva_id, produit_id)' +
        'values(${level_tarif}, ${coef}, ${pv_ht}, ${pv_ttc}, ${tva_id}, ${produit_id})',
        req.body)
        .then(function () {
            res.status(200)
                .json({
                    status: 'success',
                    message: 'Inserted one tarif produit'
                });
        })
        .catch(function (err) {
            return next(err);
        });
}

function updateTarif_produit(req, res, next) {
    db.none('update sp_tarif_produits set level_tarif=$1, coef=$2, pv_ht=$3, pv_ttc=$4 where id_tarif_produit=$5',
        [req.body.level_tarif, req.body.coef, req.body.pv_ht, req.body.pv_ttc, parseInt(req.params.id)])
        .then(function () {
            res.status(200)
                .json({
                    status: 'success',
                    message: 'Updated Produit'
                });
        })
        .catch(function (err) {
            return next(err);
        });
}

function removeTarif_produit(req, res, next) {
    var produitID = parseInt(req.params.id);
    db.result('delete from sp_tarif_produits where id_tarif_produit = $1', produitID)
        .then(function (result) {
            res.status(200)
                .json({
                    status: 'success',
                    message: 'Removed '+ result.rowCount + ' produit'
                });
        })
        .catch(function (err) {
            return next(err);
        });
}


module.exports = {
    getTarif_produits: getTarif_produits,
    getTarifs_produit: getTarifs_produit,
    addTarif_produit: addTarif_produit,
    updateTarif_produit: updateTarif_produit,
    removeTarif_produit: removeTarif_produit
};
