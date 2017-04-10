/**
 * Created by sofiannebattikh on 4/5/17.
 */
var http = require("http");
var fs = require('fs');
http.createServer(function(req,res) {
  console.log(req.url);
  var path = req.url.toLowerCase();
  var home = fs.readFileSync('home.html');
  var about = fs.readFileSync('package.json');



  switch(path) {
    case '/':
      res.writeHead(200, {'Content-Type': 'text/html'});
      res.end(home);
      break;
    case '/about':
      res.writeHead(200, {'Content-Type': 'text/json'});
      res.end(about);
      break;
    default:
      res.writeHead(404, {'Content-Type': 'text/plain'});
      res.end('404 Page Not found');
      break;
  }
}).listen(process.env.PORT || 3000);

