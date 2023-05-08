/* eslint-disable no-unused-vars */
import ReactDOM from 'react-dom/client';
import App from './App.js';
import { createClient, cacheExchange, fetchExchange, Provider } from 'urql';
import { ChakraProvider } from '@chakra-ui/react';
// import { Auth0Provider } from '@auth0/auth0-react';
import { Auth0ProviderWithNavigate } from './components/auth0/Auth0Provider.js';
import { BrowserRouter } from 'react-router-dom';

let serverPort = process.env.PORT || 4000;


const root = ReactDOM.createRoot( document.getElementById( 'root' ) );

const client = createClient({
	url: process.env.REACT_APP_SERVER_URL || `http://localhost:${serverPort}/graphql`,
	exchanges: [ cacheExchange, fetchExchange ],
});


// const providerConfig = {
// 	domain: process.env.REACT_APP_AUTH0_DOMAIN,
// 	clientId: process.env.REACT_APP_AUTH0_CLIENT_ID,
// 	authorizationParams: {
// 		redirect_uri: window.location.origin,
// 		... null,
// 	},
// };

root.render(
	<Provider  value={client}>
		<ChakraProvider>
			<BrowserRouter>
				<Auth0ProviderWithNavigate>
					<App />	
				</Auth0ProviderWithNavigate>
			</BrowserRouter>
		</ChakraProvider>	
	</Provider>
);