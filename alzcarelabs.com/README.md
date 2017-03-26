# alz.care

This project is the code for the alzcarelabs.com website.

## Install Dependencies

The project requires a couple dependencies to help to manage the code.

* Tools are managed via `npm`, the [node package manager](https://www.npmjs.org/).
* Automation is managed via `grunt`, a [javascript task runner](http://gruntjs.com).

Follow the instructions [here](https://github.com/joyent/node/wiki/Installing-Node.js-via-package-manager) to install npm.

On Linux, you may additionally need to add the following symbolic link:

```
$ sudo ln -s /usr/bin/nodejs /usr/bin/node
```

Run `npm` to download all dependencies:

```
$ npm install
```

This creates a new folders in the project:

* `node_modules` - contains the npm packages

## Development Server

[http-server](https://www.npmjs.com/package/http-server) can be used as a zero
configuration development server to serve files and proxy services.

Install http-server globally with:

```
$ sudo npm install -g http-server
```

Then run http-server from the repository root directory with:

```
$ http-server app --proxy https://stage.alz.care
```

This serves the files in the `app` folder and proxies REST service calls to the
staging server.

To proxy service calls to a locally running REST server, run:

```
$ http-server app --proxy http://localhost:5000
```

To serve distribution build files in the `dist` folder, run:

```
$ http-server dist --proxy http://localhost:5000
```

## Updates

The tool dependencies can be updated by running:

```
$ npm update
```

This will find the latest versions that match the version ranges specified in the `package.json` file.

## Distribution

[Grunt](http://gruntjs.com/) task runner is used to build the code for distribution.
This minifies and concatenates the CSS and JS files into single files.

To build the code for distribution, run:

```
npm run build
```

which will run Grunt to generate the output files, located in the `dist` folder.

To remove old build files run:

```
npm run clean
```
