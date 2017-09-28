import express from 'express';
import path from 'path';
import expressApiVersioning from '../../index';

const app = express();

app.use(expressApiVersioning({
  instance: app, // passes an instance of express to the entry point
  apiPath: path.join(__dirname, './api'), // absolute path to the api directory
  test: /\/endpoint\/(v[0-9]+)[a-z0-9/_+-]*/, // regular expression to get the version number from the url,
  entryPoint: 'index.js' // entry point exports a function which takes an instance of express as parameter.
}));

export default app;
