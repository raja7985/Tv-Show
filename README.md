# tv-show
Tv Shows dashboard board displays list by popularity, genres and ratings.Search for you favourite tv shows.
A web application which allows users to see all the shows based on  genre and  popularity. It uses the following api with base url: https://api.tvmaze.com .
On the Dashboard, it loads all the shows based on genre and their popularity which depende on the average rating.. However you can search any show, and you will get details regarding the show.
When the user selects a tv show from the search results, the details of that tvShow shows:
• Name of the Show
• Image of the Show
• Genre of the Show
• Date Of the Premier
• Duration Of the Show
• Languages Of the Show
• About the Show

## Technologies
Here you can see the tech stack used to develop this project

### Main stack
- HTML5
- Css/Scss
- ECMAScript 6 (ES6)
- Vue.Js

## Installations
## Vue CLI
```
This has some advantages.
Please refer below urls

https://cli.vuejs.org/

https://cli.vuejs.org/guide/

```
## Installation of vue/cli
Note: You need administrator privileges to execute these unless npm was installed on your system through a Node.js version manager.

```
npm install -g @vue/cli

```
Note: You can check you have the right version with this command:
vue --version

## Project Guidelines

1) Method Naming Convention, 
   variable, object declaration : camelCase
   Example : searchDetails, getTvShows() etc..

2) Folder Naming Convention, File Naming Convention: kabab-case
   Example : header, client-api.js
   Components in vue : PascalCase
   Example : AppHeader.vue 

3) Vuex Standards:
   a. mutations: ALL_CAPS
      ex: SET_TV_SHOWS
   b. actions: camelCase
      ex: getTvShows
   c. state: camelCase
      ex: state  

## Project dependencies and devDependencies 
1. axios:
   Promise based HTTP client for the browser.
   Please refer below url for more details:
   https://www.npmjs.com/package/axios   

2. vuetify:
   With Vuetify we can build responsive, mobile-first, and ARIA accessible projects on the web using Vue.js and the world's one of the popular front-end CSS library — Vuetify.
   Vuetify has beautifully handcrafted Material Components.
   Please refer below url for more details:
   https://bootstrap-vue.js.org/docs

3. @vue/cli-plugin-unit-jest:
   Run unit tests with Jest. Jest as a JS unit testing framework and runner.
   Please refer below url for more details:
   https://jestjs.io/

   In jest.config.js: we can configure some key feature such as collectCoverage, collectCoverageFrom, coverageThreshold etc
   for getting exact code coverage with reports.


### Api
Get shows
use http://api.tvmaze.com/shows to get a list of shows

Get Show Details 
use http://api.tvmaze.com/shows/:id to get show details

A search to find your favourite shows
use hhttp://api.tvmaze.com/search/shows?q=searchKeyword to find your favourite shows.

Get Show background image
use http://api.tvmaze.com/shows/:id/images to get poster and background image.

### Vue
 I've chosen VueJS because it's a framework that leads you to improve the structure of your code.

Below I show you the packages I developed the application with:

- Vue cli
- HTTP client: Axios
- Routes management: VueRouter
- Store management: Vuex 
- Components design: Vuetify
- Preprocessor: Sass 
- Code formatters: ES-Linter

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Run your unit tests
```
npm run test:unit
```

### Run your end-to-end tests
```
npm run test:e2e
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
