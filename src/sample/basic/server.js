import express from 'express';
import path from 'path';
import expressApiVersioning from '../../index';

const app = express();

app.use(expressApiVersioning({
  instance: app, // passes an instance of express to the entry point
  apiPath: path.join(__dirname, './api') // absolute path to the api directory
}));

export default app;
