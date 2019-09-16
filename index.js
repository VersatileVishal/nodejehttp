const http = require('http');

http.createServer((req,res)=>{
   if(req.url==='/user')
   {
       res.writeHead(200,{'Content-Type':'application/json'});
       res.end('{"Name":"Vishal","Id":"1711981343"}');
   }
   else if(req.url==='/order')
   {
    res.writeHead(200,{'Content-Type':'application/json'});
    res.end('{"Subject":"NodeJS","Project":"HttpRequest"}');
   }
   else
   {
       res.end();
   }

}).listen(3000,function(){
    console.log('listening');
});


