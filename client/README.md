<h1 align="center">solbond-client</h1>

<h4 align="center">
This folder contains the code for Solbond's client built with Svelte, JavaScript, and TypeScript.</h4>

<p align="center">
  <a href="#prerequisites">Prerequisites</a> •
  <a href="#installation">Installation</a> •
  <a href="#configuration">Configuration</a> •
  <a href="#run--build">Run & Build</a> 
</p>

## Prerequisites

- Git is need to clone the repository on your machine.
- npm is needed to install packages.
- Node.js is needed to run Solbond.

### Ubuntu

Install git, Node.js and npm on your machine running Ubuntu:

```bash
$ sudo apt-get install git-core
$ sudo apt install nodejs
$ sudo apt install npm
```
### Windows 

Use the official links for downloading on Windows:

- [Git](https://git-scm.com/)
- [Node.js](https://nodejs.org/en/download/)
- [npm](https://www.npmjs.com/get-npm)

Run the following commands to confirm if the installation was successful:

```bash
$ git --version
$ node --version
$ npm --version 
```

## Installation

Clone the repo and cd into the directory: 

```bash
$ git clone https://github.com/Araekiel/solbond.git
$ cd gitwiz 
```

Then install the node-modules in package.json:

```bash
$ npm install
```

## Configuration 

Make a file called *env.store.js* in *src/store* directory. Within this file write the following code:

```js
import { readable } from 'svelte/store';

export const connectionConfig = readable({
    endpoint: *solana_network_endpoint*,
    commitment: *solana_network_commitment*,
});

export const programID = readable(*program_id_of_deployed_program*);
```

## Run & Build

> Change the port in the *start* script within *package.json*. Default port is *108*.

Run the client with the following command:

```bash
$ npm start
```

Run the client with livereload enabled with the following command:

```bash
$ npm run dev
```

Open a browser and type **localhost:_port_**

Build the client with the following command:

```bash
$ npm run build
```

