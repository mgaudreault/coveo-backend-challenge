'use strict';
import express from 'express';
let app = express();

import router from './api/routes';

// use api router
app.use(router);

let port = process.env.PORT || 8080;

// main app loop
app.listen(port, () => {
  console.log(`App running on port ${port}`);
});
