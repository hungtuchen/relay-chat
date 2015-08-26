# Relay Chat

## Installation

```
npm install --global babel
npm install
```

## Running

Start a local server:

```
npm start
```

## Developing

Any changes you make to files in the `js/` directory will cause the server to
automatically rebuild the app and refresh your browser.

If at any time you make changes to `data/schema.js`, stop the server,
regenerate `data/schema.json`, and restart the server:

```
npm run update-schema
npm start
```

## Feature Highlight:

1. use with [relay-nested-routes](https://github.com/devknoll/relay-nested-routes) and [react-router](https://github.com/rackt/react-router) to let multiple routes work and route params as query params

2. using route params as global state variable (ex: currentThreadID), not ideal for now, but it shows a different possibility

3. and a more complicated model structure as `user-> threads-> messages`
4. [pagination for messages](https://github.com/transedward/relay-chat/tree/add-pagination)


## Advice

If you don't know much about GraphQL and Relay, I suggest you:

1. [To know GraphQL first](https://github.com/facebook/graphql/blob/master/README.md)
(at least things before introspection part)
2. [Know how Relay connect to GraphQL](http://facebook.github.io/relay/docs/graphql-relay-specification.html#content)
(and the series below)
3. [Last, learn Relay](http://facebook.github.io/relay/docs/guides-containers.html#content)
(and the series below)

I tried these 3 steps in reverse, and I went step by step again.
