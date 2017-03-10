'use strict';
import express from 'express';
import getSuggestions from './lib/suggestions';
import {extractCityFacets} from './models/city';

let router = new express.Router();

router.get('/suggestions', (req, res) => {
  let q = req.query;


  getSuggestions(q.q, q.longitude, q.latitude, extractCityFacets(q), (err, suggestions) => {
    if (err) {
      res.status(400).send(err);
    } else {
      res.json({suggestions: suggestions});
    }
  });
});

export default router;
