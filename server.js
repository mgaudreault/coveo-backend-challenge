'use strict';
import express from 'express';
var app = express();

import router from './api/routes'

app.use(router);

var server = app.listen(8080, () => {
  var host = server.address().address
  var port = server.address().port

  console.log("Example app listening at http://%s:%s", host, port)
});
