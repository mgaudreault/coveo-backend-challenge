'use strict';
import mongoose from 'mongoose'

mongoose.connect('mongodb://localhost/coveo-challenge');

var City = mongoose.model('City', {name: String});

export default City;
