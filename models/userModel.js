//schema definition 
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
	username:{
		type:String,
		unique:true,
		required:true
	},
	password:String,
	dateOfBirth:{
		type:Date
	},
	contactNumber:Number,
	email:{
		type:String,
		unique:true,
		required:true
	},
	address:String,
	onlineStatus:{
		type:Boolean,
		default:false
	},
	role:{
		type:Number,
		default:2 //1 for admin, 2 for normal user
	},
	roles:{
		type:String,
		ENUM:['personalAccount','businessAccount','admin'],
		default:'personalAccount'
	}
},{
	timestamps:true
});

var userModel = mongoose.model('user', userSchema);
module.exports = userModel;