let fetch = require('node-fetch');
let http = require('http');

let server = http.createServer(function(request, response) {
    let url = request.url;

    fetch(url,{ method: 'GET'}).then(resp => {
        return resp.text();
    }).then(resp=>{
        response.write(resp,'utf8');
        response.end();
    });

}).listen(7002);
