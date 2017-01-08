/**
 * Created by Jbottesi on 03/01/2017.
 */

var db = require('../pg-sphere');

// add query functions
function getUsers(req, res, next) {
    db.any('select * from sp_users')
        .then(function (data) {
            res.status(200)
                .json({
                    status: 'success',
                    data: data,
                    message: 'Retrieved ALL users'
                });
        })
        .catch(function (err) {
            return next(err);
        });
}

function getUser(req, res, next) {
    var pupID = parseInt(req.params.id);
    db.one('select * from sp_users where user_id = $1', pupID)
        .then(function (data) {
            res.status(200)
                .json({
                    status: 'success',
                    data: data,
                    message: 'Retrieved ONE user'
                });
        })
        .catch(function (err) {
            return next(err);
        });
}

function addUser(req, res, next) {
    req.body.age = parseInt(req.body.age);
    db.none('insert into sp_users(first_name, last_name, agence_id, level_id)' +
        'values(${first_name}, ${last_name}, ${agence_id}, ${level_id})',
        req.body)
        .then(function () {
            res.status(200)
                .json({
                    status: 'success',
                    message: 'Inserted one user'
                });
        })
        .catch(function (err) {
            return next(err);
        });
}

function updateUser(req, res, next) {
    db.none('update sp_users set level_id=$1, first_name=$2, last_name=$3, agence_id=$4 where user_id=$5',
        [req.body.level_id, req.body.first_name, req.body.last_name,
            req.body.agence_id, parseInt(req.params.id)])
        .then(function () {
            res.status(200)
                .json({
                    status: 'success',
                    message: 'Updated user'
                });
        })
        .catch(function (err) {
            return next(err);
        });
}

function removeUser(req, res, next) {
    var userID = parseInt(req.params.id);
    db.result('delete from sp_users where user_id = $1', userID)
        .then(function (result) {
            res.status(200)
                .json({
                    status: 'success',
                    message: 'Removed '+ result.rowCount + ' user'
                });
        })
        .catch(function (err) {
            return next(err);
        });
}


module.exports = {
    getUsers: getUsers,
    getUser: getUser,
    addUser: addUser,
    updateUser: updateUser,
    removeUser: removeUser
};
