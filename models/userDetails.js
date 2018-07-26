var mongoose = require('mongoose');
var Schema  = mongoose.Schema;

var productSchema = new Schema({
	skills:[string]
},{
	timestamps:true
});

var productModel = mongoose.model('product', productSchema);

module.exports = productModel;