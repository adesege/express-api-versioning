import routes from './routes';

export default (app) => {
  // bootstrap api routes
  app.use('/api/v1', routes);
};
