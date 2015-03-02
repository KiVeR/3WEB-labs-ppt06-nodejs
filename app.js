var express = require('express');
var path = require('path');
var controller = require('./controller');
var bodyParser = require('body-parser');
var session = require('cookie-session');
var morgan = require('morgan');

var app = express();
// Set Jade as the template engine
app.set('view engine', 'jade');
// Tells where to find Jade views
app.set('views', path.join(__dirname, 'views'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(morgan('combined'));
app.use(session({
    keys: ['data1', 'data2', 'data3', 'data4']
}))
app.use(express.static(path.join(__dirname, '/')));
app.use(controller);

console.log('App listening on port 1337');
app.listen(1337);


