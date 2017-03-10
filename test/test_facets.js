'use strict';
import assert from 'assert';
import {extractCityFacets} from '../api/models/city';

describe('facet extraction', () => {
  describe('extractFacets', () => {
    it('should return an empty array if no valid facet is found', () => {
      assert.deepEqual([], extractCityFacets({}));
      assert.deepEqual([], extractCityFacets({notAFacet: 'test'}));
    });

    it('should return facets as an array of object if valid facets are found', () => {
      assert.deepEqual([{country_code: 'CA'}], extractCityFacets({country_code: 'CA'}));
    });
  });
});
