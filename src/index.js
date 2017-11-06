import path from 'path';
import fs from 'fs';

export default (config, callback) => {
  // define default configuration options
  const defaultConfig = {
    test: /\/api\/(v[0-9]+).*/,
    entryPoint: 'app.js',
    apiPath: '',
    instance: null
  };

    // merge default configuration options with user defined config options
  const mergedConfig = {
    ...defaultConfig,
    ...config
  };

    // get config options from merged configs
  const {
    test,
    entryPoint,
    apiPath,
    instance
  } = mergedConfig;

  return (httpRequest, httpResponse, next) => {
    if (!apiPath) { // throw an error if the apiPath is not specified
      return callback({
        code: 101,
        message: 'You must explicitly specify a path to where the APIs reside'
      }, httpRequest, httpResponse, next);
    }

    if (!instance) { // throw an error if the express instance is undefined
      return callback({
        code: 102,
        message: 'You must explicitly set an instance of express'
      }, httpRequest, httpResponse, next);
    }

    if (typeof instance !== 'function') { // throw an error if the instance is not a function
      /* istanbul ignore next */
      return callback({
        code: 105,
        message: `An instance of express must be a function but got type ${typeof instance}`
      }, httpRequest, httpResponse, next);
    }

    // test if the version number/type exist in the url
    const testUrl = httpRequest.url.match(test);
    const version = testUrl ? testUrl[1] : '';

    if (version) { // if we have the version number/type in url
      // normalize path to the entry point
      const fullPath = path.normalize(`${apiPath}/${version}/${entryPoint}`);
      if (fs.existsSync(fullPath)) { // check if the entry point exist
        /* istanbul ignore else */
        if (typeof require(fullPath).default === 'function') {
          require(fullPath).default(instance); // import the entry point
        } else {
          require(fullPath)(instance);
        }
        return callback(null, httpRequest, httpResponse, next);
      }
      return callback({
        code: 103,
        message: 'Entry point not Found'
      }, httpRequest, httpResponse, next); // we can't find the entry point, throw an error
    }
    // we can't find the version number from the url, throw an error
    return callback({
      code: 104,
      message: 'No version number found'
    }, httpRequest, httpResponse, next);
  };
};
