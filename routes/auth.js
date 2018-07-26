var express= require('express');
var router = express.Router();
var passwordHash = require('password-hash');
var mapUser = require('./../helpers/mapUser');
var jwt = require('jsonwebtoken');

var UserModel = require('./../models/userModel');

var mongodb = require('./../models/userModel');

var mongodb = require('mongodb');
var mongoClient = mongodb.MonogoClient;

function createToken(user,config){
	var token = jwt.sign({
		id:user._id,
		username:user.username
	},config.jwtSecret);

	return token;
}

module.exports = function(config){
	router.get('/',function(req,res,next){
		
	});

	router.post('/login',function(req,res,next){
		req.assert('username','username is required').notEmpty();
		req.assert('password','password is required').notEmpty();
		req.assert('password','password must be 6 characters long').isLength(6);

		var errors = req.validationErrors();
		if(errors){
			return next({
				status:400,
				message:errors
			});
		}
		UserModel.findOne({
			username:req.body.username
		},function(err,user){
			if(err){
				return next(err);
			}
			if(user){
				var matched = passwordHash.verify(req.body.password,user.password);
				if(matched){
					var token = createToken(user,config);
					res.json({
						user:user,
						token:token
					});
				}else{
					next({
						status:401,
						message:"Invalid login credentials"
					});
				}
			}else{
				next({
					status:401,
					message:"Invalid login credentials"
				});
			}
		});
	});

	router.get('/register',function(req,res,next){
		
	});

	router.post('/register',function(req,res,next){
		console.log(req.body);

		var newUser = new UserModel();
		var mappedUser = mapUser(newUser, req.body);

		mappedUser.password = passwordHash.generate(req.body.password);
		mappedUser.save(function(err,user){
			if(err){
				return next(err);
			}
			res.json(user);
		});	
	});

	return router;
}