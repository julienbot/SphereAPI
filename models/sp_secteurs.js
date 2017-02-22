/**
 * Created by Jbottesi on 08/01/2017.
 */


var db = require('../pg-sphere');

// add query functions
function getSecteurs(req, res, next) {
    db.any('select * from sp_secteurs')
        .then(function (data) {
            res.status(200)
                .json({
                    status: 'success',
                    data: data,
                    message: 'Retrieved ALL secteurs'
                });
        })
        .catch(function (err) {
            return next(err);
        });
}

function getSecteur(req, res, next) {
    var pupID = parseInt(req.params.id);
    db.one('select * from sp_secteurs where id_secteur = $1', pupID)
        .then(function (data) {
            res.status(200)
                .json({
                    status: 'success',
                    data: data,
                    message: 'Retrieved ONE secteur'
                });
        })
        .catch(function (err) {
            return next(err);
        });
}

function addSecteur(req, res, next) {
    req.body.age = parseInt(req.body.age);
    db.none('insert into sp_secteurs(name)' +
        'values(${name})',
        req.body)
        .then(function () {
            res.status(200)
                .json({
                    status: 'success',
                    message: 'Inserted one secteur'
                });
        })
        .catch(function (err) {
            return next(err);
        });
}

function updateSecteur(req, res, next) {
    db.none('update sp_secteurs set name=$1 where user_id=$5',
        [req.body.name, parseInt(req.params.id)])
        .then(function () {
            res.status(200)
                .json({
                    status: 'success',
                    message: 'Updated secteur'
                });
        })
        .catch(function (err) {
            return next(err);
        });
}

function removeSecteur(req, res, next) {
    var userID = parseInt(req.params.id);
    db.result('delete from sp_secteurs where id_secteur = $1', userID)
        .then(function (result) {
            res.status(200)
                .json({
                    status: 'success',
                    message: 'Removed '+ result.rowCount + ' secteur'
                });
        })
        .catch(function (err) {
            return next(err);
        });
}


module.exports = {
    getSecteurs: getSecteurs,
    getSecteur: getSecteur,
    addSecteur: addSecteur,
    updateSecteur: updateSecteur,
    removeSecteur: removeSecteur
};
