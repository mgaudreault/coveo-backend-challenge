'use strict'
import { City, getCityFullName } from '../models/city';
import _ from 'lodash';

function getSuggestions(partialText, longitude, latitude, callback) {
  let results = City.find({name: {$regex:`.*${partialText}.*`, $options: 'i'}}).lean().exec((err, suggestions) => {
    if (err) {
      console.log(err);
    } else {
      // if position is given

      suggestions = _.map(suggestions, function(suggestion) {
        suggestion.distance =  getDistance(suggestion, longitude, latitude);
        return suggestion;
      });


      let sortedResults = scoreResults(suggestions, partialText);

      callback(err, sortedResults);
    }
  });
}

/**
 * Compute the query scoring for the request.
 * Base score of 500 for perfect string match - 10 per letters not matching
 * Max score of 250 for distance - 1/10 km of distance
 * 100 if begins with query
 */
function scoreResults(suggestions, partialText) {
  let suggestionsDetails = _.map(suggestions, suggestion => {
    suggestion.lengthDifference = suggestion.name.length - partialText.length;
    return suggestion;
  });

  let scoredResults = _.map(suggestionsDetails, (suggestion) => {
    suggestion.score = Math.max(0, 50 - suggestion.lengthDifference) * 10 + Math.max(2500 - suggestion.distance) / 10 + suggestion.name.startsWith(partialText) ? 100 : 0;
    return suggestion
  });

  // format results to be sent
  let results = _.map(scoredResults, (result) => {
    return {
      name: getCityFullName(result),
      score: result.score / 850
    };
  });

  return _.orderBy(results, 'score', 'desc');
}


/**
 * Compute distance in km between two coordinates using equirectangular approximation
 */
function getDistance(city, longitude, latitude) {
  if (longitude !== undefined && latitude !== undefined) {
    let long1 = city.longitude * Math.PI / 180;
    let long2 = longitude * Math.PI / 180;
    let lat1 = city.latitude * Math.PI / 180;
    let lat2 = latitude * Math.PI / 180;

    let x = (long2-long1) * Math.cos((lat1+lat2)/2);
    let y = lat2-lat1;
    return Math.sqrt(x*x + y*y) * 6371;  // in km
  } else {
    return 0;
  }
}

export default getSuggestions;
