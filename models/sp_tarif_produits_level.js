/**
 * Created by Jbottesi on 06/02/2017.
 */

var db = require('../pg-sphere');

// add query functions
function getTarifs1(req, res, next) {
    db.any('select * from vw_produit_tarif_1')
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

function getTarif1(req, res, next) {
    var pupID = parseInt(req.params.id);
    db.one('select * from vw_produit_tarif_1 where id_produit=$1', pupID)
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

module.exports = {
    getTarifs1: getTarifs1,
    getTarif1: getTarif1
};
