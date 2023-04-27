/* eslint-disable no-undef */
import express from 'express';
import { graphqlHTTP } from 'express-graphql';
import mongoose from 'mongoose';
import cors from 'cors';
// import { auth } from 'express-oauth2-jwt-bearer';
import schema from './graphql/schema.js';
import 'dotenv/config';
import * as url from 'url';

const __filename = url.fileURLToPath( import.meta.url );
const __dirname = url.fileURLToPath( new URL( '.', import.meta.url ) );

const port = process.env.PORT || 4000;

// const jwtCheck = auth({
// 	audience: process.env.AUTH0_CALLBACK_URL,
// 	issuerBaseURL: process.env.AUTH0_DOMAIN,
// 	tokenSigningAlg: 'RS256'
// });

const app = express();
app.use( cors() );

mongoose
	.connect( process.env.DB )
	.then( () => console.log( 'Database connected successfully' ) )
	.catch( ( err ) => console.log( err ) );

app.use( '/graphql', graphqlHTTP({
	schema: schema,
	graphiql: true
}) ); 

app.use( express.static( path.join( __dirname, './client/build' ) ) );

app.get( '*', ( req, res ) => {
	res.sendFile( path.join( __dirname, './client/build/index.html' ) );
});

// app.use( jwtCheck );

// app.get( '/authorized', function ( req, res ) {
// 	res.send( 'Secured Resource' );
// });

app.listen( port, () => {
	console.log( `Running a GraphQL API server at http://localhost:${port}/graphql ` );
});