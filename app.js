var express = require('express');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var path = require('path');
var expressValidator = require('express-validator');
var cors = require('cors');
var app = express();
var config = require('./config/config');
require('./db')(config);

var authRoute = require('./routes/auth')(config);
var userRoute = require('./routes/users')(config);
// var productRoute = require('./routes/products')();
var dashboard = require('./routes/dashboard')();

//application level middleware
var authenticate = require('./middlewares/authenticate');
var authorize = require('./middlewares/authorize');


//third paty middleware
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());
app.use(expressValidator());

//routing level middleware
//mounting
app.use(cors());
app.use('/dashboard', dashboard);
app.use('/auth', authRoute);
app.use('/user', authenticate, userRoute);
// app.use('/product', productRoute);

app.use(function(req, res, next) {
    console.log('I am last application level middleware');
    next({
        status: 404,
        message: 'Not Found'
    });
});

//error handling middleware
app.use(function(err, req, res, next) {
    console.log("Err is ", err);
    console.log("I am at error handling middleware");
    res.json({
        status: err.status || 400,
        msg: err.message || "Something went wrong"
    });
});

app.listen(config.port, function(err, done) {
    if (err) {
        console.log("Server failed");
    } else {
        console.log("Server listening at port ", config.port);
        console.log("press CTRL + C to exit the server");
    }
});