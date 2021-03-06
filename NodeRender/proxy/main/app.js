const express = require('express');
const bodyParser = require('body-parser');
const http = require("http");
const jsdom = require("jsdom");
const { StringDecoder } = require('string_decoder');
const { JSDOM } = jsdom;
let fetch = require('node-fetch');

let options = {
    runScripts: "dangerously",
    resources: "usable"
};


let app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const proxies = [
    "http://localhost:7000",
    "http://localhost:7001",
    "http://localhost:7002"
];

app.post('/',function(req,response) {
    let url = req.body.url;
    let buffer = "";

    fetch(url, {method: 'GET'}).then(resp => {
        return resp.text();
    }).then(buffer => {
        let dom = new JSDOM(buffer, options);
        let rendered = dom.serialize();
      /*  let scripts = [];
        for (let i = 0; i < dom.window.document.scripts.length; i++) {
            let src = dom.window.document.scripts[i].src;
            if (src === undefined || src === "")
                continue;
            scripts.push(src);
        }*/

        response.send(rendered);
    });
});

let server = app.listen(3000,function(){

    console.log("Listening to port %s",server.address().port);

});

module.exports = app;

