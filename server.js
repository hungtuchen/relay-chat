import express from 'express';
import graphQLHTTP from 'express-graphql';
import webpack from 'webpack';
import WebpackDevServer from 'webpack-dev-server';
import {Schema} from './data/schema';
import config from './webpack.config';

const APP_PORT = 3000;
const GRAPHQL_PORT = 9090;

// Expose a GraphQL endpoint
var graphQLServer = express();
graphQLServer.use('/', graphQLHTTP({schema: Schema, graphiql: true, pretty: true}));
graphQLServer.listen(GRAPHQL_PORT, () => console.log(
    `GraphQL Server is now running on http://localhost:${GRAPHQL_PORT}`
));

// Serve the Relay app
var app = new WebpackDevServer(webpack(config), {
    publicPath: config.output.publicPath,
    contentBase: '/public/',
    proxy: {'/graphql': `http://localhost:${GRAPHQL_PORT}`},
    hot: true,
    historyApiFallback: true,
    stats: {colors: true}
});
// Serve static resources
app.use('/', express.static('public'));
app.listen(APP_PORT, () => {
    console.log(`App is now running on http://localhost:${APP_PORT}`);
});
