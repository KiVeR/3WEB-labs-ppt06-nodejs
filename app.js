var http = require('http');
var fs = require('fs');
var url = require('url');

var server = http.createServer(
    function(request, response) {
        //console.log(request.headers);
        //console.log('METHOD: ', request.method);
        //console.log('URL: ',request.url);
        var url_parts = url.parse(request.url, true);

        if(request.method == 'GET' && url_parts.pathname == '/') {
            response.writeHead(200, {'Content-Type': 'text/html'});
            response.write("<!doctype html>");
            response.write("<html><body>");
            response.write("<button><a href='/form'>Go to the form !</a></button>");
            response.end("</body></html>");
        }
        else if(request.method == 'GET' && url_parts.pathname == '/form') {
            fs.readFile('form.html', function(err, data) {
                if(err){
                    response.writeHead(500, {'Content-Type': 'text/html'});
                    response.write("<!doctype html>");
                    response.write("<html><body>");
                    response.write("File doesn't exist");
                    response.end("</body></html>");
                }
                response.writeHead(200, {'Content-Type': 'text/html'});
                response.end(data); // Display file contents
            });
        }
        else if(request.method == 'GET' && url_parts.pathname == '/completed') {
            var data = "";
            request.on('data', function(chunk) {
                console.log('Received data:', chunk.toString());
                data += chunk.toString();
            });
            request.on('end', function() {
                console.log('Complete data:', data);
                response.writeHead(200, {'Content-Type': 'application/json'});
                response.end(JSON.stringify(url_parts.query));
            });
        }
        else{
            response.writeHead(403, {'Content-Type': 'text/html'});
            response.write("<!doctype html>");
            response.write("<html><body>");
            response.write("<p>This page is forbidden</p>");
            response.end("</body></html>");
        }
    }
).listen(1337);
console.log('Server running on port 1337');

