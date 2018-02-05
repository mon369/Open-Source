# Phone Number Parser Release 0.1

This is a simple Node/Express application that parses, validates, and displays phone numbers using Google's [libphonenumber](https://github.com/googlei18n/libphonenumber) library.

## Updates
As of February 4, 2018, unit testing using [Jest](https://facebook.github.io/jest/) and [Supertest](https://www.npmjs.com/package/supertest)  have been implemented 

## Bugs and Issues

Line 43-44 in [app.js](app.js): Parsing the [numbers.txt](numbers.txt) file produces an array of strings splitted with the '\n' delimeter, however also retains a carriage return '\r' in the output as follows.  This bug needs to be fixed in order to sanitize the original data from unintended characters.

```
[ 'hello from the other side\r',
  'hello\r',
  'can you\r',
  'hear me\r',
  '4161234567\r',
  '1112223333\r',
  '4164915050\r',
  '9052721441\r',
  '6479237466\r',
  '0011aaaaaa' ]
```

## To-do
- [x] Implement unit testing with [Jest](https://facebook.github.io/jest/) and [Supertest](https://www.npmjs.com/package/supertest) for various GET / endpoints.
- [ ] Continue implementing unit testing for POST /api/phonenumbers/parse/file/{file} endpoint.
- [ ] Improve the following HTML files: HomePage, How To, and Upload a File
- [ ] Provide support for Word Documents, and PDF files for file parsing.
- [ ] Reconstruct front-end to a React, Angular, or a Vue application.  Decision will be made once the previous to-do's have been completed.


## Working Demo on Heroku
https://osd600.herokuapp.com

## Setting up your environment
- In order for this application to work, you must have the latest [NodeJS](https://nodejs.org/en/download/) framework installed.
- [Visual Studio Code](https://code.visualstudio.com/) is the recommended IDE as it is being used for the current development of this application.

## Running the application locally
This application will run locally using port 8080.
Once your environment has been setup, follow these steps in order to run the application:
1. Install dependencies using npm
```
npm install or npm i
```
2. Run the application
```
npm start or node index.js
```

## Interacting with the application
Upon running the application, you will be taken to a homepage with details how to interact with the two API endpoints:

1. GET https://osd600.herokuapp.com/api/phonenumbers/parse/text/
   - Submit a phone number through the endpoint's parameter.  For example:
     ```
     /text/SenecaCollege4164915050 - this is a valid phone number
     ```
     ```
     /text/Hello - this will return an empty list [{}] as no numbers can be found
     ```
     ```
     /text/1234567890 - this is not a valid phone number, and response will be an error message
     ```
2. GET https://osd600.herokuapp.com/api/phonenumbers/parse/file/
   - This endpoint will prompt for a file upload containing a list of strings and numbers and through filtering and validations will return a formatted list of all the valid phone numbers found.  You can use the [numbers.txt](numbers.txt) provided in this package.

## Unit Testing
[Jest](https://facebook.github.io/jest/) is an open source unit testing framework by Facebook used to test Javascript codes.  It was developed with the philosophy of providing a "zero configuration" experience that allows developers to have a better testing experience.

Both Jest and Supertest are already included in the development dependencies, therefore not needing to install them.  To run the tests, simply follow this command:
```
npm test
```
And the results should output as follows:
```
PASS __tests__\server-test.js
  Testing '/' route
    √ GET '/' should respond with Status 200 (34ms)
  Testing /parse/text/ endpoint
    √ GET /api/phonenumbers/parse/text should expect 200 and a How To Page (4ms)
  Testing /parse/text/:phone endpoint
    √ GET /api/phonenumbers/parse/text/Seneca College 416-491-5050 is valid (7ms)
    √ GET /api/phonenumbers/parse/text/Seneca College +1 416-491-5050 (with +1 int'l code) is valid (3ms)
    √ GET /api/phonenumbers/parse/text/Hello should return an empty [{}] because no numbers were found (2ms)
    √ GET /api/phonenumbers/parse/text/1234567890 is invalid (2ms)
  Testing /parse/file/ endpoint
    √ GET /api/phonenumbers/parse/file should expect 200 and a form to upload a file (3ms)

Test Suites: 1 passed, 1 total
Tests:       7 passed, 7 total
Snapshots:   0 total
Time:        1.006s
Ran all test suites.
```
