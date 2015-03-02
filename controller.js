var express = require('express')
    , router = express.Router();

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
    req.session = req.body;
    console.log(JSON.stringify(req.session));
    res.render('formReturn', {
        'myData1': req.session.data1,
        'myData2': req.session.data2,
        'myData3': req.session.data3,
        'myData4': req.session.data4,
    });
});

router.delete('/delete/:id', function(req, res) {
    delete req.session[req.params.id];
    console.log(JSON.stringify(req.session));
    res.status(200).json(null);
});

module.exports = router;