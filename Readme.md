[![Build Status](https://travis-ci.org/adesege/express-api-versioning.svg)](https://travis-ci.org/adesege/express-api-versioning)
[![Coverage Status](https://coveralls.io/repos/github/adesege/express-api-versioning/badge.svg)](https://coveralls.io/github/adesege/express-api-versioning) 
[![Code Climate](https://codeclimate.com/github/adesege/express-api-versioning/badges/gpa.svg)](https://codeclimate.com/github/adesege/express-api-versioning) 
[![Test Coverage](https://codeclimate.com/github/adesege/express-api-versioning/badges/coverage.svg)](https://codeclimate.com/github/adesege/express-api-versioning/coverage) 
[![Issue Count](https://codeclimate.com/github/adesege/express-api-versioning/badges/issue_count.svg)](https://codeclimate.com/github/adesege/express-api-versioning)

# Express API Versioning

Express API versioning is an express middleware that dynamically loads different API versions seamlessly depending on the version number specified in the request url.

It is written in Javascript ES6 syntax and it is further transpiled down to Javascript ES5 using babel.

# Installation

- `npm install express-api-versioning --save`
- `express` is required as a peer dependency.

# Usage

### Using ES6

` import expressApiVersioning from 'express-api-versioning';`
### Using ES5

` const expressApiVersioning = require('express-api-versioning');`
### Basic Usage

   ```js
app.use(expressApiVersioning({
  	instance: app, // passes an instance of express to the entry point
  	apiPath: path.join(__dirname, './api'), // absolute path to the api directory
	test: /\/api\/(v[0-9]+)[a-z0-9/_+-]*/, // regular expression to get the version number from the url
	entryPoint: 'app.js' // entry point exports a function which takes an instance of express as parameter.
}));
```
### Advanced Usage

```js
app.use(expressApiVersioning({
	instance: app, // passes an instance of express to the entry point
	apiPath: path.join(__dirname, './api'), // absolute path to the api directory
	test: /\/endpoint\/(v[0-9]+)[a-z0-9/_+-]*/, // regular expression to get the version number from the url,
	entryPoint: 'index.js' // entry point exports a function which takes an instance of express as parameter.
}));
```
- Check the [src/example](/src/sample) directory to understand the folder structure.

# Error Handling

The middleware will throw an exception when;
1. the `apiPath` is not specified
1. an express `instance` is not specified and not a function
1. the api version cannot be found in the `api directory`.

# Issue Reporting

Please use the [issues](/issues) page to report an issue.

# API References

`Express API Versioning` is highly customizable and does not introduce complexities to your application folder structure. It takes a configuration object as parameter.

| Configuration item | Default | Description |
| ------ | ------ | ------- |
| test | /\/api\/(v[0-9]+)[a-z0-9/_+-]*/ | Regular expression to get the version number from the request url. It gets the version number from the first group of the regex match.
| entryPoint | app.js | Entry point for each api version. It exports a function which takes an instance of express as parameter.
| apiPath | empty string | Absolute path to each api version container/directory. This is usually `path.join(__dirname, './api')`.
| instance | null | An instance of express app which will be passed down to the entry point for usage.

# Todo

- Create a boilerplate for `Express API Versioning` with `Sequelize` as ORM

# Author

**Temitayo Fadojutimi** is a Software Developer at Andela and he dedicates his expertise to solving practical problems in the society. He tweets at [@adesege_](http://twitter.com/adesege_)

# Testing

If you will like to test this package,
- Clone this repo or `npm install express-api-versioning`
- cd into the package directory and run `npm install`
- Then run `npm test` to run the test.

# Contributing

Thank you for your interest in contributing to this package. I currently accept contributions from everyone but I expect that standards are maintained.
To contribute,
1. Fork the project
1. Create a feature branch, branch away from `master`
1. Write tests, using `Mocha and Chai` or any other testing frameworks, and code
<<<<<<< HEAD
1. If you have multiple commits please combine them into a few logically organized commits by [squashing them][git-squash]
=======
1. If you have multiple commits please combine them into a few logically organized commits by [squashing them](git-squash)
>>>>>>> 69b9a79... release v1.0.0
1. Push the commit(s) to your fork
1. Submit a merge request (MR) to the `master` branch
1. The MR title should describe the change you want to make
1. The MR description should give a motive for your change and the method you used to achieve it.
  1. Mention the issue(s) your merge request solves, using the `Solves #XXX` or
    `Closes #XXX` syntax to auto-close the issue(s) once the merge request will
    be merged.
1. Be prepared to answer questions and incorporate feedback even if requests for this arrive weeks or months after your MR submission
  1. If a discussion has been addressed, select the "Resolve discussion" button beneath it to mark it resolved.
1. When writing commit messages please follow
   [these guidelines](http://chris.beams.io/posts/git-commit).