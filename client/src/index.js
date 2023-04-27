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

const providerConfig = {
	domain: process.env.REACT_APP_AUTH0_DOMAIN,
	clientId: process.env.REACT_APP_AUTH0_CLIENT_ID,
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
