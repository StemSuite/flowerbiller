/* eslint-disable no-undef */
import express from 'express';
const app = express();
import { graphqlHTTP } from 'express-graphql';
import mongoose from 'mongoose';
import cors from 'cors';
import schema from './graphql/schema.js';
import 'dotenv/config';


mongoose
	.connect( process.env.DB )
	.then( () => console.log( 'Database connected successfully' ) )
	.catch( ( err ) => console.log( err ) );


app.use( cors() );
app.use( '/graphql', graphqlHTTP({
	schema: schema,
	graphiql: true
}) ); 

app.listen( 4000, () => {
	console.log( 'Running a GraphQL API server at http://localhost:4000/graphql' );
});