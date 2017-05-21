# ractio - cast away mobile
A simple radio player built with React.js - the clean commits provide a step by step setup guide
This branch is all about service workers

## [added a logo with dimensions 512x512](https://github.com/paul-em/ractio/commit/9c00b233adf4e938faffa0dea3a4aae68930dbc0)

## [added generated files](https://github.com/paul-em/ractio/commit/168b554fa03d2f2391153d68bde6ca519718236a)

Generated with [http://realfavicongenerator.net](http://realfavicongenerator.net)

## [added more data to manifest](https://github.com/paul-em/ractio/commit/2442f27213e58a66bd11f2afff7d54f08b7be71b)

documentation: [https://developer.mozilla.org/en-US/docs/Web/Manifest](https://developer.mozilla.org/en-US/docs/Web/Manifest)

## [added basic service worker setup](https://github.com/paul-em/ractio/commit/8d9405c22474dbcc9b9494cfbba348edb798fca2)

To start working with service workers we should know what service workers are. 
Service workers are similar to [shared workers](https://html.spec.whatwg.org/multipage/workers.html#sharedworker) in that it 

- Runs in its own global script context (usually in its own thread)
- Isn’t tied to a particular page
- Has no DOM access

Unlike a shared worker, it:

- Can run without any page at all
- Can terminate when it isn’t in use, and run again when needed (i.e., it’s event-driven)
- Has a defined upgrade model
- Is HTTPS only

You can currently use it to makes sites work faster and/or offline by intercepting network requests and use background tasks like push messaging and background synchronization. In this chapter we will have a look at all of them.

## [added basic cache setup](https://github.com/paul-em/ractio/commit/796d0f0cdaff43d5595efe3f88b122e90592130c)

## [added more advanced caching setup](https://github.com/paul-em/ractio/commit/df60959202e6d2e0be939860837df4fa798b8eb0)

## [added own server](https://github.com/paul-em/ractio/commit/3bbbd25817050a79b24d25a3b2cdc9d235a8fff3)

To test push messages we will need a dedicated one

## [added push notifications](https://github.com/paul-em/ractio/commit/d81a6fa1402790e0511d011ad76e6f0578a00d20)

## [added background sync](https://github.com/paul-em/ractio/commit/d86c7edee37f4c50cac3eeba81c6e3889b190bce)
