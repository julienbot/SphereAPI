/**
 * Created by Jbottesi on 08/01/2017.
 */


var db = require('../pg-sphere');

// add query functions
function getAgences(req, res, next) {
    db.any('select * from sp_agences')
        .then(function (data) {
            res.status(200)
                .json({
                    status: 'success',
                    data: data,
                    message: 'Retrieved ALL agences'
                });
        })
        .catch(function (err) {
            return next(err);
        });
}

function getAgence(req, res, next) {
    var pupID = parseInt(req.params.id);
    db.one('select * from sp_agences where agence_id = $1', pupID)
        .then(function (data) {
            res.status(200)
                .json({
                    status: 'success',
                    data: data,
                    message: 'Retrieved ONE agence'
                });
        })
        .catch(function (err) {
            return next(err);
        });
}

function addAgence(req, res, next) {
    req.body.age = parseInt(req.body.age);
    db.none('insert into sp_agences(name, secteur_id)' +
        'values(${name}, $(secteur_id))',
        req.body)
        .then(function () {
            res.status(200)
                .json({
                    status: 'success',
                    message: 'Inserted one agence'
                });
        })
        .catch(function (err) {
            return next(err);
        });
}

function updateAgence(req, res, next) {
    db.none('update sp_agences set name=$1 secteur_id=$2 where user_id=$3',
        [req.body.name,req.body.secteur_id, parseInt(req.params.id)])
        .then(function () {
            res.status(200)
                .json({
                    status: 'success',
                    message: 'Updated Agence'
                });
        })
        .catch(function (err) {
            return next(err);
        });
}

function removeAgence(req, res, next) {
    var userID = parseInt(req.params.id);
    db.result('delete from sp_agences where id_agence = $1', userID)
        .then(function (result) {
            res.status(200)
                .json({
                    status: 'success',
                    message: 'Removed '+ result.rowCount + ' agence'
                });
        })
        .catch(function (err) {
            return next(err);
        });
}


module.exports = {
    getAgences: getAgences,
    getAgence: getAgence,
    addAgence: addAgence,
    updateAgence: updateAgence,
    removeAgence: removeAgence
};
