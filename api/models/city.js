'use strict';
import mongoose from 'mongoose';
import {mongoURI} from '../../config/database';

mongoose.connect(mongoURI);

let citySchema = new mongoose.Schema({
  name: String,
  country_code: String,
  admin1_code: String,
  longitude: Number,
  latitude: Number,
});

/**
 * Get a non ambiguous name from a city object
 * @param {object} city
 * @return {string} Long city name
 */
function getCityFullName(city) {
  if (city.country_code === 'CA') {
    return `${city.name}, ${city.country_code}, ${canadaAdminCodeToString(city.admin1_code)}`;
  } else {
    return `${city.name}, ${city.country_code}, ${city.admin1_code}`;
  }
}

/**
 * Get Canadian province from admin1 code
 * @param {number} code
 * @return {string} Canadian province string
 */
function canadaAdminCodeToString(code) {
  switch (code) {
    case '01': return 'AB';
    case '02': return 'BC';
    case '03': return 'MB';
    case '04': return 'NB';
    case '05': return 'NL';
    case '07': return 'NS';
    case '08': return 'ON';
    case '09': return 'PE';
    case '10': return 'QC';
    case '11': return 'SK';
    case '12': return 'YT';
    case '13': return 'NT';
    case '14': return 'NU';
  }
}

/**
 * City model
 */
let City = mongoose.model('City', citySchema);

export {City, getCityFullName};
