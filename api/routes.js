'use strict';
import express from 'express';
import getSuggestions from './lib/suggestions';

let router = new express.Router();

router.get('/suggestions', (req, res) => {
  let q = req.query;

  getSuggestions(q.q, q.longitude, q.latitude, (err, suggestions) => {
    if (err) {
      res.status(400).send(err);
    } else {
      res.json({suggestions: suggestions});
    }
  });
});

export default router;
