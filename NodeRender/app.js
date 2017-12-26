const express = require('express');
const jsdom = require("jsdom");
const bodyParser = require('body-parser');
const https = require("https");
const request = require('request');
const { JSDOM } = jsdom;

let app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

let options = {
    runScripts: "dangerously"
};

app.post('/',function(req,res){
    let url = req.body.url;
    JSDOM.fromURL(url, options).then(dom => {
        res.send(dom.serialize());
    });
});

app.post('/plain',function(req,res){
    let url = req.body.url;
    request(url, (err, response, body) =>  res.send(body));
});



let server = app.listen(3000,function(){

    console.log("Listening to port %s",server.address().port);

});

module.exports = app;

