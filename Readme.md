[![Build Status](https://travis-ci.org/adesege/express-api-versioning.svg)](https://travis-ci.org/adesege/express-api-versioning)
[![Coverage Status](https://coveralls.io/repos/github/adesege/express-api-versioning/badge.svg)](https://coveralls.io/github/adesege/express-api-versioning) 
[![Code Climate](https://codeclimate.com/github/adesege/express-api-versioning/badges/gpa.svg)](https://codeclimate.com/github/adesege/express-api-versioning) 
[![Test Coverage](https://codeclimate.com/github/adesege/express-api-versioning/badges/coverage.svg)](https://codeclimate.com/github/adesege/express-api-versioning/coverage) 
[![Issue Count](https://codeclimate.com/github/adesege/express-api-versioning/badges/issue_count.svg)](https://codeclimate.com/github/adesege/express-api-versioning)

# Express API Versioning

Express API versioning is an express middleware that dynamically loads different API versions seamlessly depending on the version number specified in the request url.

It is written in Javascript ES6 syntax and it is further transpiled down to Javascript ES5 using babel.

# What's new in v2
- Version 2 introduces a new way to resolve errors using callback instead of the `try` and `catch` block.

# Installation

- `npm install express-api-versioning --save`
- `express` is required as a peer dependency.

# Usage

### Using ES6

` import expressApiVersioning from 'express-api-versioning';`
### Using ES5

` const expressApiVersioning = require('express-api-versioning');`

   ```js
app.use(expressApiVersioning({
		apiPath: path.join(__dirname, './api'),// absolute path to the api directory
		test: /\/api\/(v[0-9]+).*/, // regular expression to get the version number from the url
		entryPoint: 'index.js', // entry point exports a function which takes an instance of express as parameter.
		instance: app // passes an instance of express to the entry point
}, (error, req, res, next) => {
    // Do something here with the error
    next(); // calls the next middleware
  }));
```

# Error Handling

As of v2, the middleware returns an error object as the first parameter of the callback and has properties `code` and `message`.

The middleware will throw an error when;
1. the `apiPath` is not specified
1. an express `instance` is not specified and not a function
1. the api version cannot be found in the `api directory`.

# Error Code

| S/N | Code | Message |
| --- | -------- | -------- |
| 1. | 101 | You must explicitly specify a path to where the APIs reside |
| 2. | 102 | You must explicitly set an instance of express |
| 3. | 103 | Entry point not Found |
| 4. | 104 | No version number found |
| 5. | 105 | An instance of express must be a function but got type `${typeof instance}` |

# Issue Reporting

Please use the [issues](https://github.com/adesege/express-api-versioning/issues) page to report an issue.

# API References

`Express API Versioning` is highly customizable and does not introduce complexities to your application folder structure. It takes a configuration object as parameter.

| Configuration item | Default | Description |
| ------ | ------ | ------- |
| test | `/\/api\/(v[0-9]+).*/`| Regular expression to get the version number from the request url. It gets the version number from the first group of the regex match.
| entryPoint | app.js | Entry point for each api version. It exports a function which takes an instance of express as parameter.
| apiPath | empty string | Absolute path to each api version container/directory. This is usually `path.join(__dirname, './api')`.
| instance | null | An instance of express app which will be passed down to the entry point for usage.

# Todo

- Create a boilerplate for `Express API Versioning` with `Sequelize` as ORM

# Author

**Temitayo Fadojutimi** is a Software Developer at Andela and he dedicates his expertise to solving practical problems in the society. He tweets at [@adesege_](http://twitter.com/adesege_)

# Testing

To test this package,
- Clone this repo or `npm install express-api-versioning`
- cd into the package directory and run `npm install`
- Then run `npm test` to run the test.

# Contributing

Thank you for your interest in contributing to this package. I currently accept contributions from everyone but I expect that standards are maintained.
To contribute,
1. Fork the project
1. Create a feature branch, branch away from `master`
1. Write tests, using `Mocha and Chai` or any other testing frameworks, and code
1. If you have multiple commits please combine them into a few logically organized commits by [squashing them](git-squash)
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