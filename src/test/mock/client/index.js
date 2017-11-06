import routes from './routes';

export default (app) => {
  // bootstrap client routes
  app.use(routes);
};
