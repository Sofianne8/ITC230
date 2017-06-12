
'use strict'

const express = require("express");
const app = express();
let music = require("./models/Music"); // use database model


app.set('port', process.env.PORT || 3000);
app.use(express.static(__dirname + '/views'));
app.use(require('body-parser').urlencoded({ extended: true }));


let exphbs  = require('express-handlebars');
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');


music.find(function(err, music){
  if(err) return console.error(err);
  if(music.length) return;

  new music({artist: "Audio Slave", title:"Like A Stone", pubDate:"2002"}).save();
  new music({artist: "Damien Rice", title:"Volcano", pubDate:"2002"}).save();
  new music({artist: "Marvin Gaye", title:"Let's Get It On", pubDate:"1973"}).save();
});


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
app.post('/details', (req,res) => {
  music.findOne({ title:req.body.title }, (err, music) => {
    if (err) {return next(err);}
    else{
      console.log(music);
      res.render('details', {title: req.body.title, result: music} ); }
  });

});



app.post("/delete", (req, res) => {
  music.remove({title:req.body.title}, (err, music) => {
    if (err)
      return next(err);
    music.count({},(err,count)=>{
      if(err) return next(err);
      if(count==0){
        res.render('delete', {title:req.body.title, result: 'deleted'});
      }else{
        res.render('delete', {title:req.body.title, result: count});
      }
    });
  });
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

