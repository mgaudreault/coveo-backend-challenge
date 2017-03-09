'use strict';
import mongoose from 'mongoose'

mongoose.connect('mongodb://localhost/coveo-challenge');

var citySchema = new mongoose.Schema({
  name: String,
  country_code: String,
  longitude: Number,
  latitude: Number
});

var City = mongoose.model('City', citySchema);

export default City;
