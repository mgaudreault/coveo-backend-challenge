'use strict';
import express from 'express';
import City from './models/city';

var app = express();

app.get('/suggestions', (req, res) => {
  let q = req.query;

  res.send(q);
});

var server = app.listen(8080, () => {
  var host = server.address().address
  var port = server.address().port

  console.log("Example app listening at http://%s:%s", host, port)
});
