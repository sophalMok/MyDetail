# This is the Health Check UI project for ATPC

This project it will be used after stage or production deployment to verify the integrity of the service.
Default URL in local: http://localhost:4040/#main/

## Step of using this Health Check:

    1- Select the environment from drop down box to choose the environment that you want to run health check on.

    2- Select the project name (role) that you want to run health check on from Project drop down box.

It will load the test results in the table.

## Front End Tech Stack
* Node (npm only)
* Gulp Build System
* AngularJS 1.x
* Bootstrap 3.x

### Front End Dependencies

If you don't have Node, you can install it easily via homebrew on OSX. You are on your own if you are using Windows or another OSX package manager:
```
$ brew install node
```

Once Node (and along with it npm) is installed, you need to use npm to install bower and gulp globally:
```
$ npm install --global gulp
$ npm install --global bower
$ npm install --global karma-cli
```

Now you can install the project specific dependencies:
```
$ cd <project directory>
$ npm install
$ bower install
```

## Development

### Build Process
The build process follows these general steps:
1. Clean the *dist* folder
2. Build the constants file *ngConstants.js* based on *--env* argument (dev by default)
3. Create *index.html* with version number from *package.json*
4. Build app js
5. Build combined css file with vendor and app css
6. Build angular template cache *templates.js*
7. Copy vendor js, images, fonts
8. Inject *index.html* with css and js links

For a release build, the app js is concatenated and minified. For a development build, the files are copied over as they are to make debugging easier.

### Gulp Tasks:
To do a development build:
```
$ gulp build-dev
```
The default gulp task runs *build-dev* with a development server on port 4000 and some watch tasks that rebuild the project when files are changed. In time the project may become too large to do a complete build every time one file changes, but its fast enough for now.
```
$ gulp
```
To do a release build:
```
$ gulp build --env=<environment>
```
Specify the environment to prepend the appropriate host and port of the controller to the urls in the app. See *mca.conf.json* for the values. If you do not specify an environment, dev will be used and *localhost:8080* will be prepended to all urls under the assumption that you have the controller running locally.

To archive a build for upload to artifactory:
```
$ gulp archive
```

### Testing
You can run tests in two ways. One is to just use a gulp task that outputs the results to the console:
```
$ gulp test         // Dev build
$ gulp test-build   // Release build
```
The gulp task is useful for CI, but you may want to run the tests in a way that allows you to debug the tests themselves. To do that, run karma directly from your command line and use the Chrome developer tools:
```
$ karma start karma.conf.js --browsers=Chrome --single-run=false --debug
```
Running the *test* task will also generate a coverage report.

### Project Conventions
The build process described above expects certain conventions to be followed during development to work properly. They are discussed in this section.
#### File Names
To avoid the necessity of modifying karma.conf.js with every test file we add, I have set up the build process so that it will search the entire app folder for files that contain the pattern '*spec.js'. These files are excluded when building the minified js file, but are included for the test runner.

For example, if we have a directive with the name: hierarchy-search.directive.js, the test file should be hierarch-search.directive.spec.js.
