'use strict'

let music = require("./lib/music.js");

const express = require("express");
const app = express();

app.set('port', process.env.PORT || 3000);
app.use(express.static(__dirname + '/views'));
app.use(require('body-parser').urlencoded({extended: true}));


let handlebars = require('express-handlebars');
app.engine('.html', handlebars({extname: '.html'}));
app.set('view engine', '.html');

app.get('/', function (req, res) {
  res.type('text/html');
  res.sendFile(__dirname + '/public/home.html');
});

app.post('/delete', function (req, res) {
  console.log(req.body);
  let result = music.delete(req.body.title); // delete music object
  res.render('delete', {title: req.body.title, result: result});
});

app.post('/get', function (req, res) {
  console.log(req.body);
  let header = 'Searching for: ' + req.body.title + '<br>';
  let found = music.get(req.body.title);
  res.render("details", {title: req.body.title, result: found});
});

app.get('/get', function (req, res) {
  let result = music.get(req.query.title);
  res.render('details', {title: "Volcano", result: result});
});

app.get('/about', function (req, res) {
  res.type('text/html');
  res.send('About page');
});

app.use(function (req, res) {
  res.type('text/plain');
  res.status(404);
  res.send('404 - Not found');
});

app.use(function (err, req, res, next) {
  console.error(err.stack);
  res.type('text/plain');
  res.status(500);
  res.send('500 ');
});

app.post('/get', function(req,res){
  console.log(req.body)
  var header = 'Searching for: ' + req.body.capital + '<br>';
  var found = music.get(req.body.capital);
  res.render('add', {title: req.body.title, result: "added" , total: req.body.length});
});


// handle POST
app.post('/add', function(req,res){
  console.log(req.body);
  let added = music.add(req.body.title);
  if (added){
    res.render('add', {title: req.body.title, result: "added" , total: req.body.length});
  }
  else
    res.render('add', {title: "", result: "Something's wrong" , total: req.body.length});
});

app.get('/get', function(req,res){
  let result = songs.get(req.query.title);
  res.render('details', {title: "Volcano", result: result });
});


app.listen(app.get('port'), function () {
  console.log('Express started on http://localhost:' + app.get('port') + '; press Ctrl-C to terminate.');
});

