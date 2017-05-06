'use strict'

let music = require("./lib/music.js");

const express = require("express");
const app = express();

app.set('port', process.env.PORT || 3000);
app.use(express.static(__dirname + '/views'));
app.use(require('body-parser').urlencoded({ extended: true }));


//set up handlebars view engine
let handlebars = require('express-handlebars');
app.engine('.html', handlebars({extname: '.html'}));
app.set('view engine', '.html');

//send static file as response
app.get('/', function(req, res){
    res.type('text/html');
    res.sendFile(__dirname + '/public/home.html'); 
});


// handle GET 
app.post('/delete', function(req,res){
    console.log(req.body);
    let result = music.delete(req.body.title); // delete music object
    res.render('delete', {title: req.body.title, result: result});
});

app.post('/get', function(req,res){
    console.log(req.body);
    let header = 'Searching for: ' + req.body.title + '<br>';
    let found = music.get(req.body.title);
    res.render('details', {title: req.body.title, result: found});
});


// handle POST
app.post('/add', function(req,res){
    console.log(req.body);
    let added = music.add(req.body.title); // add music object
    if (added){
    res.render('add', {title: req.body.title, result: "added" , total: req.body.length});
    }
    else     
    res.render('add', {title: "", result: "Something is wrong" , total: req.body.length});

});


app.get('/get', function(req,res){
 let result = songs.get(req.query.title);
 res.render('details', {title: "Volcano", result: result });
});

app.get('/about', function(req, res){
    res.type('text/html');
    res.send('About page');
});
//custom 404 page
app.use(function(req, res){
    res.type('text/plain'); 
    res.status(404);
    res.send('404 - Not found');
});

//custom 500 page
app.use(function(err, req, res, next){
    console.error(err.stack);
    res.type('text/plain'); 
    res.status(500);
    res.send('500 ');
});

app.listen(app.get('port'), function(){
    console.log( 'Express started on http://localhost:' + app.get('port') + '; press Ctrl-C to terminate.');
});

