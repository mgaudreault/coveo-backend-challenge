'use strict'
import City from '../models/city'

function getSuggestions(partialText, longitude, latitude, callback) {
  let results = City.find({name: {$regex:`.*${partialText}.*`, $options: 'i'}}, (err, suggestions) => {
    if (err) {
      console.log(err);
    } else {
      callback(err, suggestions);
    }
  });
}

export default getSuggestions;
