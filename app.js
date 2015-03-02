var http = require('http');
var server = http.createServer(function(request, response) {

        //console.log(request.headers);
        //console.log('METHOD: ', request.method);
        //console.log('URL: ',request.url);

        switch(request.method) {
            case "GET":
                switch(request.url){
                    case "/":
                        response.writeHead(200, {'Content-Type': 'text/html'});
                        response.write("<!doctype html>");
                        response.write("<html><body>");
                        response.write("<button><a href='/form'>Go to the form !</a></button>");
                        response.end("</body></html>");
                        break;
                    case "/form":
                        response.writeHead(200, {'Content-Type': 'text/html'});
                        response.write("<!doctype html>");
                        response.write("<html><body>");
                        response.write("<form method='POST' action='/completed'>");
                        response.write("<input type='text' name='data1'/><br><br>");
                        response.write("<input type='text' name='data2'/><br><br>");
                        response.write("<input type='text' name='data3'/><br><br>");
                        response.write("<input type='text' name='data4'/><br><br>");
                        response.write("<input type='submit' value='Send'/>");
                        response.end("</form></body></html>");
                        console.log("HTTP response status code /form: " + response.statusCode);
                        break;
                    default:
                        response.writeHead(403, {'Content-Type': 'text/html'});
                        response.write("<!doctype html>");
                        response.write("<html><body>");
                        response.write("<p>This page is forbidden</p>");
                        response.end("</body></html>");
                }
            break;
            case "POST":
                switch(request.url){
                    case "/completed":
                        var data = "";
                        request.on('data', function(chunk) {
                            console.log('Received data:', chunk.toString());
                            data += chunk.toString();
                        });
                        request.on('end', function() {
                            console.log('Complete data:', data);
                            response.writeHead(200, {'Content-Type': 'text/html'});
                            response.write("<!doctype html>");
                            response.write("<html><body>");
                            response.write("Data : "+ data);
                            response.end("</body></html>");
                        });
                    break;
                }
            break;
        }
    }
).listen(1337);
console.log('Server running on port 1337');

