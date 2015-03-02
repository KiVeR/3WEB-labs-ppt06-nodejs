var express = require('express')
    , router = express.Router()
    , mongoose = require('mongoose');

router.route('*').all(function(req, res, next) {
    console.log('All init');
    next();
});

router.get('/', function(req, res) {
    res.render('index');
});

router.get('/index', function(req, res) {
    res.render('index');
});

router.get('/auth/*', function(req, res){
    console.log('All auth');
});

router.get('/form', function(req, res) {
    res.render('form');
});

router.post('/formReturn', function(req, res){
    var Schema = mongoose.Schema;
    var dataSchema = new Schema({
        data1: String,
        data2: String,
        data3: String,
        data4: String
    });
    var Data = mongoose.model('Data', dataSchema);
    var myData = new Data({
        data1: req.body.data1,
        data2: req.body.data2,
        data3: req.body.data3,
        data4: req.body.data4
    });
    console.log(Data);
    console.log(myData);
    myData.save();
    res.render('formReturn', {
        'myData1': myData.data1,
        'myData2': myData.data2,
        'myData3': myData.data3,
        'myData4': myData.data4
    });
});

router.delete('/delete/:id', function(req, res) {
    delete req.session[req.params.id];
    console.log(JSON.stringify(req.session));
    res.status(200).json(null);
});

module.exports = router;