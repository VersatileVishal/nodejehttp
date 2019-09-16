var http = require('http');
var url = require('url');
var fs = require('fs');
let tasks = [];

/* Reads the file at the given path and serves it to the client. The
 * Content-Type header will be set to the provided contentType. */
function readAndServe(path, contentType, response) 
{
  fs.readFile(path, function(error, data) {
    if (error) {
      throw error;
    }

    response.writeHead(200, {'Content-type': contentType});
    response.write(data);
    response.end();
  });
}

function writeTask(response) 
{  
  var tasksJSON = JSON.stringify(tasks);
  fs.writeFile('products.txt', tasksJSON, function(error) {
  if (error) 
  {
    throw error;
  }
  response.write("Done");
  response.end();
  });
}


/* Reads the JSON body of the request and parses it. Calls the given callback,
 * passing in the parsed object. */
function readJSONBody(request, response) 
{
  var body = '';
  request.on('data', function(chunk) {
					 body += chunk;
			});

  request.on('end', function() {
					var task = JSON.parse(body);
          tasks.push(task);
          writeTask( response);
          
        });
}

/* Serves files for the task list, and provides routes to create/delete tasks. */
http.createServer(function(request, response) 
{
  var pathname = url.parse(request.url).pathname;

  if (request.method === "GET") {
    if (pathname === "/user") {
      readAndServe('manage-product.html', 'text/html', response);
    }
    else if(pathname==="/order"){
      readAndServe('products.txt','text/json',response);
    }
    else {
      response.end();
    }
  }
  
  else if (request.method === "POST") 
  {
    if (pathname === "/addProduct") {
      readJSONBody(request, response);
    } else {
      response.end();
    }
  }
  
  else {
    response.end();
  }

}).listen(8000, '127.0.0.1');

console.log('Running on 127.0.0.1:8000');