var mongoose = require('mongoose');
var Schema  = mongoose.Schema;

var userDetailsSchema = new Schema({
	skills:{
	type:String
	},
	particularUser:[{
		username:{
			type:String,
			unique:true
		},
		skills:{
			type:String
		}
	}]
},
{
	versionKey:false
});

var userDetailsModel = mongoose.model('userDetails', userDetailsSchema);

module.exports = userDetailsModel;