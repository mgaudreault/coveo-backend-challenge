'use strict';
import express from 'express';
var app = express();

import router from './api/routes'

app.use(router);

var port = process.env.port || 8080;

var server = app.listen(port, () => {
  console.log(`App running on port ${port}`);
});
