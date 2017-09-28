import mergeConfig from 'lodash/merge';
import path from 'path';
import fs from 'fs';
import { Exception } from './utils/exception';

export default (config) => {
  // define default configuration options
  const defaultConfig = {
    test: /\/api\/(v[0-9]+)[a-z0-9/_+-]*/,
    entryPoint: 'app.js',
    apiPath: '',
    instance: null
  };

  // merge default configuration options with user defined config options
  const mergedConfig = mergeConfig(defaultConfig, config);

  // get config options from merged configs
  const {
    test,
    entryPoint,
    apiPath,
    instance
  } = mergedConfig;

  if (!apiPath) { // throw exception if the apiPath is not specified
    throw new Exception('You must explicitly specify a path to where the APIs reside');
  }

  if (!instance) { // throw an exception if the express instance is undefined
    throw new Exception('You must explicitly set an instance of express');
  }

  if (typeof instance !== 'function') { // throw an exception if the instance is not a function
    throw new Exception(`An instance of express must be a function but got type ${typeof instance}`);
  }

  return (httpRequest, httpResponse, next) => {
    // test if the version number/type exist in the url
    const testUrl = httpRequest.url.match(test);
    const version = testUrl ? testUrl[1] : '';

    if (version) { // if we have the version number/type in url
      // normalize path to the entry point
      const fullPath = path.normalize(`${apiPath}/${version}/${entryPoint}`);
      if (fs.existsSync(fullPath)) { // check if the entry point exist
        if (typeof require(fullPath).default === 'function') {
          require(fullPath).default(instance); // import the entry point
        } else {
          require(fullPath)(instance);
        }
        next();
      }
    }
    throw new Exception('Not Found');
  };
};
