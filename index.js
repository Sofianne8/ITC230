var http = require("http"), fs = require("fs"),
  qs = require("querystring"), music = require("./music");

let home = fs.readFileSync('music.js');
let error = fs.readFileSync('error.html');

function serveStaticFile(res, path, contentType, responseCode) {
  if (!responseCode) responseCode = 200;
  fs.readFile(__dirname + path, function (err, data) {
    if (err) {
      res.writeHead(500, {'Content-Type': 'text/plain'});
      res.end('500 - Internal Error');
    } else {
      res.writeHead(responseCode,
        {'Content-Type': contentType});
      res.end(data);
    }
  });
}
http.createServer(function (req, res) {
  let url = req.url.split("?")
  console.log(url)

  let params = qs.parse(url[1]);
  console.log(params)

  let path = url[0].toLowerCase();
  switch (path) {

    case '/':
      serveStaticFile(res, '/public/home.html', 'text/html');
      res.end(home);
      break;

    case '/about':
      serveStaticFile(res, '/public/about.html', 'text/html');
      break;

    case '/search':
      let song = music.get(params.title)
      res.writeHead(200, {'Content-Type': 'text/plain'});
      res.end(JSON.stringify(song));
      break;

    case '/add':
      serveStaticFile(res, '/public/add.html', 'text/html');
      break;

    case '/delete':
      let remove = music.delete(params.title);
      res.writeHead(200, {'Content-Type': 'text/plain'});
      res.end(JSON.stringify(remove));
    default:
      serveStaticFile(res, '/public/404.html', 'text/html', 404);
      res.end(error);
      break;
  }

}).listen(process.env.PORT || 3000);