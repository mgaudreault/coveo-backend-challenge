'use strict'
import City from '../models/city';
import _ from 'underscore';

function getSuggestions(partialText, longitude, latitude, callback) {
  let results = City.find({name: {$regex:`.*${partialText}.*`, $options: 'i'}}).lean().exec((err, suggestions) => {
    if (err) {
      console.log(err);
    } else {
      // if position is given
      if (longitude !== undefined && latitude !== undefined) {
        suggestions = _.map(suggestions, function(suggestion) {
          suggestion.distance =  getDistance(suggestion, longitude, latitude);
          return suggestion;
        });
      }

      callback(err, suggestions);
    }
  });
}

/**
 * Compute distance in km between two coordinates using equirectangular approximation
 */
function getDistance(city, longitude, latitude) {
  let long1 = city.longitude * Math.PI / 180;
  let long2 = longitude * Math.PI / 180;
  let lat1 = city.latitude * Math.PI / 180;
  let lat2 = latitude * Math.PI / 180;

  let x = (long2-long1) * Math.cos((lat1+lat2)/2);
  let y = lat2-lat1;
  return Math.sqrt(x*x + y*y) * 6371;  // in km
}

export default getSuggestions;
