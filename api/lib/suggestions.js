'use strict'
import { City, getCityFullName } from '../models/city';
import _ from 'lodash';

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

      let sortedResults = scoreResults(suggestions, partialText);

      callback(err, sortedResults);
    }
  });
}

/**
 * Base score of 500 for perfect string match
 * Max score of 250 for distance
 */
function scoreResults(suggestions, partialText) {
  let suggestionsDetails = _.map(suggestions, suggestion => {
    suggestion.lengthDifference = suggestion.name.length - partialText.length;
    // suggestion.distanceScore = (suggestion.distance > 2500) ? 2500 : suggestion.distance;
    suggestion.lel = suggestion.fullName;
    return suggestion;
  });

  let scoredResults = _.map(suggestionsDetails, (suggestion) => {
    suggestion.score = (50 - suggestion.lengthDifference) * 10 + (2500 - suggestion.distance) / 10;
    return suggestion
  });

  // format results to be sent
  let results = _.map(scoredResults, (result) => {
    return {
      name: getCityFullName(result),
      score: result.score / 750
    };
  });

  return _.orderBy(results, 'score', 'desc');
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
