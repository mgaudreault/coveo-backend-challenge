'use strict';
import express from 'express';
import getSuggestions from './lib/suggestions'
var router = express.Router();

router.get('/suggestions', (req, res) => {
  let q = req.query;
  getSuggestions(q.q, 0, 0, (err, suggestions) => {
    if (err) {

    } else {
      res.send(suggestions);
    }
  });
});

export default router;
