/**
 * Created by Jbottesi on 06/01/2017.
 */

var promise = require('bluebird');

var options = {
    // Initialization Options
    promiseLib: promise
};

var pgp = require('pg-promise')(options);
var connectionString = 'postgres://rapidsys:rapid2016@localhost:5432/sphere';
var db = pgp(connectionString);

module.exports = db;