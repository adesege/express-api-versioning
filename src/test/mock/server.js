import express from 'express';
import path from 'path';
import expressApiVersioning from '../../index';

const app = express();

const config = {
  apiPath: path.join(__dirname, './api'),
  test: /\/api\/(v[0-9]+).*/,
  entryPoint: 'index.js',
  instance: app
};

app
  .use(expressApiVersioning(config, (error, req, res, next) => {
    require('./client/index')
      .default(app);
    next();
  }));

export default app;
