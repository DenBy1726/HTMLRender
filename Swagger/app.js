'use strict';

var SwaggerExpress = require('swagger-express-mw');
var app = require('express')();
const bodyParser = require('body-parser');
module.exports = app; // for testing

var config = {
  appRoot: __dirname // required config
};

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

SwaggerExpress.create(config, function(err, swaggerExpress) {
  if (err) { throw err; }

  // install middleware
  swaggerExpress.register(app);

  var port = process.env.PORT || 10010;
  app.listen(port);

  if (swaggerExpress.runner.swagger.paths['/render']) {
    console.log('try this:\ncurl http://127.0.0.1:' + port);
  }
});
