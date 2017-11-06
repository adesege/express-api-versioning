import chai from 'chai';
import path from 'path';
import supertest from 'supertest';
import expressApiVersioning from '../index';
import versioningConfig from './config';
import app from './mock/server';

const request = supertest(app);
const { expect } = chai;
versioningConfig.apiPath = path.join(__dirname, './mock/api');
let newConfig;

describe('Express API Versioning', () => {
  it('should throw an error when api path is not explicitly set', () => {
    newConfig = {
      ...versioningConfig,
      apiPath: ''
    };
    expect(expressApiVersioning(newConfig, error => error.message)())
      .to.equal('You must explicitly specify a path to where the APIs reside');
  });

  it('should throw an error when an instance of express is not set', () => {
    newConfig = {
      ...versioningConfig,
      instance: ''
    };
    expect(expressApiVersioning(newConfig, error => error.message)())
      .to.equal('You must explicitly set an instance of express');
  });

  it('should throw an error when api path cannot be found', () => {
    expect(expressApiVersioning(
      versioningConfig,
      error => error.message
    )({ url: '/api/v4' }))
      .to.equal('Entry point not Found');
  });

  it('should throw an error when an instance of express is not a function', () => {
    newConfig = {
      ...versioningConfig,
      instance: 'An instance'
    };
    expect(expressApiVersioning(newConfig, error => error.message)())
      .to.equal('An instance of express must be a function but got type string');
  });

  it('should throw an error if the endpoint does not match the test condition', () => {
    expect(expressApiVersioning(versioningConfig, error => error.message)({ url: '/api/unknown' }))
      .to.equal('No version number found');
  });

  it('should return 200 OK when the api route is found', (done) => {
    request
      .get('/api/v1/')
      .expect(200)
      .expect('Content-Type', /json/)
      .end((err, req) => {
        expect(JSON.parse(req.res.text).message).to.equal('Hello, you got to this end point successfully');
        if (err) return done(err);
        done();
      });
  });

  it('should return 200 OK when the client route is found', (done) => {
    request
      .get('/')
      .expect(200)
      .expect('Content-Type', /json/)
      .end((err, req) => {
        expect(JSON.parse(req.res.text).message).to.equal('You got to the client endpoint successfully');
        if (err) return done(err);
        done();
      });
  });
});
