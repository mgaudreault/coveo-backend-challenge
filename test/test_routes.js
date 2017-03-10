'use strict';
import assert from 'assert';
import request from 'request';

describe('Suggestion route', function() {
  describe('Valid tests', function() {
    it('should be valid if there is a query', function(done) {
      request('http://localhost:8080/suggestions?q=lon', (err, resp, body) => {
        assert.equal(200, resp.statusCode);
        done();
      });
    });
    it('should be valid with extra parameters', function(done) {
      request('http://localhost:8080/suggestions?q=lon&extra=more', (err, resp, body) => {
        assert.equal(200, resp.statusCode);
        done();
      });
    });
  });

  describe('Error tests', () => {
    it('should be not valid if there is no query', function(done) {
      request('http://localhost:8080/suggestions', (err, resp, body) => {
        assert.equal(400, resp.statusCode);
        done();
      });
    });
    it('should be not valid if longitude/latitude are not together', function(done) {
      request('http://localhost:8080/suggestions?q=lon&latitude=0', (err, resp, body) => {
        assert.equal(400, resp.statusCode);
        done();
      });
    });
    it('should be not valid if longitude/latitude are not together (bis)', function(done) {
      request('http://localhost:8080/suggestions?q=lon&longitude=0', (err, resp, body) => {
        assert.equal(400, resp.statusCode);
        done();
      });
    });
    it('should be not valid if longitude/latitude are not valid', function(done) {
      request('http://localhost:8080/suggestions?q=lon&latitude=0&longitude=a', (err, resp, body) => {
        assert.equal(400, resp.statusCode);
        done();
      });
    });
  });
});
