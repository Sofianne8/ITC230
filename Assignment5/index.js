'use strict'

let music = require("./lib/music");

const express = require("express");
let exphbs  = require('express-handlebars');
const app = express();

app.set('port', process.env.PORT || 3000);
app.use(express.static(__dirname + '/views'));
app.use(require('body-parser').urlencoded({ extended: true }));

//set up handlebars view engine

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

//send static file as response
app.get('/', function(req, res){
  res.render('home');
});

app.get('/home', function(req, res){
  res.render('home');
});
// send content of 'home' view
app.get('/details', function(req,res){
  res.render('home');
});

app.get('/about', function(req, res){
  res.render('about');
});

// handle POST
app.post('/details', function(req,res){
  console.log(req.body);
  let result = music.get(req.body.title);
  res.render('details', {title: req.body.title, result: result});

});

app.post('/add', function(req,res){
  console.log(req.body);
  let result = music.add(req.body.title);
  if (result.added)
  {
    res.render('add', {title: req.body.title, result: "added" , total: result.total });
  }
  else
  {
    res.render('add', {title: req.body.title, result: "This Song Already exists" , total: req.body.length});
  }
  console.log(result);
});

app.post('/delete', function(req,res){
  console.log(req.body);
  let result = music.delete(req.body.title);
  res.render('delete', {title: req.body.title, result: result});
  console.log(result);
});

//404 page
app.use(function(req, res){
  res.status(404);
  res.render('404');
});

//500 page
app.use(function(err, req, res, next){
  console.error(err.stack);
  res.status(500);
  res.send('500');
});



app.listen(app.get('port'), function(){
  console.log( 'Express started on http://localhost:' + app.get('port') + '; press Ctrl-C to terminate.');
});