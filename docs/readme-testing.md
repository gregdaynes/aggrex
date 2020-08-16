Testing the application at various stages can be done through the following commands

When writing tests, the name of the test should contain tags of what the test is. At least one of `#unit` or `#integration` should be set

Run all tests

```
npm run test

 # Run tests on file save

npm run test -- -watch
```

Run all Tests and generate a coverage report

```
npm run test:coverage

 # To run tests and generate coverage report on file save

npm run test:coverage:watch
```

Run all tests tagged with #integration

```
npm run test:integration
```

Run all tests tagged with #unit

```
npm run test:unit
```

Run all tests in a specific file
this provides a fast way to run tests on your current editing file through a tool like `vim-test`, or a hotkey

```
npm run test:file ./path-to-file.test.js
```
