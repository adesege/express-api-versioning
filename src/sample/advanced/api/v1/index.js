import routes from './routes';

export default (app) => {
  // bootstrap api routes
  app.use('/endpoint/v1', routes);
};
