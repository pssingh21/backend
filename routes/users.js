var express = require('express');
var router = express.Router();
var mongodb = require('mongodb');
var mongoCLient = mongodb.MongoClient;
var oid = mongodb.ObjectId;
var UserModel = require('./../models/userModel');
var mapUser = require('./../helpers/mapUser');

module.exports = function(config){

	//fetch all users
	router.get('/',function(req,res,next){
		UserModel.find({},function(err,users){
			if(err){
				return next(err);
			}
			res.json(users);
		});
	});

	//findOne user
	router.get('/:id',function(req,res,next){
		UserModel.findById(req.params.id,function(err,user){
			if(err){
				return next(err);
			}
			res.json(user);
		});
	});

	router.put('/:id',function(req,res,next){
		var id = req.params.id;
		UserModel.findById(id,function(err,user){
			if(err){
				return next(err);
			}
			if(user){
				var updatedUser = mapUser(user,req.body);
				updatedUser.save(function(err,done){
					if(err){
						return next(err);
					}
					res.json(done);
				});
			}else{
				next({
					status:204,
					message:'User not found'
				});
			}
		});
	});

	router.delete('/:id',function(req,res,next){
		var id = req.params.id;
		UserModel.findById(id,function(err,user){
			if(err){
				return next(err);
			}
			if(user){
				user.remove(function(err,done){
					if(err){
						return next(err);
					}
					res.json(done);
				});
			}else{
				next({
					status:204,
					message:'User not found'
				});
			}
		});
	});

	return router;
}