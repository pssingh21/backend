var express = require('express');
var router = express.Router();

module.exports = function(){
	router.get('/',function(req,res,next){
		res.send('Welcome');
	});
	return router;	
}