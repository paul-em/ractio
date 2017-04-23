# ractio
A sample radio player built with React.js - the clean commits provide a step by step setup guide

## [Setup git project](https://github.com/paul-em/ractio/commit/06a31438aa5dfedaee9082de84a938790f0f8a2f)

Webstorm creates a folder called .idea to keep track of settings. We don't want to have these files in our repo

## [Setup npm project](https://github.com/paul-em/ractio/commit/5857775f6b2143d1b85202ecd97e153d62a42cd0)

Setup a node package by running the command `npm init` - just follow the steps in your terminal.
When we start to install some dependencies with npm a folder "node_modules" will be automatically created - we don't want to keep track of these files either, since everyone with the package.json file can install the dependencies easily with `npm install`. This keeps the module clean.

## [Added readme file for readable description](https://github.com/paul-em/ractio/commit/1ed9bb0ae03de430a2fdd9efa1a14846edc8a4ac)

The readme file in markdown notation can be interpreted by services in a nice viewable format. Github and npm are two examples. A useful markdown cheatsheet can be found [here](https://github.com/adam-p/markdown-here/wiki/Markdown-Cheatsheet).

## [Added public html entry point](https://github.com/paul-em/ractio/commit/d63ae9edf5da5e27aaac2c7969f75cea7439ac03)

This file will be the only html file we need in this project. It serves as the starting point for rendering our application.
Since the used radio stations are in german, the language of the page will be german. Don't worry this is kept to a minimum.
Also the site is responsive, so we add the viewport metatag with a mobile friendly default.

## [Added basic react setup](https://github.com/paul-em/ractio/commit/d16b218029b4dffc02bf677943378bc4065f3190)

To use react we run the command `npm install react react-dom --save` and create a folder with a file called main.jsx inside. JSX is a preprocessor step that adds XML syntax to JavaScript. It basically allows to write HTML-like syntax within JavaScript without the need to wrap it in Strings. Editors and IDE's can highlight the syntax which allows for a nice development experience. 

In the index.html file we add a div-element with the id "root" to hook our application into.

## [Added babel](https://github.com/paul-em/ractio/commit/0fc07e60939ebc903ca6962194110984f4857355)

In this step we install some further dependencies. This time we just add them to the devDependencies, because they are not need in the actual application, but just for building. If the application is built on a production server then these dependencies should not be saved in there, but in the regular list.

Run this command to install:
`npm install babel-core babel-preset-es2015 babel-preset-react babel-preset-stage-1 --save-dev`

Babel compiles the jsx-files to regular JavaScript files that can be used in browsers today. The [preset-es2015](https://babeljs.io/docs/plugins/preset-es2015/) gives us all the functionality of the es2015 spec including

- [const](https://babeljs.io/docs/plugins/check-es2015-constants/) and let
- [arrow functions](https://babeljs.io/docs/plugins/transform-es2015-arrow-functions/)
- [classes](https://babeljs.io/docs/plugins/transform-es2015-classes/)
- [template literals](https://babeljs.io/docs/plugins/transform-es2015-template-literals/)
- ...

The [react preset](https://babeljs.io/docs/plugins/preset-react/) includes mainly the jsx features and the [stage-1](https://babeljs.io/docs/plugins/preset-stage-1/) preset includes further features like "[object rest-spread](https://babeljs.io/docs/plugins/transform-object-rest-spread/)"

## [Added webpack bundling](https://github.com/paul-em/ractio/commit/74139ed99a00cebcac31ce7c5433a737d6a140c6)

In this step we add [Webpack](https://webpack.js.org/) as a bundler. This helps to gather all files needed for the project, run them through Babel and whatever else we want to do and output it into a single file of JavaScript.

To install webpack and all other dependencies needed for this step run the command

`npm install webpack webpack-dev-server babel-loader --save-dev`

Then we create a new file called "webpack.config.js" in the root directory - this is the default file name and location where webpack is going to search for a config. In this config we setup the process to start with main.jsx file and use everything that it includes (right now this is react and react-dom) and output it into bundle.js in the public folder. As rules we define a "loader" for all files matching the ending .js or .jsx. This loader is called babel-loader and just runs the presets. We define which presets to run in the package.json.

With the command `webpack` we can see the generated file "bundle.js" in the public folder (for this test webpack needs to be globally with `npm install webpack -g`). Since this file is always generated we exclude it again from git by adding it to .gitignore.

Now all that is left is to use the bundle in the index.html file by including it with a script-tag. Now your very basic React App is running. 

## [Added eslint](https://github.com/paul-em/ractio/commit/a25cd62a630180ac518022f4570fb5ccaca69531)

This step adds [eslint](http://eslint.org/) - a utility for forcing a certain code style. Especially in bigger teams it can be a problem that different developers use different Editor and IDE settings. This results in mixes between tabs and spaces, writing semicolons vs not writing any, ... A eslint config sets up the same requirements for everyone and throws an error if these are not met. 

We use a preset by [AirBnb](https://www.npmjs.com/package/eslint-config-airbnb-base) in combination with a [React-specific one](https://www.npmjs.com/package/eslint-plugin-react). Install the dependencies with the command `npm install eslint eslint-config-airbnb-base eslint-import-resolver-webpack eslint-loader eslint-plugin-import eslint-plugin-react babel-eslint --save-dev`

We also integrate eslint into our webpack-flow so we get informed about not well formatted code every time we recompile. 

The created eslintrc files configure how the folder the config is placed in should be treated. We also add a eslintignore file to not check in the compiled public folder for issues. 

## [Added material-ui and layout](https://github.com/paul-em/ractio/commit/9576c1586330babe37a7dcbde8ce49eabb6ef354)

This commit adds [material-ui ](http://www.material-ui.com) - "A Set of React Components that Implement Google's Material Design". With this module we can quickly build an application without creating lots of components and styles. Speaking of styles - in this tutorial all styles will be inline. This allows us to easily change them at runtime. Since last year there is a big [discussion](https://survivejs.com/react/advanced-techniques/styling-react/) whether using inline styles is good or bad - let's try it out and find out yourself if you think it makes sense to you.

One pitfall of the inline styles is that we can only style elements inside the react application, meaning inside this "root" element we created earlier. For removing the default padding of the html element we need to create a regular stylesheet and load it with style and css loader.

The layout is a dedicated component within the file "App.jsx" - we use the elements from material-ui and describe their overall behavior with the state of the component.

To install the new dependencies run
`npm install style-loader css-loader --save-dev`
`npm install material-ui react-tap-event-plugin --save`

the [react-tap-event-plugin](https://github.com/zilverline/react-tap-event-plugin) is used to remove the 300ms click delay (because they wait for double-tap to zoom) in some mobile browsers. However browsers started to remove this "feature" so the tap-event-plugin will not be needed in the next versions of material-ui. 

## [Added router](https://github.com/paul-em/ractio/commit/977f313b5691a6e26eb770d2e61cae6c1f276d8e)

For routing of this single-page application we use react-router-dom installed with 
`npm install react-router-dom --save`

For easy maintenance we create an array for all routes and just iterate over it in the menu and content block to generate elements for each. The actual pages are also just regular react components - we keep them in a folder called "routes".

Note that in package.json we added to the start script  "--history-api-fallback" this enables to refresh any subpage like http://localhost:8080/settings without getting a 404 error.

## [Added MediaBar and MenuHeader components to complete Layout](https://github.com/paul-em/ractio/commit/f07e2eaaee9c2df81f0282e82f96610b25549699)

Yey! We add our first components. They will finish the layout by adding a logo on top of the drawer and added a bigger AppBar instead of the small one provided by Material-ui. 

The MenuHeader component is very simple and has no internal state. In this case we don't need to write the class syntax, but can use the alternative variable syntax to avoid writing too much overhead. 

Also we pass in properties into these components. The react default way to define which properties work and what type they should be is by adding a static propTypes object to the component. To install the propTypes define helper call
`npm install prop-types --save`

## [Added custom theme](https://github.com/paul-em/ractio/commit/53722c2a7c0ccec86975eaa4e59654b1bf50788e)

Now we apply our custom theme to material-ui. Later we want to have a different theme for every station, so it is time to add a stations definition JSON object that describes every station and its color. Just copy and paste this stations array into your repository.

To get a custom themes object for material-ui we just follow the instructions found on [their website](http://www.material-ui.com/#/customization/themes). We can later on use this themes object in components that need themed styling like the MediaBar.

## [Added stations route with controlled inputs](https://github.com/paul-em/ractio/commit/7fdb46ed45629aa2db7c2084de3412cc192e4d93)

To switch between stations we now add a radio button group to select one. This is now one major part of react: Form handling. While usually you interact with an input element (where the state is stored internally) and handle the change in JavaScript, React takes a bit different approach with [controlled components](https://facebook.github.io/react/docs/forms.html#controlled-components). The mutable state is usually stored in the state of the component and only if the state is changed the render function is triggered and the now changed input is shown. This allows for a "single source of truth".

## [Added redux](https://github.com/paul-em/ractio/commit/e6faa45bd536b79936e3bc4ca5199f6918d08c7d)

One somewhat hard thing to do now is to get the state information about the selected station from the Stations component to all others that need it. We could do this by creating listener properties like 'onStationSelect' and requiring a callback function. 
A nice approach that gets less messy with bigger projects and helps to track which component made which changes is using [Redux](http://redux.js.org/). Install the new dependencies by running
`npm install redux react-redux redux-logger --save`


Redux is a quite simple library with only 2 KB. It has three building parts: actions, store and reducers.
![Redux data Flow](https://www.smashingmagazine.com/wp-content/uploads/2016/06/new-redux-data-flow-opt.png)
Redux data flow (Taken from [smashing magazin](https://www.smashingmagazine.com/2016/06/an-introduction-to-redux/), Image: [Tanya Bachuk](http://tanyabachuk.com/)) ([View large version](https://www.smashingmagazine.com/wp-content/uploads/2016/06/new-redux-data-flow-large-opt.png))

**Actions** are basically events that are dispatched once a user interaction happens. It is always an object with a `type `property and a `payload`. In our case we keep a list of all available actions in a single file to maintain overview (Split this file into multiple once and put them in a folder called "actions" if it gets too messy).

The **Reducers** is the only part that actually mutates the state. It receives an action and changes the store accordingly. The tricky part here is that the new state should be a completely new object. This way debugging, checking which changes were actually made and logging these is possible. With some further [devtools ](https://github.com/gaearon/redux-devtools) it would even possible to do a "timetravel".

The **Store** is just a plain JavaScript object. We initialize it in the reducers file, but you could also setup a dedicated file if your initial state is larger. To use this store in a component we can the provided connect function and decorators to keep the files clean and mapping store items to properties in our component. Decorators are not yet supported by the babel presets we use, so we need a new plugin for this. Install it by running
`npm install babel-plugin-transform-decorators-legacy --save-dev`
and add it to a new plugins array in the package.json file.

## [Added light color mode](https://github.com/paul-em/ractio/commit/6cad49d8a6950b0b73cfe1dad1b0bf24d3e70787)

In this step we just add a new settings page with only one item in it for now: dark mode. If you un-check it the theme should go from dark to light.

## [Added about page](https://github.com/paul-em/ractio/commit/d806008b0ccf045de34e2e2afa8734153eb1f260)

Now we add the about page - note that we can also import the package.json to use the version number supplied in there.

## [Added program page with TrackCard component](https://github.com/paul-em/ractio/commit/596d2791ecc0e7038c7265fc471540e4820ad9ca)

Now we finish the basic setting up of all pages by implementing the program page, which is the main page you will get to see when you use this app. It is basically a list of tracks - this is a good use-case for a dedicated component. We use again the short syntax for writing the component because it has no internal state.
And for now we still mock the tracks, but we will add them in the next step.

## [Added program loading](https://github.com/paul-em/ractio/commit/5e1aa4bff9ae83b287bfa83e325fa42ecf4c9206)

Now we add loading the program information for our tracklist. We can do this again with an action, but this time the action runs asynchronously. This means we would usually dispatch multiple actions to do that (One for starting to fetch, one for fetch successful and one for failed) - luckily there is a middleware for redux that helps us do that. To install the middleware call
`npm install redux-promise-middleware --save`

Now we automatically get actions dispatched with names 

- BASE + '_PENDING',
- BASE  + '_FULFILLED'
- BASE + '_REJECTED' 

where BASE is the type you specify in the action. 

We save the state of the request so we can show a loading spinner or an error message.

Side note: This API returns a whole lot of information that we need to filter to get the songs. If you want to add more stuff you can check out the request to get for example images of the current radio moderators and so on.

## [Added broadcast to mediaBar](https://github.com/paul-em/ractio/commit/aa30d443bb381e32701bf6a3ce064402fa2b20cf)

Now that we have the current program information we can display the current broadcast in the MediaBar again

## [Added play-button to MediaBar](https://github.com/paul-em/ractio/commit/4c665953afdda3d4011959a492d665ef6afe5959)

Now all that is left to complete the functional part is actually the most important one for a music player: Music! We add a button to the MediaBar and align it to the bottom right. The audio itself is played with an invisible audio element. It is controlled with the plain JavaScript API. To get access to the element we just need to get a reference to it by adding the ["ref" attribute](https://facebook.github.io/react/docs/refs-and-the-dom.html) and assigning it to a class variable.

componentDidMount is one of Reacts [Lifecycle events](https://facebook.github.io/react/docs/react-component.html#the-component-lifecycle) and called automatically once the component is inserted. In our case this is once at the start.

## [Fixed App closeDrawer method](https://github.com/paul-em/ractio/commit/22d1bca43049013c384a2cc991130dae3cab5816)

Ups, my bad. In the closeDrawer methods was an error from a previous version. You might have already noticed it ;) Now the menu closes properly on mobile after it is clicked.

## [Added tests](https://github.com/paul-em/ractio/commit/f5255f9d35dac13797414a05f366b9d08feffd24)

For testing our components we use facebook's jest testing framework together with airbnb's enzyme for easier accessing the virtual DOM with jQuery-like syntax. For installing call
`npm install jest enzyme react-test-renderer --save-dev`

Some things to consider while/before testing:

1. Always wrap the component you want to test in a MuiThemeProvider, because there will be an error otherwise if you use Material-ui components inside
2. The touchTap event is not supported by enzyme - that's why we need to use the internal ReactDOM.findDOMNode function. Eslint does not like that, because it is a somewhat hacky way to use ReactDOM - disable the warning by adding a eslint-disable comment on top
3. Here we just test the standalone components, because it is easier to test a small block rather than having to mock a whole store and API calls.  That is one reason why you should split your application into multiple smaller components.


## Further changes and fixes added afterwards:

### [Fix for automatic updating on station select](https://github.com/paul-em/ractio/commit/d8190a79fd401bad77c808cdcb7d565745934bf8)

This fix allows us to update the broadcast immediately when a new station is selected
