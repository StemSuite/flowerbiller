import ReactDOM from 'react-dom/client';
import App from './App.js';
import { createClient, cacheExchange, fetchExchange, Provider } from 'urql';
import { ChakraProvider } from '@chakra-ui/react';
import { Auth0Provider } from '@auth0/auth0-react';

// import { getConfig } from './config.js';

let serverPort = process.env.PORT || 4000;


const root = ReactDOM.createRoot( document.getElementById( 'root' ) );

const client = createClient({
	url: process.env.serverUrl || `http://localhost:${serverPort}/graphql`,
	exchanges: [ cacheExchange, fetchExchange ],
});



// const config = getConfig();

console.log( 'working?' );
console.log( process.env.AUTH0_DOMAIN );
console.log( process.env.DB );

const providerConfig = {
	domain: 'dev-cz5tq76cgos2bf6b.us.auth0.com',
	clientId: process.env.AUTH0_CLIENT_ID,
	authorizationParams: {
		redirect_uri: window.location.origin,
		... null,
	},
};

root.render(
	<Provider  value={client}>
		<Auth0Provider {...providerConfig}>
			<ChakraProvider>
				<App />
			</ChakraProvider>
		</Auth0Provider>
	</Provider>
);
