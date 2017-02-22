/**
 * Created by Jbottesi on 08/02/2017.
 */

var db = require('../pg-sphere');
var passport = require("passport");
var passportJWT = require("passport-jwt");
//var users = require("../controllers/credentials");
var cfg = require("../config/config.js");
var ExtractJwt = passportJWT.ExtractJwt;
var Strategy = passportJWT.Strategy;
var params = {
    secretOrKey: cfg.jwtSecret,
    jwtFromRequest: ExtractJwt.fromAuthHeader()
};

module.exports = function() {
    var strategy = new Strategy(params, function(payload, done) {
        db.one('select * from sp_users where user_id = $1', payload.id)
            .then(function(data){
                if (data.user_id || null) {
                    return done(null, {
                        id: data.user_id
                    });
                } else {
                    return done(new Error("User not found"), null);
                }
            })
    });
    passport.use(strategy);
    return {
        initialize: function() {
            return passport.initialize();
        },
        authenticate: function() {
            return passport.authenticate("jwt", cfg.jwtSession);
        }
    };
};