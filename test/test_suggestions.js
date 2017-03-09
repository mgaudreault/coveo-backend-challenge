'use strict'
import assert from 'assert'
import getSuggestions from '../api/lib/suggestions';

describe('Suggestion methods', function() {
  describe('getSuggestions()', function() {
    it('should return 5 results for \'londo\' query', function(done) {
      getSuggestions('londo',0,0, function(err,suggestions){
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
      getSuggestions('lon',0,0, function(err,suggestions){
        if (err) {
          done(err);
        } else {
          count = suggestions.length;
        }
      });
      getSuggestions('LoN',0,0, function(err,suggestions){
        if (err) {
          done(err);
        } else {
          assert.equal(count, suggestions.length);
          done();
        }
      });
    });
  });
});
