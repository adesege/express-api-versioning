import chai from 'chai';
import request from 'supertest';
import app from '../../sample/basic/server';
import expressApiVersioning from '../../index';


const { expect } = chai;

describe('Basic', () => {
  describe('Express API Versioning', (done) => {
    it('should throw an exception when api path is not explicitly set', () => {
      expect(() => expressApiVersioning({ instance: f => f }))
        .to.throw('You must explicitly specify a path to where the APIs reside');
    });

    it('should throw an exception when an instance of express is not set', () => {
      expect(() => expressApiVersioning({ apiPath: '../index.js' }))
        .to.throw('You must explicitly set an instance of express');
    });

    it('should throw an exception when api path cannot be found', () => {
      request(app)
        .get('/api/v4')
        .end((error, response) => {
          expect(response.statusCode.to.equal(500));
          if (error) return done(error);
          done();
        });
    });

    it('should throw an exception when an instance of express is not a function', () => {
      expect(() => expressApiVersioning({
        apiPath: '../index.js',
        instance: 'An instance'
      }))
        .to.throw('An instance of express must be a function but got type string');
    });

    it('should throw an error if the endpoint does not match the test condition', () => {
      request(app)
        .get('/api/unknown')
        .end((err, response) => {
          expect(response.statusCode).to.equal(500);
          if (err) return done(err);
          done();
        });
    });

    it('should return 200 Ok when a route is found', () => {
      request(app)
        .get('/api/v1')
        .end((err, res) => {
          expect(res.statusCode).to.equal(200);
          expect(res.body.message).to.be.a('string');
          if (err) return done(err);
          done();
        });
    });
  });
});
