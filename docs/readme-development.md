Running the application in development mode

```
npm run dev
```

Automatic formatting for code (where possible) can be done with `fix` which will lint and perform fixes. If a fix cannot be done automatically, the file with linting issue will be listed in the console.

```
npm run fix
```

REPL Driven Development

To provide a playground for testing out code, or ideas, the root directory contains a file called `playground.js` which has some setup in it (logging, iife). The playground will reload the file anytime it's saved through `nodemon`.

```
npm run playground
```
