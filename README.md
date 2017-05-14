# ractio - pimped
A sample radio player built with React.js - the clean commits provide a step by step setup guide

## [Added node.js server](https://github.com/paul-em/ractio/commit/8babb129e159c03f5b83de885a1a13c2c0273600)

To use realtime features in our app we need a server to establish connections. This server could be written with any server-side technology. In this tutorial we are going to use node.js, because it is JavaScript and we already know it from webpack. 

First of all we are going to install some dependencies
`npm install express morgan --save`
`npm install concurrently --save-dev`

Then we create a folder called "server" with an index.js file inside. This is the entry point for our server. As server framework we will use "[express](https://expressjs.com/)" - one of the biggest and real-life-proven frameworks for nodejs. Express uses middleware to hook up other libraries to incoming request. One of these is "[morgan](https://github.com/expressjs/morgan)" - a simple logger. 

In the server folder we also create another eslintrc for configuring the style of the code inside.

And last but not least we will have to change the scripts in the package.json file, because from now on we start our app differently. webpack-dev-server handled serving, building and watching for file changes in one command. It also opened the site in a browser. Since our server will do the serving now, we will have to split this command. 
`node server` will start our server
`webpack --watch` runs the webpack build and reruns on file changes
`concurrently --kill-others --prefix \"[{name}]\" --names \"server,webpack\" \"npm start\" \"npm run watch\"` does both things with one command, so we don't have to always run both and keep an eye on two terminals 
`opn http://localhost:3000` just opens a the website in the browser. This also just a good reminder if you forgot which port your application is running on
`webpack -p` can be used to build the application - we will need this later for deployment

## [added websocket to server and Chat route](https://github.com/paul-em/ractio/commit/d959281df2ca6555b602789da9883be54932746f)

In this step we will add a chat to our radio application. While it might not make a lot of sense to do this for a radio app, it does make some sense for learning a new technology: Websockets. This protocol is different to HTTP, because it can establish a two-way channel to the server. This means the server can send data to the client at any time. Check out [this post](https://www.pubnub.com/blog/2015-01-05-websockets-vs-rest-api-understanding-the-difference/) from PubNub for a good explanation.

![Websocket protocol](https://www.pubnub.com/wp-content/uploads/2014/09/WebSockets-Diagram.png)
Websocket protocol procedure (Taken from post mentioned above)

In our chat application we want to know as quickly as possible if somebody sent a new message, therefore this protocol is a perfect match for this usecase. 

First we create a websocket server with the popular "[ws](https://github.com/websockets/ws)" module that can either broadcast a message or send it to one particular other client.

Then we create a new route in our application where we require the user to pick a name and then start chatting.

## [added Webrtc VideoCalling](https://github.com/paul-em/ractio/commit/e7f4bf8128e0ccd41db67910381d6390df59b2b5)

Websockets are perfect if you need to send some small data with low latency to someone else. But what about sending big amounts of data to someone else, for example in a videoCall? For this usecase there another technology called WebRTC. It allows us to send data to some other client Peer-to-peer, meaning it does not need to be forwarded by a server in the middle. 

However to create a peer-to-peer connection the two clients still need to find each other. Since they don't have a domain associated to them we still need a server to setup the connection. The server needs to pass information about the client to the other client. This is done in a process called [Signalling with ICE (Interactive Connectivity Establishment). ](https://developer.mozilla.org/en-US/docs/Web/API/WebRTC_API/Signaling_and_video_calling)

The Websocket server we created in the last step is already a good signaling server as well, since it just forwards data in a fast way.

![WebRTC Signalling flow](https://paulem.eu/~/files/webrtc.png)
WebRTC Signalling flow

## [adjustments for deployment](https://github.com/paul-em/ractio/commit/7ea8019f71ac0b1dc36c2d1c4cdcca5789c99c5b)

As a last step we deploy our app. One easy way to do that is with "[now](https://zeit.co/now)"
After installing it, it is as easy as calling "now" in your terminal.
This triggers an upload to a server where all dependencies are installed and "npm run build" is called automatically. Here we just need the server to run webpack with production settings.
