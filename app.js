var express = require('express');
var app = express();
var db = require('./functions/db.js');
var idt = require('./functions/identity.js');
var bodyParser = require('body-parser');
var cors = require('cors');


// const corsOptions = {
//     origin: [
//         'http://www.example.com',
//         'http://localhost:8080',
//     ],
//     methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
//     allowedHeaders: ['Content-Type', 'Authorization'],
// };
// app.use(cors(corsOptions));

app.use(cors());
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded


app.get('/', function (req, res) {
    res.send( "Dennis DB API" );
});

app.post('/read', function (req, res) {
    console.log(req.body);
    var table = req.body.table;
    // var table = "Persons";
    db.select_data( table , function(err, results){
        console.log( results);
        res.send( results );
    })  
});

app.post('/create', function (req, res) {
    var table = req.body.table;
    var form = req.body.form;
    console.log(table);
    console.log(form);
    
    db.insert_data(table , form , function(err, results){
        console.log( results);
        res.send( results );
    })
});

app.post('/remove', function (req, res) {
    var table = req.body.table;
    var col = req.body.col;
    var id = req.body.id;
    db.delete_data(table , col, id , function(err, results){
        console.log( results);
        res.send( results );
    })
  
});

app.post('/update', function (req, res) {
    var table = req.body.table;
    var id = req.body.id;
    var form = req.body.form;
    var col_id = req.body.col_id;
    db.update_data(table , col_id , id , form , function(err, results){
        console.log( results);
        res.send( results );
    })
  
});

app.post('/login', function (req, res) {
    var table = req.body.table;
    var form = req.body.form;
    idt.login(table, form , function(err, results){
        res.send( results );
    })
});

app.post('/create_member', function (req, res) {
    var table = req.body.table;
    var form = req.body.form;
    idt.create_member(table, form, function (err, results) {
        res.send(results);
    })
});

app.post('/login_admin', function (req, res) {
    var table = req.body.table;
    var form = req.body.form;
    idt.login_admin(table, form, function (err, results) {
        res.send(results);
    })
});

app.post('/create_admin', function (req, res) {
    var table = req.body.table;
    var form = req.body.form;
    idt.create_admin(table, form, function (err, results) {
        res.send(results);
    })
});


app.get('/test', function (req, res) {
    // console.log(req.body);
    // res.json(req.body);
    res.send("API test");
    
})

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});