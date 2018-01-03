'use strict';
/*
 'use strict' is not required but helpful for turning syntactical errors into true errors in the program flow
 https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Strict_mode
*/


const util = require('util');
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


function renderHTML(req, res) {

    let url = req.swagger.params.url.value.url;
    let buffer = "";

    fetch(url, {method: 'GET'}).then(resp => {
        return resp.text();
    }).then(buffer => {
        let dom = new JSDOM(buffer, options);
        let rendered = dom.serialize();
        let scripts = [];
        for (let i = 0; i < dom.window.document.scripts.length; i++) {
            let src = dom.window.document.scripts[i].src;
            if (src === undefined || src === "")
                continue;
            scripts.push(src);
        }
        res.json(rendered);
    });

}

module.exports = {
    renderHTML: renderHTML
};
