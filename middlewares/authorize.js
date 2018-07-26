var jwt = require('jsonwebtoken');
var config = require('./../config/config');
var UserModel = require('./../models/userModel');

module.exports = function(req,res,next){
	if(req.user.role == 1){
		return next();
	}else{
		return next({
			status:403,
			message:'You dont have access'
		});
	}
}