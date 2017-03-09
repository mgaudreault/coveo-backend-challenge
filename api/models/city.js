'use strict';
import mongoose from 'mongoose'

mongoose.connect('mongodb://localhost/coveo-challenge');

var citySchema = new mongoose.Schema({
  name: String,
  country_code: String,
  admin1_code: String,
  longitude: Number,
  latitude: Number
});

function getCityFullName(city) {
  if (city.country_code === 'CA') {
    return `${city.name}, ${city.country_code}, ${canadaAdminCodeToString(city.admin1_code)} `
  } else {
    return `${city.name}, ${city.country_code}, ${city.admin1_code} `
  }
}

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

var City = mongoose.model('City', citySchema);
export {City, getCityFullName};
