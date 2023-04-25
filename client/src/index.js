import ReactDOM from 'react-dom/client';
import App from './App.js';
import { createClient, Provider } from 'urql';
import { ChakraProvider } from '@chakra-ui/react';
import { Auth0Provider } from '@auth0/auth0-react';
import { getConfig } from './config.js';


const root = ReactDOM.createRoot( document.getElementById( 'root' ) );

const client = createClient({
	url: 'http://localhost:4000/graphql'
});

const config = getConfig();

const providerConfig = {
	domain: config.domain,
	clientId: config.clientId,
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
