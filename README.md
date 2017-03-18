# What Is Happening?

This repository contains source code of Bachelor Thesis whose author is ** Marek Hrvol **. This thesis was written in 2016/2017.

## Requirements

Node.js and npm are essential to Angular development.

If you dont have Node.js already installed, follow the manual on www.nodejs.org or https://docs.npmjs.com/getting-started/installing-node

**Verify that you are running at least node 'v4.x.x' and npm '3.x.x'**
by running 'node -v' and 'npm -v'  in a terminal/console window. Older versions may produce errors.

## Install npm packages

Install the npm packages described in the 'package.json' and verify that they work:

```bash
npm install
npm start
```

The 'npm start' command first compiles the application, then simultaneously re-compiles and runs the 'lite-server'. Both the compiler and the server watch for file changes.

To shut it down manually use 'Ctrl-C'


### npm scripts

The most important/useful command are defined in 'package.json'.

* 'npm start' -  runs the compiler and a server at the same time, both in "watch mode".
* 'npm run tsc' - runs the TypeScript compiler once.
* 'npm run tsc:w' - runs the TypeScript compiler in watch mode; the process keeps running, awaiting changes to TypeScript files and re-compiling when it sees them.
* 'npm run lite' -  runs the lite-server, a light-weight, static file server.


