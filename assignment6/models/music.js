let credentials = require("../credentials.js");

let mongoose = require('mongoose');

let options = { server: { socketOptions: { keepAlive: 1, connectTimeoutMS: 30000 } } };
mongoose.connect(credentials.connectionString, options);

let conn = mongoose.connection;
conn.on('error', console.error.bind(console, 'connection error:'));


let mySchema = mongoose.Schema({
    artist: String,
    title: String,
    pubDate: String,
  });

module.exports = mongoose.model('Brewery', mySchema);
