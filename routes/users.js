var express = require('express');
var router = express.Router();
var mongodb = require('mongodb');
var mongoCLient = mongodb.MongoClient;
var oid = mongodb.ObjectId;
var UserModel = require('./../models/userModel');
var mapUser = require('./../helpers/mapUser');
var jwt = require('jsonwebtoken');
module.exports = function(config) {

    //fetch all users
    router.get('/', function(req, res, next) {
        UserModel.find({}, function(err, users) {
            if (err) {
                return next(err);
            }
            res.json(users);
        });
    });

    //findOne user
    router.get('/account', function(req, res, next) {
        var decoded = jwt.decode(req.headers.authorization, {
            complete: true
        });
        UserModel.find({
            username: decoded.payload.username
        }, function(err, user) {
            if (err) {
                return next(err);
            }
            res.json(user);
        })
    });

    router.put('/edit', function(req, res, next) {
        var decoded = jwt.decode(req.headers.authorization, {
            complete: true
        });
        UserModel.findById(decoded.payload.id, function(err, user) {
            if (err) {
                return next(err);
            }
            var updatedUser = mapUser(user, req.body);
            updatedUser.save(function(err, done) {
                if (err) {
                    return next(err);
                }
                res.json({
                    status: 200,
                    message: "User updated"
                });
            });
        });
    });

    router.delete('/delete', function(req, res, next) {
        var decoded = jwt.decode(req.headers.authorization, {
            complete: true
        });
        UserModel.findById(decoded.payload.id, function(err, user) {
            if (err) {
                return next(err);
            }
            user.remove(function(err, done) {
                if (err) {
                    return next(err);
                }
                res.json(done);
            });
        });
    });

    return router;
}