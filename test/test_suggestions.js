'use strict';
import 'babel-polyfill';
import assert from 'assert';
import getSuggestions from '../api/lib/suggestions';


describe('Suggestion methods', function() {
  describe('getSuggestions()', function() {
    it('should return 5 results for \'londo\' query', function(done) {
      getSuggestions('londo', null, null, function(err, suggestions) {
        if (err) {
          done(err);
        } else {
          assert.equal(5, suggestions.length);
          done();
        }
      });
    });

    it('results should not be case sensitive', function(done) {
      let count = 0;
      getSuggestions('lon', null, null, function(err, suggestions) {
        if (err) {
          done(err);
        } else {
          count = suggestions.length;
        }
      });
      getSuggestions('LoN', null, null, function(err, suggestions) {
        if (err) {
          done(err);
        } else {
          assert.equal(count, suggestions.length);
          done();
        }
      });
    });

    it('sould return an empty array when there are no results', function(done) {
      getSuggestions('SomeCityInTheMiddleOfNowhere', null, null, function(err, suggestions) {
        if (err) {
          done(err);
        } else {
          assert.deepEqual([], suggestions);
          done();
        }
      });
    });

    it('should throw invalid parameter error if long/lat is not a number', function(done) {
      getSuggestions('Lon', 'bob', 0, function(err, suggestions) {
        if (err) {
          assert.deepEqual(null, suggestions);
          done();
        } else {
          assert(false);
          done();
        }
      });
    });

    it('should thrown an error if q is not present', function(done) {
      getSuggestions(null, null, null, function(err, suggestions) {
        if (err) {
          assert.deepEqual(null, suggestions);
          assert(err);
          done();
        } else {
          assert(false);
          done();
        }
      });
    });

    it('The "Montréal" query should return the "Montréal" city with a score of 1', function(done) {
      getSuggestions('Montréal', undefined, undefined, function(err, suggestions) {
        if (err) {
          done(err);
        } else {
          assert.equal(1, suggestions[0].score);
          done();
        }
      });
    });

    it('The "London" query should return the "London, US, OH" first if we use Montréal, US, OH coordinates', function(done) {
      getSuggestions('London', -83.44825, 39.88645, function(err, suggestions) {
        if (err) {
          done(err);
        } else {
          assert.equal('London, US, OH', suggestions[0].name);
          done();
        }
      });
    });
  });
});
