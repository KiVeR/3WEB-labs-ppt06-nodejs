var express = require('express');
var path = require('path');
var controller = require('./controller');
var bodyParser = require('body-parser');
var morgan = require('morgan');

var mongo = require('mongodb');
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/mongodb_sup');
var db = mongoose.connection;

db.on('error', function(){console.log('connection error')});
db.once('open', function () {

});
var app = express();

// Set Jade as the template engine
app.set('view engine', 'jade');
// Tells where to find Jade views
app.set('views', path.join(__dirname, 'views'));
app.use(morgan('combined'));
app.use(express.static(path.join(__dirname, '/')));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(function(req,res,next){
    req.db = db;
    next();
});

app.use(controller);

console.log('App listening on port 1337');
app.listen(1337);


