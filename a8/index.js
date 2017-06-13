'uuse strict'

let music = require("./models/music.js");

const express = require("express");
const app = express();

app.set('port', process.env.PORT || 3000);
app.use(express.static(__dirname + '/views')); // allows direct navigation to static files
app.use(require("body-parser").urlencoded({extended: true})); // parse form submissions
app.use('/api', require('cors')()); // set Access-Control-Allow-Origin header for api route
// set template engine
let handlebars =  require("express-handlebars");
app.engine(".html", handlebars({extname: '.html', defaultLayout: 'main' }));
app.set("view engine", ".html");

app.get('/', (req,res) => {
  music.find((err,music) => {
  if (err) return next(err);
res.render('home', {songs: music });
})
});
app.get('/about', function(req,res){
  res.type('text/html');
  res.render('about');
});
// handle GET
app.get('/details', (req,res) => {
  music.findOne({ artist:req.query.artist }, (err, music) => {
  if (err) return next(err);
res.render('details', {result: music} );
});
});
// return all items
app.get('/api/songs', (req,res, next) => {
  music.find((err,results) => {
  if (err || !results) return next(err);
res.json(results);
});
});
// return one item
app.get('/api/music/:artist', (req,res, next) => {
  let string = req.params.artist.toLowerCase();
music.findOne({ artist:string }, (err, result) => {
  if (err || !result) return next(err);
res.json( result );
});
});
app.post('/api/details', (req,res, next) => {
  let string = req.body.artist.toLowerCase();
music.findOne({ artist:string }, (err, result) => {
  if (err || !result) return next(err);
res.json( result );
});
});
// delete one item
app.get('/api/delete/:artist', (req,res, next) => {
  music.remove({"artist":req.params.artist }, (err, result) => {
  if (err) return next(err);
// return # of items deleted
res.json({"deleted": result.result.n});
});
});
app.post('/api/delete/', (req,res, next) => {
  music.remove({"artist":req.body.artist }, (err, result) => {
  if (err) return next(err);

res.json({"deleted": result.result.n});
});
});
// add one item
app.get('/api/add/:artist/:title/:pubDate/:founded', (req,res, next) => {
  // find & update existing item, or add new
  let artist = req.params.artist;
music.update({ artist: artist}, {artist:req.body.artist, title:req.body.title, pubDate:req.body.pubDate}, {upsert: true }, (err, result) => {
  if (err) return next(err);

res.json({updated: result.nModified});
});
});
app.post('/api/add/', (req,res, next) => {
  // find & update existing item, or add new
  if (!req.body._id) { // insert new document
  let music = new music({artist:req.body.artist, title:req.body.title, pubDate:req.body.pubDate});
  music.save((err,newSong) => {
    if (err) return next(err);
  console.log(newSong);
  res.json({updated: 0, _id: newSong._id});
});
} else { // update existing document
  music.updateOne({artist:req.body.artist, title:req.body.title, pubDate:req.body.pubDate}, {upsert: true }, (err, result) => {
    if (err) return next(err);
  if (result.upserted) {
    var id;
    id = result.upserted._id;
  }
  res.json({updated: result.nModified, _id: id});
});
}
});
// define 404 handler
app.use(function(req,res) {
  res.type('text/plain');
  res.status(404);
  res.send('404 - Not found');
});
app.listen(app.get('port'), function() {
  console.log('Express started');
});